from django.contrib import admin
from .models import Item, Location, Order, Output, Routing, LabelPerHour

admin.site.register(Item)
admin.site.register(Location)
admin.site.register(Order)
admin.site.register(Output)
admin.site.register(Routing)
admin.site.register(LabelPerHour)
