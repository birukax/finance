from rest_framework import serializers
from .models import ProrationType
from production.serializers import LocationSerializer


class ProrationTypeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    location = LocationSerializer(read_only=True)
    location_id = serializers.IntegerField(
        write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = ProrationType
        fields = [
            "id",
            "name",
            "location",
            "location_id",
            "active",
        ]
