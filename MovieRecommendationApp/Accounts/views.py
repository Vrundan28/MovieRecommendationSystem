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


# Create your views here.


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
            # print(user)
            user.save()
            customUser.save()
            return JsonResponse("Signup Success", safe=False)


@csrf_exempt
def get_liked_movies_of_user(request, id):
    userId = id
    liked_movies = Likes.objects.filter(user_id=userId)
    obj = liked_movies[0].movie
    dict_obj = model_to_dict(obj)
    data = json.dumps(dict_obj)
    print(data)
    return JsonResponse(data, safe=False)
