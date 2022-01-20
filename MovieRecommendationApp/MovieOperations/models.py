from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

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
    movieUrl = models.CharField(max_length=1024)
    moviePoster = models.CharField(max_length=1024,null=True)
