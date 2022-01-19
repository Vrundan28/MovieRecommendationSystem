from django.urls import re_path
from MovieOperations import views

urlpatterns=[
    re_path(r'uploadMovie/',views.UploadMovie),
    re_path(r'searchMovie/',views.SearchMovie),
    re_path(r'deleteMovie/([0-9]+)',views.DeleteMovie),
]