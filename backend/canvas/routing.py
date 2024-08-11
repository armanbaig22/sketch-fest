from django.urls import re_path
from canvas import consumers

websocket_urlpatterns = [
    re_path(r'ws/canvas/(?P<room_name>[a-zA-Z0-9-_]+)/$', consumers.CanvasConsumer.as_asgi()),
]