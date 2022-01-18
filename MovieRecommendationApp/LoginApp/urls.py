from django.urls import re_path
from LoginApp import views

urlpatterns=[
    re_path(r'^user/$',views.UserApi),
    re_path(r'^user/([0-9]+)$',views.UserApi)
]