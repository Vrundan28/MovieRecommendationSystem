from re import M
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from Accounts.models import CustomUser
# Create your models here.


class Movie(models.Model):
    movieId = models.AutoField(primary_key=True)
    movieTitle = models.CharField(max_length=100)
    movieDescription = models.CharField(max_length=1000, null=True)
    movieKeywords = models.CharField(max_length=500, null=True)
    movieCast = models.CharField(max_length=500, null=True)
    movieDirector = models.CharField(max_length=100, null=True)
    movieProduction = models.CharField(max_length=500, null=True)
    movieRuntime = models.IntegerField()
    movieGenre = models.CharField(max_length=150, null=True)
    movieTagline = models.CharField(max_length=100, null=True)
    movieRating = models.IntegerField(validators=[
        MaxValueValidator(10),
        MinValueValidator(1)
    ])
    movieUrl = models.CharField(max_length=1024, null=True)
    moviePoster = models.CharField(max_length=1024, null=True)

    # def __init__(self,movieId,movieTitle,movieDescription,movieKeywords,movieCast,movieDirector,movieProduction,movieRuntime,movieGenre,movieTagline,movieRating,movieUrl,moviePoster):
    #     self.movieId=movieId
    #     self.movieTitle=movieTitle
    #     self.movieDescription=movieDescription
    #     self.movieKeywords=movieKeywords
    #     self.movieCast=movieCast
    #     self.movieDirector=movieDirector
    #     self.movieProduction=movieProduction
    #     self.movieRuntime=movieRuntime
    #     self.movieGenre=movieGenre
    #     self.movieTagline=movieTagline
    #     self.movieRating=movieRating
    #     self.movieUrl=movieUrl
    #     self.moviePoster=moviePoster

    def to_dict(self):
        return {"movieTitle": self.movieTitle, "movieDescription": self.movieDescription, "movieKeywords": self.movieKeywords, "movieCast": self.movieCast, "movieDirector": self.movieDirector, "movieProduction": self.movieProduction, "movieRuntime": self.movieRuntime, "movieGenre": self.movieGenre, "movieTagline": self.movieTagline, "movieRating": self.movieRating, "movieUrl": self.movieUrl, "moviePoster": self.moviePoster}


class Likes(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
