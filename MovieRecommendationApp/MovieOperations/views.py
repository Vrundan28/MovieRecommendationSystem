from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser


# Create your views here.

@csrf_exempt
def UploadMovie(request):
    if request.method == "POST":
        movie = request.FILES["MovieVideo"]
        movieName = request.POST["movieName"]
        res = default_storage.save(movieName,movie)
        return JsonResponse("res",safe=False)


