from django.db import models

# Create your models here.

class User(models.Model):
    userId = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)
    userName = models.CharField(max_length = 100)
    password = models.CharField(max_length = 20)


