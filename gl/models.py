from django.db import models

YESNO = ((True, "Yes"), (False, "No"))


class ProrationType(models.Model):
    name = models.CharField(max_length=50)
    active = models.BooleanField(choices=YESNO, default=True)


class Account(models.Model):
    no = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    proration_type = models.ForeignKey(
        "gl.ProrationType", on_delete=models.CASCADE, null=True, blank=True
    )
    active = models.BooleanField(choices=YESNO, default=False)


class NetChange(models.Model):
    account = models.ForeignKey("gl.Account", on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=5, max_digits=20)
    start_date = models.DateField()
    end_date = models.DateField()
