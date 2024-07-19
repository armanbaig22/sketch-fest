# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Room, User
from .serializers import RoomSerializer, UserSerializer

class RoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')

        if action == 'join':
            await self.join_room(data)
        elif action == 'update_game_state':
            await self.update_game_state(data)
        # Add more actions as needed

    async def join_room(self, data):
        username = data['username']
        avatar = data['avatar']

        room = await self.get_room(self.room_name)
        user = await self.create_user(room, username, avatar)

        await self.send_room_data()

    async def update_game_state(self, data):
        room = await self.get_room(self.room_name)
        room.current_word = data['current_word']
        room.current_drawer_id = data['current_drawer']
        room.timer = data['timer']
        await database_sync_to_async(room.save)()

        await self.send_room_data()

    async def send_room_data(self):
        room = await self.get_room(self.room_name)
        users = await self.get_users(room)
        room_data = {
            'name': room.name,
            'current_word': room.current_word,
            'current_drawer': room.current_drawer.username if room.current_drawer else None,
            'timer': room.timer,
            'users': users,
        }

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'room_update',
                'room_data': room_data
            }
        )

    async def room_update(self, event):
        room_data = event['room_data']

        # Send message to WebSocket
        await self.send(text_data=json.dumps(room_data))

    @database_sync_to_async
    def get_room(self, room_name):
        return Room.objects.get(name=room_name)

    @database_sync_to_async
    def create_user(self, room, username, avatar):
        return User.objects.create(room=room, username=username, avatar=avatar)

    @database_sync_to_async
    def get_users(self, room):
        users = User.objects.filter(room=room)
        return UserSerializer(users, many=True).data
