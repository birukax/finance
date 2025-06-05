import datetime
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Item, Location, Order, Routing, Output, LabelPerHour
from .serializers import (
    ItemSerializer,
    LocationSerializer,
    OrderSerializer,
    RoutingSerializer,
    OutputSerializer,
    LabelPerHourSerializer,
)

from .tasks import (
    fetch_items,
    fetch_locations,
    fetch_orders,
    fetch_routings,
    fetch_outputs,
)


class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    search_fields = ["no", "name"]
    filterset_fields = []

    @action(detail=False, methods=["POST"])
    def update_items(self, request):
        try:
            fetch_items()
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer = self.get_serializer(self.queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

    search_fields = ["code", "name"]
    filterset_fields = []

    @action(detail=False, methods=["POST"])
    def update_locations(self, request):
        try:
            fetch_locations()
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer = self.get_serializer(self.queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    search_fields = ["no", "item__no", "item__name", "location__code", "location__name"]
    filterset_fields = []

    def perform_create(self, serializer):
        item_id = serializer.validated_data.pop("item_id")
        location_id = serializer.validated_data.pop("location_id")

        try:
            item = Item.objects.get(id=item_id)
            location = Location.objects.get(id=location_id)
        except Item.DoesNotExist:
            raise serializers.ValidationError({"item_id": "Item does not exist."})
        except Location.DoesNotExist:
            raise serializers.ValidationError(
                {"location_id": "Location does not exist."}
            )
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer.is_valid(raise_exception=True)
        serializer.save(item=item, location=location)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["POST"])
    def update_orders(self, request):
        try:
            fetch_orders()
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer = self.get_serializer(self.queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RoutingViewSet(viewsets.ModelViewSet):
    serializer_class = RoutingSerializer
    queryset = Routing.objects.all()

    search_fields = [
        "machine_center_no",
        "machine_center_name",
        "work_center_code",
        "work_center_group_code",
    ]
    filterset_fields = []

    def perform_create(self, serializer):
        order_id = serializer.validated_data.pop("order_id")

        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            raise serializers.ValidationError({"order_id": "Order does not exist."})

        serializer.is_valid(raise_exception=True)
        serializer.save(order=order)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["POST"])
    def update_routings(self, request):
        try:
            fetch_routings()
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer = self.get_serializer(self.queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OutputViewSet(viewsets.ModelViewSet):
    serializer_class = OutputSerializer
    queryset = Output.objects.all()

    search_fields = [
        "entry_no",
        "uom",
        "order__item__no",
        "order__item__name",
        "location__code",
        "location__name",
    ]
    filterset_fields = []

    def perform_create(self, serializer):
        order_id = serializer.validated_data.pop("order_id")
        location_id = serializer.validated_data.pop("location_id")

        try:
            order = Order.objects.get(id=order_id)
            location = Location.objects.get(id=location_id)
        except Order.DoesNotExist:
            raise serializers.ValidationError({"order_id": "Order does not exist."})
        except Location.DoesNotExist:
            raise serializers.ValidationError(
                {"location_id": "Location does not exist."}
            )

        serializer.is_valid(raise_exception=True)
        serializer.save(order=order, location=location)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["POST"])
    def update_outputs(self, request):
        try:
            fetch_outputs()
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer = self.get_serializer(self.queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LabelPerHourViewSet(viewsets.ModelViewSet):
    serializer_class = LabelPerHourSerializer
    queryset = LabelPerHour.objects.all()

    search_fields = [
        "item_no",
        "item__name",
        "location__code",
        "location__name",
        "quantity",
    ]
    filterset_fields = []
