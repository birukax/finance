from django.contrib import admin
from .models import (
    ProrationType,
    Proration,
    OutputSummary,
    ProrationTypeSummary,
    ProrationSummary,
    ProrationSummaryAmount,
)

admin.site.register(ProrationType)
admin.site.register(Proration)
admin.site.register(OutputSummary)
admin.site.register(ProrationTypeSummary)
admin.site.register(ProrationSummary)
admin.site.register(ProrationSummaryAmount)
