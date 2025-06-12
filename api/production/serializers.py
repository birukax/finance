from rest_framework import serializers
from .models import Item, Location, Order, Routing, Output, LabelPerHour


class ItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Item
        fields = [
            "id",
            "no",
            "name",
            "unit_of_measure",
        ]


class LocationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Location
        fields = [
            "id",
            "code",
            "name",
            "active",
        ]


class OrderSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    item = ItemSerializer(read_only=True)
    item_id = serializers.IntegerField(write_only=True)
    location = LocationSerializer(read_only=True)
    location_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "no",
            "item",
            "item_id",
            "location",
            "location_id",
        ]


class RoutingSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    order = OrderSerializer(read_only=True)
    order_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Routing
        fields = [
            "id",
            "order",
            "order_id",
            "operation_no",
            "machine_center_no",
            "machine_center_name",
            "work_center_code",
            "work_center_group_code",
        ]


class OutputSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    order = OrderSerializer(read_only=True)
    order_id = serializers.IntegerField(write_only=True)
    location = LocationSerializer(read_only=True)
    location_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Output
        fields = [
            "id",
            "order",
            "order_id",
            "location",
            "location_id",
            "entry_no",
            "uom",
            "quantity",
        ]


class LabelPerHourSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    item = ItemSerializer(read_only=True)
    item_id = serializers.IntegerField(write_only=True)
    location = LocationSerializer(read_only=True)
    location_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = LabelPerHour
        fields = [
            "id",
            "item",
            "item_id",
            "location",
            "location_id",
            "quantity",
        ]
