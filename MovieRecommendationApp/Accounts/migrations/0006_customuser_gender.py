# Generated by Django 4.0.1 on 2022-03-04 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0005_userpreferences_userid'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='gender',
            field=models.CharField(max_length=20, null=True),
        ),
    ]