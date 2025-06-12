from django.db import models
from django.db.models.functions import Lower
from main.models import BaseCreatedUpdated
from production.models import Location

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


class Account(BaseCreatedUpdated):
    no = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    proration_type = models.ForeignKey(
        "gl.ProrationType", on_delete=models.CASCADE, null=True, blank=True
    )
    active = models.BooleanField(choices=YESNO, default=True)

    class Meta:
        ordering = ["no"]

    def __str__(self):
        if self.no and self.name:
            return f"{self.no} - {self.name}"
        if self.no:
            return self.no
        if self.name:
            return self.name
        return self


class NetChange(BaseCreatedUpdated):
    account = models.ForeignKey("gl.Account", on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=5, max_digits=20)
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        ordering = ["-updated_at", "-created_at"]

    def __str__(self):
        return f"{self.account.no} - {self.amount}"
