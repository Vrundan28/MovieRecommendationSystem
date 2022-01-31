from black import json
from django.http import JsonResponse
from django.shortcuts import render
from MovieOperations.models import Movie, Likes
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from rest_framework.parsers import JSONParser
from django.forms.models import model_to_dict
from MovieOperations.serializers import MovieSerializer, MovieEncoder
from django.contrib import auth
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from Accounts.models import CustomUser
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.conf import settings

# Create your views here.
dataset = pd.read_csv(str(settings.BASE_DIR) +
                      '\\tmp_dataset.csv', encoding="utf-8")
# print(dataset)


def get_title_from_index(index):
    return dataset[dataset.movieId == index]["movieTitle"].values[0]


def get_index_from_title(title):
    return dataset[dataset.movieTitle == title]["movieId"].values[0]


def getRecommendations(movieName):

    features = ['movieKeywords', 'movieCast', 'movieGenre',
                'movieDirector', 'movieTitle', 'movieProduction']
    for feature in features:
        dataset[feature] = dataset[feature].fillna('')

    def combine_feature(row):
        return row['movieKeywords']+" "+row['movieCast']+" "+row['movieGenre']+" "+row['movieDirector']+" "+row['movieTitle']+" "+row['movieProduction']

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
        currentuser = authenticate(username=username, password=password)
        if currentuser is not None:
            return JsonResponse("Login Success", safe=False)
        else:
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
            user = User.objects.create_user(
                username=username, password=password, first_name=firstname, last_name=lastname, email=email)
            customUser = CustomUser(user_id=user.id)
            user.save()
            customUser.save()
            return JsonResponse("Signup Success", safe=False)


@csrf_exempt
def get_liked_movies_of_user(request, id):
    userId = id
    liked_movies = Likes.objects.filter(user_id=userId)
    x = len(liked_movies)
    # print(x)
    obj = liked_movies[0].movie
    dict_obj = model_to_dict(obj)
    data = json.dumps(dict_obj)
    all_recommendation = []
    for i in range(0, len(liked_movies)):
        current_movie = liked_movies[i].movie.movieTitle
        recommendations_for_current_movie = []
        recommended_movie_tuples = getRecommendations(current_movie)
        for recommended_movie in recommended_movie_tuples:
            # If movie has similarity score of more than 0.4
            if recommended_movie[1] > 0.4:
                # recommended_movie[0] = id , recommended_movie[1]= similarity_score with current movie
                movieobj = Movie.objects.get(movieId=recommended_movie[0])
                recommendations_for_current_movie.append(movieobj)
            else:
                break
        to_dict_objs = [obj.to_dict()
                        for obj in recommendations_for_current_movie]
        jsdata = json.dumps({current_movie: to_dict_objs})
        all_recommendation.append(jsdata)
    data2 = json.dumps(all_recommendation)
    return JsonResponse(data2, safe=False)

    movies = getRecommendations(liked_movies[0].movie.movieTitle)
    print(movies)
    for movie in movies:
        print(get_title_from_index(movie[0]))
    return JsonResponse(data, safe=False)

