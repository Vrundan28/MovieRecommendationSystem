# Generated by Django 4.0.1 on 2022-02-27 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profilepic',
            field=models.CharField(default='https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png', max_length=1024),
        ),
    ]