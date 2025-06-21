from django.db import models
from main.models import BaseCreatedUpdated
from production.models import Location, Order, Output
from django.db.models.functions import Lower

YESNO = ((True, "Yes"), (False, "No"))


class ProrationType(BaseCreatedUpdated):
    name = models.CharField(max_length=50, unique=True)
    location = models.ForeignKey(
        Location, on_delete=models.RESTRICT, null=True, blank=True
    )
    active = models.BooleanField(choices=YESNO, default=True)

    class Meta:
        ordering = ["-name"]
        constraints = [
            models.UniqueConstraint(Lower("name"), name="unique_case_insensitive_name")
        ]

    def __str__(self):
        return self.name


class Proration(BaseCreatedUpdated):
    reference = models.CharField(max_length=50, unique=True)
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.reference


class OutputSummary(BaseCreatedUpdated):
    proration = models.ForeignKey(Proration, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.RESTRICT)
    location = models.ForeignKey(Location, on_delete=models.RESTRICT)
    quantity = models.DecimalField(decimal_places=2, max_digits=30)
    labels_per_hour = models.DecimalField(decimal_places=2, max_digits=30)

    @property
    def totalHours(self):
        return (
            self.quantity / self.labels_per_hour
            if self.quantity and self.labels_per_hour
            else 0
        )

    class Meta:
        ordering = ["-order__no"]

    def __str__(self):
        if self.proration and self.order and self.location:
            return f"{self.proration.reference} {self.order.no} {self.location.code}"


class ProrationTypeSummary(BaseCreatedUpdated):
    proration = models.ForeignKey(Proration, on_delete=models.CASCADE)
    proration_type = models.ForeignKey(ProrationType, on_delete=models.RESTRICT)
    location = models.ForeignKey(
        Location, on_delete=models.RESTRICT, null=True, blank=True
    )
    amount = models.DecimalField(decimal_places=10, max_digits=30)

    class Meta:
        ordering = ["-created_at"]

    # def __str__(self):
    #     return self.proration_type.name


class ProrationSummary(BaseCreatedUpdated):
    proration = models.ForeignKey(Proration, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.RESTRICT)

    class Meta:
        ordering = ["-created_at"]

    # def __str__(self):
    #     return self.order.no


class ProrationSummaryAmount(BaseCreatedUpdated):
    proration_summary = models.ForeignKey(ProrationSummary, on_delete=models.CASCADE)
    proration_type = models.ForeignKey(ProrationType, on_delete=models.RESTRICT)
    amount = models.DecimalField(decimal_places=2, max_digits=30)

    class Meta:
        ordering = ["-created_at"]

    # def __str__(self):
    #     return self.reference
