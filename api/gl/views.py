import datetime
from django.db.models import Sum
from rest_framework import serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Account, NetChange
from proration.models import ProrationType
from .tasks import fetch_accounts, fetch_net_changes
from .serializers import AccountSerializer, NetChangeSerializer


class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    # queryset = Account.objects.filter(active=True, proration_type=None)

    search_fields = ["no", "name", "proration_type__name"]
    filterset_fields = ["active"]

    def perform_create(self, serializer):
        if serializer.validated_data.get("proration_type_id"):
            try:
                proration_type_id = serializer.validated_data.pop("proration_type_id")
                proration_type = ProrationType.objects.get(id=proration_type_id)
            except ProrationType.DoesNotExist:
                raise serializers.ValidationError(
                    {"proration_type_id": "Proration type does not exist."}
                )
            except Exception as e:
                raise serializers.ValidationError({"error": str(e)})

            serializer.is_valid(raise_exception=True)
            serializer.save(proration_type=proration_type)
        else:
            serializer.is_valid(raise_exception=True)
            serializer.save()

    def perform_update(self, serializer):
        if serializer.validated_data.get("proration_type_id"):
            try:
                proration_type_id = serializer.validated_data.pop("proration_type_id")
                proration_type = ProrationType.objects.get(id=proration_type_id)
            except ProrationType.DoesNotExist:
                raise serializers.ValidationError(
                    {"proration_type_id": "Proration type does not exist."}
                )
            except Exception as e:
                raise serializers.ValidationError({"error": str(e)})

            serializer.is_valid(raise_exception=True)
            serializer.save(proration_type=proration_type)
        else:
            serializer.is_valid(raise_exception=True)
            serializer.save()

    @action(detail=False, methods=["POST"])
    def update_accounts(self, request):
        try:
            fetch_accounts()
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})
        serializer = self.serializer_class(self.queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


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

    @action(detail=False, methods="POST")
    def update_net_changes(self, request):
        try:
            fetch_net_changes()
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})

        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
