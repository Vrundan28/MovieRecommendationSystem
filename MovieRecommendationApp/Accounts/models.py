from django.db import models

from django.contrib.auth.models import User
# Create your models here.


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def to_dict(self):
        return {"userId": self.user_id, "username": self.user.username, "isSuperuser": self.user.is_superuser}
