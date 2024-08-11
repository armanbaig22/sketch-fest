import random
import string
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from room.models import Room, User
from .serializers import PlaySerializer

def generate_room_id(length=16):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

class PlayView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PlaySerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            avatar = serializer.validated_data['avatar']

            # Find a room with less than 6 players or create a new one
            room = Room.objects.annotate(num_users=models.Count('users')).filter(num_users__lt=6).first()

            if not room:
                room_id = generate_room_id()
                room = Room.objects.get_or_create(id=room_id)

            user = User.objects.get_or_create(room=room, username=username, avatar=avatar)
            
            return Response({"room_id": room.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
