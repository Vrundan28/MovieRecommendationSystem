from rest_framework import serializers
from LoginApp.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userId',
                  'name',
                  'userName',
                  'password' )