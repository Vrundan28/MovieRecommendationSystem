from django.db import models
from Accounts.models import CustomUser

class Friendship(models.Model):
    from_user = models.ForeignKey(CustomUser,related_name="from_user",on_delete=models.CASCADE)
    to_user = models.ForeignKey(CustomUser,related_name="to_user",on_delete=models.CASCADE) 
