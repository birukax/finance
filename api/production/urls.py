from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(
    r"items",
    views.ItemViewSet,
    basename="item",
)
router.register(
    r"locations",
    views.LocationViewSet,
    basename="location",
)
router.register(
    r"orders",
    views.OrderViewSet,
    basename="order",
)
router.register(
    r"routings",
    views.RoutingViewSet,
    basename="routing",
)
router.register(
    r"outputs",
    views.OutputViewSet,
    basename="output",
)
router.register(
    r"label-per-hours",
    views.LabelPerHourViewSet,
    basename="label-per-hour",
)

urlpatterns = [
    path("", include(router.urls)),
]
