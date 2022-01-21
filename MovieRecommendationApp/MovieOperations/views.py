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
        res = default_storage.save(movieUrl, movieVideo)
        res = default_storage.save(posterUrl, moviePoster)
        movie.save()
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
