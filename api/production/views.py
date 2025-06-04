from django.shortcuts import render
from django.shortcuts import render, redirect
from .models import Item
from .tasks import (
    fetch_items,
    fetch_locations,
    fetch_orders,
    fetch_routing,
    fetch_output,
)


def test_fetch(request):
    # fetch_items()
    # fetch_locations()
    # fetch_orders()
    # fetch_routing()
    fetch_output()
    return redirect("gl:test")
