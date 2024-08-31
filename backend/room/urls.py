from django.urls import path, include # type: ignore
from . import views

urlpatterns = [
    path("doesExist/", views.DoesExist.as_view(), name="doesExist"),
]