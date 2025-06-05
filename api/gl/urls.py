from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()


router.register(
    r"proration-types",
    views.ProrationTypeViewSet,
    basename="proration-type",
)
router.register(
    r"accounts",
    views.AccountViewSet,
    basename="account",
)
router.register(
    r"net-changes",
    views.NetChangeViewSet,
)

urlpatterns = [
    path("", include(router.urls)),
]
