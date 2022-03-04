from black import json
from django.http import JsonResponse
from django.shortcuts import render
from MovieOperations.models import Movie, Likes
from Accounts.models import userPreferences
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from rest_framework.parsers import JSONParser
import random
from django.core.files.storage import default_storage
from django.forms.models import model_to_dict
from MovieOperations.serializers import MovieSerializer, MovieEncoder
from django.contrib import auth
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from Accounts.models import CustomUser, userPreferences
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.conf import settings
import collections
import nltk


# Create your views here.
dataset = pd.read_csv(str(settings.BASE_DIR) +
                      '\\today1_dataset.csv', encoding="utf-8")
# print(dataset)


def get_title_from_index(index):
    return dataset[dataset.movieId == index]["movieTitle"].values[0]


def get_index_from_title(title):
    return dataset[dataset.movieTitle == title]["movieId"].values[0]


def getRecommendations(movieName):

    features = ['movieTitle', 'movieCast', 'movieGenre', 'movieDirector']
    for feature in features:
        dataset[feature] = dataset[feature].fillna('')

    def combine_feature(row):
        return row['movieTitle']+" "+row['movieCast']+" "+row['movieGenre']+" "+row['movieDirector']

    dataset["combined_features"] = dataset.apply(combine_feature, axis=1)
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(dataset["combined_features"])
    similarity = cosine_similarity(count_matrix)
    movie_index = get_index_from_title(movieName)
    similar_movies = list(enumerate(similarity[movie_index]))
    sorted_similarMovies = sorted(
        similar_movies, key=lambda x: x[1], reverse=True)
    return sorted_similarMovies


@csrf_exempt
def login(request):
    if request.method == "POST":
        username = request.POST["userName"]
        password = request.POST["password"]
        try:
            currentuser = authenticate(username=username, password=password)

            print(not currentuser)
            if (not currentuser):
                return JsonResponse("Login Failed", safe=True)

            print("vrinda")
            cur_user = CustomUser.objects.get(user_id=currentuser.id)
            print(cur_user)
            cur_user_dict = cur_user.to_dict()
            cur_user_json = json.dumps(cur_user_dict)
            # print(cur_user_json)
            if currentuser is not None:
                return JsonResponse(cur_user_json, safe=False)
            else:
                return JsonResponse("Login Failed", safe=False)
        except:
            print("vrinda")
            return JsonResponse("Login Failed", safe=False)


@csrf_exempt
def signup(request):
    if request.method == "POST":
        firstname = request.POST['firstName']
        username = request.POST['userName']
        lastname = request.POST['lastName']
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = User.objects.get(username=username)
            return JsonResponse("User with this username already exists", safe=False)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=email)
                return JsonResponse("User with this email already exists", safe=False)
            except:
                user = User.objects.create_user(
                    username=username, password=password, first_name=firstname, last_name=lastname, email=email)
                customUser = CustomUser(user_id=user.id)
                user.save()
                customUser.save()
                return JsonResponse("Signup Success", safe=False)


@csrf_exempt
def get_user(request, userId):
    # print(username)
    cur_user = CustomUser.objects.get(id=userId)
    curr_user_dict = collections.defaultdict(list)
    curr_user_dict["userName"] = cur_user.user.username
    curr_user_dict["first_name"] = cur_user.user.first_name
    curr_user_dict["last_name"] = cur_user.user.last_name
    curr_user_dict["email"] = cur_user.user.email
    curr_user_dict['profilepic'] = cur_user.profilepic
    cur_user_json = json.dumps(curr_user_dict)
    return JsonResponse(cur_user_json, safe=False)


@csrf_exempt
def get_liked_movies_of_user(request, id):
    userId = id
    liked_movies = Likes.objects.filter(user_id=userId)
    x = len(liked_movies)
    # print(x)
    obj = liked_movies[0].movie
    dict_obj = model_to_dict(obj)
    data = json.dumps(dict_obj)
    all_recommendation = collections.defaultdict(list)
    for i in range(0, len(liked_movies)):
        current_movie = liked_movies[i].movie.movieTitle
        recommendations_for_current_movie = []
        recommended_movie_tuples = getRecommendations(current_movie)
        cnt = 0
        for recommended_movie in recommended_movie_tuples:
            # If movie has similarity score of more than 0.4
            if cnt < 25:
                # recommended_movie[0] = id , recommended_movie[1]= similarity_score with current movie
                # print(recommended_movie[0])
                movieobj = Movie.objects.get(movieId=(recommended_movie[0]+1))
                recommendations_for_current_movie.append(movieobj)
                cnt += 1
            else:
                break

        for obj in recommendations_for_current_movie:
            tmpobj = obj.to_dict()
            tmpobj["movieId"] = obj.movieId
            # to_dict_objs[current_movie].append(tmpobj)
            all_recommendation[current_movie].append(tmpobj)
            # print(current_movie)
        # jsdata = json.dumps({current_movie: to_dict_objs})
    # print(all_recommendation)
    data2 = json.dumps(all_recommendation)
    # print(data2)
    return JsonResponse(data2, safe=False)


@csrf_exempt
def getPreferences(request, id):
    getPreferences = userPreferences.objects.filter(userId=id)
    # print(getPreferences[0].genre1)

    tmpPreferences = []
    tmpPreferences.append(getPreferences[0].genre1)
    tmpPreferences.append(getPreferences[0].genre2)
    tmpPreferences.append(getPreferences[0].genre3)
    all_movies = Movie.objects.all()
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
    for i in tmpPreferences:
        randArr = random.sample(range(0, len(according_to_genre[i])), min(
            25, len(according_to_genre[i])))
        # print(randArr)
        for j in range(len(randArr)):
            # print(according_to_genre[i][j])
            according_to_genre_modify[i].append(
                according_to_genre[i][randArr[j]])
    json_Data = json.dumps(according_to_genre_modify)
    # print(json_Data)
    return JsonResponse(json_Data, safe=False)


@csrf_exempt
def updateProfile(request, id):

    if request.method == 'POST':
        # Extract user with given id
        user = CustomUser.objects.get(id=id)

        # Extract profile picture image from incoming form data

        if int(request.POST.get('updated_bit')) == int(1):
            propic = request.FILES['profPicfile']

        # If user has updated his/her profile picture it will not be null
            if propic is not None:
                # Generate a random number of 64bits
                rand = random.getrandbits(64)
                random_num = str(rand)

                # Generate a url in which initial part is url of backend server's media folder and latter part is username and appending the randomly generated number
                # Assign the profileurl to user's profilepic field in database
                profileurl = 'http://127.0.0.1:8000/media/'+user.user.username+random_num
                user.profilepic = profileurl

                # Store the image into backend's media folder
                res = default_storage.save(
                    user.user.username+random_num, propic)
    # Update other fields as well
    print(request.POST['firstname'])
    print(request.POST['lastname'])

    user.user.first_name = request.POST['firstname']
    user.user.last_name = request.POST['lastname']
    user.user.email = request.POST['email']

    # Save the updated user
    user.user.save()
    user.save()
    return JsonResponse("user successfully updated", safe=False)


@csrf_exempt
def getLikedMovie(request, id):
    liked_movies = Likes.objects.filter(user_id=id)
    obj = []
    for movie in liked_movies:
        obj.append(movie.movie)

    all_recommendation = collections.defaultdict(list)
    for obj1 in obj:
        tmpobj = obj1.to_dict()
        tmpobj["movieId"] = obj1.movieId
        # to_dict_objs[current_movie].append(tmpobj)
        all_recommendation["liked_movie"].append(tmpobj)
    data2 = json.dumps(all_recommendation)
    # print(data2)
    return JsonResponse(data2, safe=False)


@csrf_exempt
def getRatios(request, id):
    liked_movies = Likes.objects.filter(user_id=id)
    obj = []  # all liked movies stored here
    for movie in liked_movies:
        obj.append(movie.movie)
    all_recommendation = collections.defaultdict(
        int)  # count of movies based on genre
    total_movie = 0  # total movie count
    for obj1 in obj:
        tmpobj = obj1.to_dict()
        genres_in_movie = []    # Storing all genres of current movie in a list
        if obj1.movieGenre is not None:
            genres_in_movie = nltk.word_tokenize(obj1.movieGenre)
        cnt = 0
        # movie added in genre and counting number of genre
        for j in range(0, len(genres_in_movie)):
            all_recommendation[genres_in_movie[j]] += 1
            cnt += 1

        total_movie += cnt
    returnObj = collections.defaultdict(list)

    # creating data items for graph (contains title,value,color)
    for key, value in all_recommendation.items():
        def r(): return random.randint(0, 255)
        color = "%06x" % random.randint(0, 0xFFFFFF)
        # print(color)
        num = ((value*100*1.0) / total_movie)
        formatted_num = '{0:.2f}'.format(num)
        print(type(formatted_num))
        print(formatted_num)
        tmp = "#"+color
        data = {
            "title": key,
            "value": float(formatted_num),
            "color": tmp
        }
        returnObj["movies"].append(data)
    data2 = json.dumps(returnObj)
    # print(data2)
    return JsonResponse(data2, safe=False)


def getrecommendations(request, id):
    movie = Movie.objects.get(movieId=id)
    # print(movie)
    current_movie = movie.movieTitle
    recommended_movie_tuples = getRecommendations(current_movie)
    # print(recommended_movie_tuples)
    cnt = 0
    all_recommendation = collections.defaultdict(list)
    recommendations_for_current_movie = []
    for recommended_movie in recommended_movie_tuples:
        # If movie has similarity score of more than 0.4
        if cnt < 30:
            # recommended_movie[0] = id , recommended_movie[1]= similarity_score with current movie
            # print(recommended_movie[0])
            movieobj = Movie.objects.get(movieId=(recommended_movie[0]+1))
            recommendations_for_current_movie.append(movieobj)
            cnt += 1
        else:
            break
    for obj in recommendations_for_current_movie:
        tmpobj = obj.to_dict()
        tmpobj["movieId"] = obj.movieId
        # to_dict_objs[current_movie].append(tmpobj)
        all_recommendation["recommend"].append(tmpobj)

    data2 = json.dumps(all_recommendation)
    # print(data2)
    return JsonResponse(data2, safe=False)


@csrf_exempt
def user_preferences(request, id):
    if request.method == "POST":
        genre1 = request.POST['genre1']
        genre2 = request.POST['genre2']
        genre3 = request.POST['genre3']

        userPreference = userPreferences(
            userId=id, genre1=genre1, genre2=genre2, genre3=genre3)
        userPreference.save()
        user = CustomUser.objects.get(id=id)
        user.isFilled = False
        user.save()
        return JsonResponse("userPreferences uploaded", safe=False)


@csrf_exempt
def getGendersRatio(request):

    all_males = CustomUser.objects.filter(gender="Male")
    all_females = CustomUser.objects.filter(gender="Female")

    total_males = all_males.count()
    total_females = all_females.count()
    total_users = total_males+total_females
    # ratio={}
    male_percent = total_males * 100/total_users
    female_percent = total_females*100/total_users
    male_dict = {'x': "Male", 'y': male_percent}
    female_dict = {'x': "Female", 'y': female_percent}
    ratio = []
    ratio.append(male_dict)
    ratio.append(female_dict)
    json_data = json.dumps(ratio)
    return JsonResponse(json_data, safe=False)


@csrf_exempt
def getGenderCount(request):

    all_males = CustomUser.objects.filter(gender="Male").count()
    all_females = CustomUser.objects.filter(gender="Female").count()

    gendercount = []
    male_dict = {'name': 'Male', 'value': all_males}
    female_dict = {'name': 'female', 'value': all_females}
    gendercount.append(male_dict)
    gendercount.append(female_dict)
    json_data = json.dumps(gendercount)
    return JsonResponse(json_data, safe=False)
