from rest_framework import serializers
from .models import (
    ProrationType,
    Proration,
    OutputSummary,
    ProrationTypeSummary,
    ProrationSummary,
    ProrationSummaryAmount,
)
from production.serializers import LocationSerializer, OrderSerializer


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


class ProrationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Proration
        fields = [
            "id",
            "reference",
            "start_date",
            "end_date",
        ]


class OutputSummarySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = OutputSummary
        fields = [
            "id",
            "proration",
            "order",
            "location",
            "quantity",
            "labels_per_hour",
            "total_hours",
        ]


class ProrationTypeSummarySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = ProrationTypeSummary
        fields = [
            "id",
            "proration_type",
            "location",
            "amount",
        ]


class ProrationSummaryAmountSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = ProrationSummaryAmount
        fields = [
            "id",
            "proration_summary",
            "proration_type",
            "amount",
        ]


class ProrationSummarySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    proration_summary_amounts = ProrationSummaryAmountSerializer(
        read_only=True, many=True
    )

    class Meta:
        model = ProrationSummary
        fields = [
            "id",
            "proration",
            "order",
            "proration_summary_amounts",
        ]
