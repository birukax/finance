import datetime
from django.shortcuts import render, redirect
from .models import ProrationType, Account, NetChange
from .tasks import get_accounts, get_net_changes


def test(reqeust):
    net_changes = NetChange.objects.all()
    context = {
        "net_changes": net_changes,
    }
    return render(reqeust, "test.html", context)


def test2(request):
    start_date = datetime.date(2024, 7, 8)
    end_date = datetime.date(2025, 3, 9)
    get_net_changes(start_date, end_date)

    return redirect("gl:test")
