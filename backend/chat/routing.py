from django.urls import re_path
from chat import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>[a-zA-Z0-9-_]+)/$', consumers.ChatConsumer.as_asgi()),
]