from django.urls import re_path
from Accounts import views

urlpatterns = [
    re_path(r'getLiked/([0-9]+)', views.get_liked_movies_of_user), 
]
