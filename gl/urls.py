from django.urls import path
from . import views

app_name = "gl"

urlpatterns = [
    path("test/", views.test, name="test"),
    path("test2/", views.test2, name="test2"),
]
