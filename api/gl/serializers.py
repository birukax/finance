from rest_framework import serializers
from .models import Account, NetChange
from proration.serializers import ProrationTypeSerializer


class AccountSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    proration_type = ProrationTypeSerializer(read_only=True)
    proration_type_id = serializers.IntegerField(
        write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Account
        fields = [
            "id",
            "no",
            "name",
            "active",
            "proration_type",
            "proration_type_id",
        ]


class NetChangeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    account = AccountSerializer(read_only=True)
    account_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = NetChange
        fields = [
            "id",
            "amount",
            "start_date",
            "end_date",
            "account",
            "account_id",
        ]
