from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from MovieOperations.models import Movie
from MovieOperations.serializers import MovieSerializer
import random
import os
from django.conf import settings        

# Create your views here.

@csrf_exempt
def UploadMovie(request):
    if request.method == "POST":
        movieVideo = request.FILES["MovieVideo"]
        movieTitle = request.POST["movieTitle"]
        movieDescription = request.POST["movieDescription"]
        movieKeyword = request.POST["movieKeyword"]
        movieCast = request.POST["movieCast"]
        movieDirector = request.POST["movieDirector"]
        movieRuntime = request.POST["movieRuntime"]
        movieGenre = request.POST["movieGenre"]
        movieRating = request.POST["movieRating"]
        movieProduction = request.POST["movieProduction"]
        rand = random.getrandbits(128)
        movieUrl = str(rand) + "_" + movieTitle
        movieTagline = request.POST["movieTagline"]

        movie = Movie(movieTitle=movieTitle,movieDescription=movieDescription,movieProduction=movieProduction,movieKeywords=movieKeyword,movieCast=movieCast,movieDirector=movieDirector,movieRuntime=movieRuntime,movieGenre=movieGenre,movieRating=movieRating,movieUrl=movieUrl,movieTagline=movieTagline)
        res = default_storage.save(movieUrl,movieVideo)
        movie.save()
        movies_serializer = MovieSerializer(movie,many=False)
        return JsonResponse(movies_serializer.data,safe=False)

@csrf_exempt
def SearchMovie(request):
    if request.method == "POST":
        movies = Movie.objects.filter(movieTitle__icontains=request.POST["movieName"])
        movies_serializer = MovieSerializer(movies,many=True)
        return JsonResponse(movies_serializer.data,safe=False)


@csrf_exempt
def DeleteMovie(request,id):
    if request.method == "DELETE":
        movie = Movie.objects.filter(movieId = id)
        x = str(settings.BASE_DIR)+"/media/"+movie.values()[0]["movieUrl"]
        print(settings.BASE_DIR)
        if os.path.exists(x):
            print("The file exist")
            os.remove(x)
        else:
            print("The file does not exist")
        movie.delete()
        return JsonResponse("Delete successful",safe = False)



