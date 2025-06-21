from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ProrationType
from production.models import Location
from gl.serializers import ProrationTypeSerializer


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
