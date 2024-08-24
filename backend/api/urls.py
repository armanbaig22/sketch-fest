from django.urls import path, include # type: ignore
from . import views

urlpatterns = [
    path("play/", views.PlayView.as_view(), name="play"),
]