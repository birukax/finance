from django.db import models
from main.models import BaseCreatedUpdated


class Item(BaseCreatedUpdated):
    no = models.CharField(max_length=30)
    name = models.CharField(max_length=50)
    unit_of_measure = models.CharField(max_length=30, null=True, blank=True)

    class Meta:
        ordering = ["-no"]

    def __str__(self):
        if self.name:
            return f"{self.no} - {self.name}"
        if self.no:
            return f"{self.no}"


class Location(BaseCreatedUpdated):
    code = models.CharField(max_length=30)
    name = models.CharField(max_length=50)
    active = models.BooleanField(default=False)

    class Meta:
        ordering = ["code"]

    def __str__(self):
        return f"{self.code}"


class Order(BaseCreatedUpdated):
    no = models.CharField(max_length=30)
    item = models.ForeignKey("production.Item", on_delete=models.RESTRICT)
    location = models.ForeignKey("production.Location", on_delete=models.RESTRICT)

    class Meta:
        ordering = ["-no"]

    def __str__(self):
        if self.item:
            return f"{self.no} - {self.item.name}"
        return f"{self.no}"


class Routing(BaseCreatedUpdated):
    order = models.ForeignKey("production.Order", on_delete=models.RESTRICT)
    operation_no = models.IntegerField(default=0)
    machine_center_no = models.CharField(max_length=75)
    machine_center_name = models.CharField(max_length=75)
    work_center_code = models.CharField(max_length=75)
    work_center_group_code = models.CharField(max_length=75)

    class Meta:
        ordering = ["-order__no", "operation_no"]

    def __str__(self):
        return f"{self.operation_no}"


class Output(BaseCreatedUpdated):
    entry_no = models.CharField(max_length=30)
    order = models.ForeignKey("production.Order", on_delete=models.RESTRICT)
    posting_date = models.DateField(null=True, blank=True)
    location = models.ForeignKey("production.Location", on_delete=models.RESTRICT)
    uom = models.CharField(max_length=20)
    quantity = models.IntegerField(default=0)

    class Meta:
        ordering = ["-entry_no"]

    def __str__(self):
        return f"{self.order.no} - {self.quantity}"


class LabelPerHour(BaseCreatedUpdated):
    item = models.ForeignKey("production.Item", on_delete=models.RESTRICT)
    location = models.ForeignKey("production.Location", on_delete=models.RESTRICT)
    quantity = models.IntegerField(default=0)

    class Meta:
        ordering = ["-item__no", "location__code"]

    def __str__(self):
        if self.item and self.location:
            return f"{self.item.name} - {self.location.code}"
