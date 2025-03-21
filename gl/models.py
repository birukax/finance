from django.db import models
from django.db.models.functions import Lower


YESNO = ((True, "Yes"), (False, "No"))


class ProrationType(models.Model):
    name = models.CharField(max_length=50, unique=True)
    active = models.BooleanField(choices=YESNO, default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-name"]
        constraints = [
            models.UniqueConstraint(Lower("name"), name="unique_case_insensitive_name")
        ]


class Account(models.Model):
    no = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    proration_type = models.ForeignKey(
        "gl.ProrationType", on_delete=models.CASCADE, null=True, blank=True
    )
    active = models.BooleanField(choices=YESNO, default=False)

    def __str__(self):
        return f"{self.no} - {self.name}"

    class Meta:
        ordering = ["no"]


class NetChange(models.Model):
    account = models.ForeignKey("gl.Account", on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=5, max_digits=20)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.account.no} - {self.amount}"

    class Meta:
        ordering = ["-updated_at", "-created_at"]
