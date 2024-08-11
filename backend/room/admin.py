from django.contrib import admin
from .models import Room, User

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'current_word', 'current_drawer', 'timer')
    search_fields = ('id', 'current_word')

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'room')
    search_fields = ('username', 'room__id')
