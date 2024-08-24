from django.urls import re_path # type: ignore
from room import consumers

websocket_urlpatterns = [
    re_path(r'ws/room/(?P<room_name>[a-zA-Z0-9-_]+)/$', consumers.RoomConsumer.as_asgi()),
]