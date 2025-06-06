import datetime
from django.db.models import Sum
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ProrationType, Account, NetChange
from .tasks import fetch_accounts, fetch_net_changes
from .serializers import ProrationTypeSerializer, AccountSerializer, NetChangeSerializer


class ProrationTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ProrationTypeSerializer
    queryset = ProrationType.objects.all()

    search_fields = ["name"]
    filterset_fields = ["active"]


class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    search_fields = ["no", "name", "proration_type__name"]
    filterset_fields = ["active"]

    def perform_create(self, serializer):
        proration_type_id = serializer.validated_data.pop("proration_type_id")

        try:
            proration_type = ProrationType.objects.get(id=proration_type_id)
        except ProrationType.DoesNotExist:
            raise serializers.ValidationError(
                {"proration_type_id": "Proration type does not exist."}
            )
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer.is_valid(raise_exception=True)
        serializer.save(proration_type=proration_type)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["POST"])
    def update_accounts(self, request):
        try:
            fetch_accounts()
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        # serializer = self.serializer_class(self.queryset)

        return Response(status=status.HTTP_200_OK)


class NetChangeViewSet(viewsets.ModelViewSet):
    serializer_class = NetChangeSerializer
    queryset = NetChange.objects.all()

    search_fields = ["amount", "account__no", "account__name"]
    filterset_fields = ["start_date", "end_date"]

    def perform_create(self, serializer):
        account_id = serializer.validated_data.pop("account_id")

        try:
            account = Account.objects.get(id=account_id)
        except Account.DoesNotExist:
            raise serializers.ValidationError({"account_id": "Account does not exist."})
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer.is_valid(raise_exception=True)
        serializer.save(account=account)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods="POST")
    def update_net_changes(self, request):
        try:
            fetch_net_changes()
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer = self.get_serializer(self.queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)
