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
    r"prorations",
    views.ProrationViewSet,
    basename="proration",
)

router.register(
    r"output-summaries",
    views.OutputSummaryViewSet,
    basename="output-summary",
)

router.register(
    r"proration-type-summaries",
    views.ProrationTypeSummaryViewSet,
    basename="proration-type-summary",
)

router.register(
    r"proration-summaries",
    views.ProrationSummaryViewSet,
    basename="proration-summary",
)

router.register(
    r"proration-summary-amounts",
    views.ProrationSummaryAmountViewSet,
    basename="proration-summary-amount",
)

urlpatterns = [
    path("", include(router.urls)),
]
