from django.db import models

from django.contrib.auth.models import User
# Create your models here.


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profilepic = models.CharField(max_length=1024,default="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png")

    def to_dict(self):
        return {"userId": self.id, "username": self.user.username, "isSuperuser": self.user.is_superuser}
        