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
    movieRating = models.FloatField(validators=[
        MaxValueValidator(5.0),
        MinValueValidator(0.0)
    ])
    movieUrl = models.CharField(max_length=1024, null=True)
    moviePoster = models.CharField(max_length=1024, null=True)
    likecount = models.IntegerField(default=0)
    ratecount = models.IntegerField(default=0)

    def to_dict(self):
        return {"movieTitle": self.movieTitle, "movieDescription": self.movieDescription, "movieKeywords": self.movieKeywords, "movieCast": self.movieCast, "movieDirector": self.movieDirector, "movieProduction": self.movieProduction, "movieRuntime": self.movieRuntime, "movieGenre": self.movieGenre, "movieTagline": self.movieTagline, "movieRating": self.movieRating, "movieUrl": self.movieUrl, "moviePoster": self.moviePoster, "likeCount": self.likecount, "ratecount": self.ratecount}


class Likes(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)


class MovieRating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating_by_user = models.IntegerField(default=0)
