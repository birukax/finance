from django.contrib import admin
from .models import Account, ProrationType, NetChange

admin.site.register(Account)
admin.site.register(ProrationType)
admin.site.register(NetChange)
