from django.urls import path
from Friends import views
urlpatterns = [
    path('addFriend', views.add_friend),
    path('getAllFriends', views.get_all_friends_of_user),
]
