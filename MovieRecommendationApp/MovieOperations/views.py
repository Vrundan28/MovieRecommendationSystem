from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from MovieOperations.models import Movie, Likes
from MovieOperations.serializers import MovieSerializer
from Accounts.models import CustomUser
import random
import os
from django.conf import settings
from csv import writer
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
        tmp_movie = [x,movieTitle,movieDescription,movieKeyword,movieCast,movieDirector,movieProduction,movieRuntime,movieGenre,movieTagline,movieRating]
        filename = str(settings.BASE_DIR)+"\\tmp_dataset.csv"
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
        x = str(settings.BASE_DIR)+"/media/"+movie.values()[0]["movieUrl"]
        print(settings.BASE_DIR)
        if os.path.exists(x):
            print("The file exist")
            os.remove(x)
        else:
            print("The file does not exist")
        movie.delete()
        return JsonResponse("Delete successful", safe=False)


@csrf_exempt
def GetMovie(request, id):
    if request.method == "GET":
        movie = Movie.objects.filter(movieId=id)
        return JsonResponse(movie.values()[0], safe=False)


@csrf_exempt
def LikeMovie(request):
    print("Here")
    if request.method == "POST":
        data = JSONParser().parse(request)
        movieId = data["movieId"]
        userId = data["userId"]
        user = CustomUser.objects.get(user_id=userId)
        movie = Movie.objects.get(movieId=movieId)
        liked_movie = Likes(user=user,movie=movie) 
        liked_movie.save()
        return JsonResponse("Liked Successfully", safe=False)


@csrf_exempt
def createDataset(request):
    movies = Movie.objects.all()
    feilds = ["movieId","movieTitle","movieDescription","movieKeywords","movieCast","movieDirector","movieProduction","movieRuntime","movieGenre","movieTagline","movieRating"]
    i=0
    rows = []
    for movie in movies:
        if i == 97 :
            i+=1
            continue
        row = [movie.movieId,movie.movieTitle,movie.movieDescription,movie.movieKeywords,movie.movieCast,movie.movieDirector,movie.movieProduction,movie.movieRuntime,movie.movieGenre,movie.movieTagline,movie.movieRating]
        rows.append(row)
        i+=1

    filename = str(settings.BASE_DIR)+"\\tmp_dataset.csv"
    with open(filename, 'w', encoding="utf-8") as csvfile: 
        writer_object = writer(csvfile)
        writer_object.writerow(feilds)
        writer_object.writerows(rows)
        csvfile.close()

    # print(rows)

    return JsonResponse("Dataset Created Successfully", safe=False)


