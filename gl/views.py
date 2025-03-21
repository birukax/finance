import datetime
from django.shortcuts import render, redirect
from .models import ProrationType, Account, NetChange
from production.models import Item, Location, Order, Routing, Output, LabelPerHour
from .tasks import fetch_accounts, fetch_net_changes


def test(reqeust):
    # net_changes = NetChange.objects.all()
    # items = Item.objects.all().order_by("no")
    # locations = Location.objects.all()
    # orders = Order.objects.all()
    # routings = Routing.objects.all()

    # context = {
    #     "net_changes": net_changes,
    #     "items": items,
    #     "locations": locations,
    #     "orders": orders,
    #     "routings": routings,
    # }
    return render(reqeust, "test.html")


def test2(request):
    start_date = datetime.date(2024, 7, 8)
    end_date = datetime.date(2025, 3, 9)
    fetch_net_changes(start_date, end_date)

    return redirect("gl:test")
