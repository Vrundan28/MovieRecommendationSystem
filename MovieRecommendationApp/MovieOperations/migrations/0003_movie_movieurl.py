# Generated by Django 4.0.1 on 2022-01-18 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MovieOperations', '0002_alter_movie_moviecast_alter_movie_moviedescription_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='movieUrl',
            field=models.CharField(default=' ', max_length=1024),
            preserve_default=False,
        ),
    ]
