from black import json
from django.http import JsonResponse
from django.shortcuts import render
from MovieOperations.models import Movie, Likes
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from rest_framework.parsers import JSONParser
from django.forms.models import model_to_dict
from MovieOperations.serializers import MovieSerializer, MovieEncoder

# Create your views here.


@csrf_exempt
def get_liked_movies_of_user(request,id):
    userId = id
    liked_movies = Likes.objects.filter(user_id=userId)
    obj = liked_movies[0].movie    
    dict_obj = model_to_dict(obj)
    data = json.dumps(dict_obj)
    print(data)
    return JsonResponse(data, safe=False)
