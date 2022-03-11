import re
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from MovieOperations.models import Movie, Likes, MovieRating
from MovieOperations.serializers import MovieSerializer
from Accounts.models import CustomUser
import random
import os
from django.conf import settings
from csv import writer
from black import json
from datetime import datetime
import nltk
import collections
from scipy import sparse
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
nltk.download('punkt')

# Create your views here.


@csrf_exempt
def UploadMovie(request):
    if request.method == "POST":
        movieVideo = request.FILES["movieVideo"]
        moviePoster = request.FILES["moviePoster"]
        movieTitle = request.POST["movieTitle"]
        movieDescription = request.POST["movieDescription"]
        movieKeyword = request.POST["movieKeyword"]
        movieCast = request.POST["movieCast"]
        movieDirector = request.POST["movieDirector"]
        movieRuntime = request.POST["movieRuntime"]
        movieGenre = request.POST["movieGenre"]
        movieRating = 10
        movieProduction = request.POST["movieProduction"]
        rand = random.getrandbits(128)
        movieUrl = str(rand) + "_" + movieTitle
        posterUrl = str(rand) + "_" + movieTitle + "Poster"
        movieTagline = request.POST["movieTagline"]

        movie = Movie(movieTitle=movieTitle, movieDescription=movieDescription, movieProduction=movieProduction, movieKeywords=movieKeyword, movieCast=movieCast,
                      movieDirector=movieDirector, movieRuntime=movieRuntime, movieGenre=movieGenre, movieRating=movieRating, movieUrl=movieUrl, movieTagline=movieTagline, moviePoster=posterUrl)
        movie.save()
        # print(movie)
        x = Movie.objects.all()
        x = len(x)
        tmp_movie = [x, movieTitle, movieDescription, movieKeyword, movieCast, movieDirector,
                     movieProduction, movieRuntime, movieGenre, movieTagline, movieRating]
        filename = str(settings.BASE_DIR)+"\\today1_dataset.csv"
        with open(filename, 'a') as csvfile:
            writer_object = writer(csvfile)
            writer_object.writerow(tmp_movie)
            csvfile.close()
        res = default_storage.save(movieUrl, movieVideo)
        res = default_storage.save(posterUrl, moviePoster)
        movies_serializer = MovieSerializer(movie, many=False)
        return JsonResponse(movies_serializer.data, safe=False)


@csrf_exempt
def SearchMovie(request):
    if request.method == "POST":
        movies = Movie.objects.filter(
            movieTitle__icontains=request.POST["movieName"])
        print(type(movies))
        movies_serializer = MovieSerializer(movies, many=True)
        return JsonResponse(movies_serializer.data, safe=False)


@csrf_exempt
def DeleteMovie(request, id):
    if request.method == "DELETE":
        movie = Movie.objects.filter(movieId=id)
        # x = str(settings.BASE_DIR)+"/media/"+movie.values()[0]["movieUrl"]
        # print(settings.BASE_DIR)
        # if os.path.exists(x):
        #     print("The file exist")
        #     os.remove(x)
        # else:
        #     print("The file does not exist")
        movie.delete()
        return JsonResponse("Delete successful", safe=False)


@csrf_exempt
def GetMovie(request, id):
    if request.method == "GET":
        movie = Movie.objects.get(movieId=id)
        # print(movie)
        dict_movie = movie.to_dict()
        json_movie = json.dumps(dict_movie)
        # print(json_movie)
        return JsonResponse(json_movie, safe=False)


@csrf_exempt
def updateMovie(request, movieId):

    if request.method == "POST":
        # Fetch the movie from database
        movie = Movie.objects.get(movieId=movieId)
        # print(request.POST.get('updated_bit'))
        if int(request.POST.get('updated_bit')) == int(1):
            print('INSIDE POST UPDATEED BIT')
            movie_poster = request.FILES['moviePoster']
            rand = random.getrandbits(64)
            random_num = str(rand)
            movieposterurl = 'http://127.0.0.1:8000/media/' + \
                request.POST.get('movieTitle')+random_num
            movie.moviePoster = movieposterurl
            res = default_storage.save(
                request.POST.get('movieTitle')+random_num, movie_poster)
            # movie.moviePoster =
        movie.movieTitle = request.POST.get('movieTitle')
        movie.movieDescription = request.POST.get('movieDescription')
        movie.movieCast = request.POST.get('movieCast')
        movie.movieRuntime = request.POST.get('movieRuntime')
        movie.movieKeywords = request.POST.get('movieKeywords')
        movie.movieDirector = request.POST.get('movieDirector')
        movie.movieProduction = request.POST.get('movieProduction')
        movie.movieTagline = request.POST.get('movieTagline')
        movie.save()

        movie_dict = movie.to_dict()
        movie_json_data = json.dumps(movie_dict)
        return JsonResponse(movie_json_data, safe=False)


def GetAllMovie(request):
    # if request.method == "GET":
    movie = Movie.objects.all()
    # movielist = []
    # for m in movie:
    #     movielist.append(m)
    to_dict_objs = collections.defaultdict(list)
    for i in range(0, len(movie)):
        current_movie = movie[i]
        # print(current_movie)
        # print()
        current_movie_dict = current_movie.to_dict()
        current_movie_dict["movieId"] = current_movie.movieId
        to_dict_objs["AllMovies"].append(current_movie_dict)

    jsdata = json.dumps(to_dict_objs)
    return JsonResponse(jsdata, safe=False)


@csrf_exempt
def getCollab(request,userId):
    dataset = pd.read_csv(str(settings.BASE_DIR) +'\\tmp1_dataset.csv', encoding="utf-8")    
    
    def standardize(row):
        # print(row.mean())
        if row.max() == 0:
            return row
        new_row = (row-row.mean())/(row.max()-row.min())
        return new_row


    dataset_std = dataset.apply(standardize)
    item_similarity = cosine_similarity(dataset_std.T)
    item_similarity_df = pd.DataFrame(item_similarity)
    liked_movies = Likes.objects.filter(user_id=userId)
    movieArr = []
    # print(item_similarity_df)
    def get_similar_movie(movie_id,user_rating):
        similar_score = item_similarity_df.loc[movie_id]*user_rating
        similar_score = similar_score.sort_values(ascending=False)
        return similar_score

    for i in range(0,len(liked_movies)):
        movieArr.append(liked_movies[i].movie.movieId)
    similar_movies = pd.DataFrame()
    for movie in movieArr:
        similar_movies = similar_movies.append(get_similar_movie(movie,10))
    # print(similar_movies)
    ans = similar_movies.sum().sort_values(ascending=False)
    # print(ans)
    to_dict_objs = collections.defaultdict(int)
    for x in ans:
        # print(x)
        if(x == 0.0):
            break
        to_dict_objs[x] += 1
        
    # print(to_dict_objs)
    # for key,val in to_dict_objs.values():
    #     print(key,val)
    arr = []
    for x in to_dict_objs:
        cnt=0
        while to_dict_objs[x] > 0:
            if(movieArr.count(ans[ans == x].index[cnt]) == 0):
                arr.append(ans[ans == x].index[cnt])
            to_dict_objs[x]-=1
            cnt+=1
            if(len(arr) == 25):
                break
    print(arr)
    # print(similar_movies.sum().sort_values(ascending=False))
    # print(ans)
    # print(type(ans))
    movies=[]
    for i in range(0,len(arr)):
        movie = Movie.objects.filter(movieId = arr[i])
        if(len(movie) != 0):
            print(movie[0])
            movies.append(movie[0])
    # print(movies)
    to_dict_objs1 = collections.defaultdict(list)
    for i in range(0, len(movies)):
        current_movie = movies[i]
        print(current_movie)
        # print()
        current_movie_dict = current_movie.to_dict()
        current_movie_dict["movieId"] = current_movie.movieId
        to_dict_objs1["AllMovies"].append(current_movie_dict)
    # print(type(movieArr))
    # for row in ans:
    #     print(x)
    #     if(movieArr.count(row[0])):
    #         continue
    #     elif(row[1] == 0.0):
    #         break
    #     elif(len(ans1) == 20):
    #         break
    #     else:
    #         ans1.append(row[0])
    jsdata = json.dumps(to_dict_objs1)
    return JsonResponse(jsdata, safe=False)

@csrf_exempt
def LikeMovie(request):
    # print("Here")
    if request.method == "POST":
        data = JSONParser().parse(request)
        movieId = data["movieId"]
        userId = data["userId"]
        user = CustomUser.objects.get(id=userId)
        movie = Movie.objects.get(movieId=movieId)
        movie.likecount = movie.likecount+1
        movie.save()
        liked_movie = Likes(user=user, movie=movie)
        liked_movie.save()
        # print('In liked Movie')

        dataset = pd.read_csv('C:\\Users\\17323\Desktop\Vrundan\SDP Project\MovieRecommendationApp\\tmp1_dataset.csv', encoding="utf-8")
        # print(dataset.columns.tolist())
        # print(dataset.columns.tolist())
        df = pd.DataFrame(dataset)
        print(df)
        # print(userId)
        # print(movieId)
        print(df.iloc[userId-1].loc[movieId])
        df.iloc[userId-1].loc[movieId] = 10
        print(df.iloc[userId-1].loc[movieId])
        df.to_csv('C:\\Users\\17323\Desktop\Vrundan\SDP Project\MovieRecommendationApp\\tmp1_dataset.csv',mode = 'w', index=False)
        return JsonResponse("Liked Successfully", safe=False)


@csrf_exempt
def DislikeMovie(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        movieId = data["movieId"]
        userId = data["userId"]
        print('In dislike Movie')
        # print(movieId)
        # print(userId) 
        user = CustomUser.objects.get(id=userId)
        movie = Movie.objects.get(movieId=movieId)
        liked_movie = Likes.objects.filter(user_id=user, movie_id=movie)
        movie.likecount = movie.likecount-1
        movie.save()
        liked_movie.delete()
        # print(dataset.columns.tolist())
        dataset = pd.read_csv(str(settings.BASE_DIR) +'\\tmp1_dataset.csv', encoding="utf-8")
        # print(dataset.columns.tolist())
        df = pd.DataFrame(dataset)
        # print(df.iloc[userId].loc[movieId])
        df.iloc[userId-1].loc[movieId] = 0
        
        df.to_csv('C:\\Users\\17323\Desktop\Vrundan\SDP Project\MovieRecommendationApp\\tmp1_dataset.csv',mode = 'w', index=False)
    return JsonResponse("Deleted", safe=False)


@csrf_exempt
def createDataset(request):
    movies = Movie.objects.all()
    feilds = ["movieId", "movieTitle", "movieDescription", "movieKeywords", "movieCast",
              "movieDirector", "movieProduction", "movieRuntime", "movieGenre", "movieTagline", "movieRating"]
    i = 0
    rows = []
    for movie in movies:
        if i == 97:
            i += 1
            continue
        row = [movie.movieId, movie.movieTitle, movie.movieDescription, movie.movieKeywords, movie.movieCast,
               movie.movieDirector, movie.movieProduction, movie.movieRuntime, movie.movieGenre, movie.movieTagline, movie.movieRating]
        rows.append(row)
        i += 1

    filename = str(settings.BASE_DIR)+"\\tmp_dataset.csv"
    with open(filename, 'w', encoding="utf-8") as csvfile:
        writer_object = writer(csvfile)
        writer_object.writerow(feilds)
        writer_object.writerows(rows)
        csvfile.close()
    # print(rows)
    return JsonResponse("Dataset Created Successfully", safe=False)


@csrf_exempt
def get_movies_of_all_genre(request):
    # Fetch all movies
    start = datetime.now()
    all_movies = Movie.objects.all()
    # print(all_movies.values()[0])
    according_to_genre = collections.defaultdict(list)
    for i in range(0, len(all_movies)):
        current_movie = all_movies[i]
        # print(current_movie)
        # print()
        genres_in_movie = []    # Storing all genres of current movie in a list
        current_movie_dict = current_movie.to_dict()
        current_movie_dict["movieId"] = current_movie.movieId
        if current_movie.movieGenre is not None:
            genres_in_movie = nltk.word_tokenize(current_movie.movieGenre)
        for j in range(0, len(genres_in_movie)):
            according_to_genre[genres_in_movie[j]].append(current_movie_dict)
        # print(current_movie_dict)
    according_to_genre_modify = collections.defaultdict(list)
    for i in according_to_genre:
        randArr = random.sample(range(0, len(according_to_genre[i])), min(
            25, len(according_to_genre[i])))
        # print(randArr)
        for j in range(len(randArr)):
            # print(according_to_genre[i][j])
            according_to_genre_modify[i].append(
                according_to_genre[i][randArr[j]])
    # print(according_to_genre_modify)
    json_Data = json.dumps(according_to_genre_modify)
    time_elapsed = datetime.now() - start
    print("Time taken : {}".format(time_elapsed))
    # print(json_Data)
    return JsonResponse(json_Data, safe=False)


@csrf_exempt
def isLiked(request, movieId, userId):
    liked_obj = Likes.objects.filter(movie_id=movieId, user_id=userId)
    res_dict = {}
    if liked_obj.count() == 1:
        res_dict["isLiked"] = True
    else:
        res_dict["isLiked"] = False
    json_data = json.dumps(res_dict)
    return JsonResponse(json_data, safe=False)

# Doubt : Do we need to scale ratings ? To make sure they always lie in range of 0-5 ?


@csrf_exempt
def rateMovie(request, movieid, userid):

    # Fetch MovieRating Object
    movie_rating_obj = MovieRating.objects.filter(
        movie_id=movieid, user_id=userid).first()
    print(movie_rating_obj)
    # Fetch movie with given id and extracting ratecount and movierating
    movie = Movie.objects.get(movieId=movieid)
    movies_prev_rating = movie.movieRating
    movies_rate_count = movie.ratecount

    print(movie)
    # Rating sent in request
    users_new_rating = request.POST['sentRating']
    print(users_new_rating)
    # If user has previously rated the movie then no need to increase the ratecount and calculate ratings by
    # Subtracting his/her previous ratings and adding new rating to the total and dividing total ratecount

    new_movie_rating = movie.movieRating    # Initializing with original

    if movie_rating_obj is not None:

        users_prev_rating = movie_rating_obj.rating_by_user

        # Calculate new rating
        new_movie_rating = (
            float(movies_prev_rating) - float(users_prev_rating) + float(users_new_rating))/(movies_rate_count)

        # Update movie rating object
        movie_rating_obj.rating_by_user = users_new_rating
        movie_rating_obj.save()

    else:
        # If user has not rated the movie previously then ratecount must be incremented and new MovieRating object must be created

        user = CustomUser.objects.get(id=userid)
        new_movie_rating_obj = MovieRating(
            movie=movie, user=user, rating_by_user=users_new_rating)
        new_movie_rating_obj.save()

        movies_rate_count += 1
        new_movie_rating = (float(movies_prev_rating) +
                            float(users_new_rating))/int(movies_rate_count)
        movie.ratecount = movies_rate_count

    # Update new movie rating into movie object
    movie.movieRating = new_movie_rating
    movie.save()

    movie_dict = movie.to_dict()
    movie_json_data = json.dumps(movie_dict)
    return JsonResponse(movie_json_data, safe=False)
