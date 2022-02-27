from django.urls import re_path
from Accounts import views

urlpatterns = [
    re_path(r'getLiked/([0-9]+)', views.get_liked_movies_of_user),
    re_path(r'login/', views.login),
    re_path(r'signup/', views.signup),
    re_path(r'getUser/([0-9]+)', views.get_user),
    re_path(r'getLikedMovie/([0-9]+)',views.getLikedMovie)
]
