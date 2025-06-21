from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    ProrationType,
    Proration,
    OutputSummary,
    ProrationSummary,
    ProrationSummaryAmount,
    ProrationTypeSummary,
)
from production.models import Location, Order
from .serializers import (
    ProrationTypeSerializer,
    ProrationSerializer,
    OutputSummarySerializer,
    ProrationTypeSummarySerializer,
    ProrationSummaryAmountSerializer,
    ProrationSummarySerializer,
)


class ProrationTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ProrationTypeSerializer
    queryset = ProrationType.objects.all()

    search_fields = ["name"]
    filterset_fields = ["active"]

    def perform_create(self, serializer):
        if serializer.validated_data.get("location_id"):
            try:
                location_id = serializer.validated_data.pop("location_id")
                if location_id:
                    location = Location.objects.get(id=location_id)
            except Location.DoesNotExist:
                raise serializers.ValidationError(
                    {"location_id": "Location does not exist."}
                )
            except Exception as e:
                raise serializers.ValidationError({"error": str(e)})
            serializer.is_valid(raise_exception=True)
            serializer.save(location=location)
        else:
            serializer.is_valid(raise_exception=True)
            serializer.save()

    def perform_update(self, serializer):
        if serializer.validated_data.get("location_id"):
            try:
                location_id = serializer.validated_data.pop("location_id")
                if location_id:
                    location = Location.objects.get(id=location_id)
            except Location.DoesNotExist:
                raise serializers.ValidationError(
                    {"location_id": "Location does not exist."}
                )
            except Exception as e:
                raise serializers.ValidationError({"error": str(e)})
            serializer.is_valid(raise_exception=True)
            serializer.save(location=location)
        else:
            serializer.is_valid(raise_exception=True)
            serializer.save()


class ProrationViewSet(viewsets.ModelViewSet):
    serializer_class = ProrationSerializer
    queryset = Proration.objects.all()

    search_fields = ["reference"]
    filterset_fields = ["start_date", "end_date"]


class OutputSummaryViewSet(viewsets.ModelViewSet):
    serializer_class = OutputSummarySerializer
    queryset = OutputSummary.objects.all()

    search_fields = []
    filterset_fields = ["quantity", "labels_per_hour", "total_hours"]


class ProrationTypeSummaryViewSet(viewsets.ModelViewSet):
    serializer_class = ProrationTypeSummarySerializer
    queryset = ProrationTypeSummary.objects.all()

    search_fields = []
    filterset_fields = ["amount"]


class ProrationSummaryViewSet(viewsets.ModelViewSet):
    serializer_class = ProrationSummarySerializer
    queryset = ProrationSummary.objects.all()

    search_fields = []
    filterset_fields = ["amount"]


class ProrationSummaryAmountViewSet(viewsets.ModelViewSet):
    serializer_class = ProrationSummaryAmountSerializer
    queryset = ProrationSummaryAmount.objects.all()

    search_fields = []
    filterset_fields = ["amount"]
