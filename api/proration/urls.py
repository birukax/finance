from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(
    r"proration-types",
    views.ProrationTypeViewSet,
    basename="proration-type",
)

urlpatterns = [
    path("", include(router.urls)),
]
