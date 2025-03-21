from django.urls import path
from . import views

app_name = "production"
urlpatterns = [
    path("get-items", views.test_fetch, name="get_items"),
]
