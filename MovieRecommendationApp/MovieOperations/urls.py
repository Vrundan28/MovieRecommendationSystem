from django.urls import re_path
from MovieOperations import views

urlpatterns=[
    re_path(r'uploadMovie/',views.UploadMovie)
]