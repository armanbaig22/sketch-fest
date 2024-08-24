from django.db import models # type: ignore

class Room(models.Model):
    id = models.CharField(primary_key=True, max_length=16, editable=False)
    current_word = models.CharField(max_length=100, blank=True, null=True)
    current_drawer = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, related_name="drawer")
    timer = models.IntegerField(default=0)

class User(models.Model):
    username = models.CharField(max_length=12)
    avatar = models.TextField() 
    room = models.ForeignKey('Room', on_delete=models.CASCADE, related_name="users")
