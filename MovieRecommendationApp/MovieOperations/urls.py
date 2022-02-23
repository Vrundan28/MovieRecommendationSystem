from django.urls import re_path
from MovieOperations import views

urlpatterns = [
    re_path(r'uploadMovie/', views.UploadMovie),
    re_path(r'searchMovie/', views.SearchMovie),
    re_path(r'deleteMovie/([0-9]+)', views.DeleteMovie),
    re_path(r'getMovie/([0-9]+)', views.GetMovie),
    re_path(r'likeMovie/', views.LikeMovie),
    re_path(r'createDataset/',views.createDataset),
    re_path(r'searchMovie/',views.SearchMovie),
    re_path(r'GetAllMovie/',views.GetAllMovie),
    re_path(r'Get_All_Genre_Movie',views.get_movies_of_all_genre)

]
