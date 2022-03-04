from django.db import models

from django.contrib.auth.models import User
# Create your models here.


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profilepic = models.CharField(
        max_length=1024, default="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png")
    isFilled = models.BooleanField()
    gender = models.CharField(max_length=20, null=True)

    def to_dict(self):
        return {"userId": self.id, "username": self.user.username, "isSuperuser": self.user.is_superuser, "isFilled": self.isFilled}


class userPreferences(models.Model):
    userId = models.IntegerField(default=0)
    genre1 = models.CharField(max_length=50)
    genre2 = models.CharField(max_length=50)
    genre3 = models.CharField(max_length=50)

    def to_dict(self):
        return {"userId": self.userId, "genre1": self.genre1, "genre2": self.genre2, "genre3": self.genre3}
