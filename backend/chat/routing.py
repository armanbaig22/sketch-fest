from django.urls import re_path
from chat import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/canvas/(?P<room_name>\w+)/$', consumers.CanvasConsumer.as_asgi()),
]