from django.db import models

class Room(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    current_word = models.CharField(max_length=100, blank=True, null=True)
    current_drawer = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, related_name="drawer")
    timer = models.IntegerField(default=0)

class User(models.Model):
    username = models.CharField(max_length=12)
    avatar = models.CharField(max_length=10000)
    room = models.ForeignKey('Room', on_delete=models.CASCADE, related_name="users")