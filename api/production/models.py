from django.db import models
from main.models import BaseCreatedUpdated


class Item(BaseCreatedUpdated):
    no = models.CharField(max_length=30)
    name = models.CharField(max_length=50)


class Location(BaseCreatedUpdated):
    code = models.CharField(max_length=30)
    name = models.CharField(max_length=50)


class Order(BaseCreatedUpdated):
    no = models.CharField(max_length=30)
    item = models.ForeignKey("production.Item", on_delete=models.RESTRICT)
    location = models.ForeignKey("production.Location", on_delete=models.RESTRICT)


class Routing(BaseCreatedUpdated):
    order = models.ForeignKey("production.Order", on_delete=models.RESTRICT)
    operation_no = models.IntegerField(default=0)
    machine_center_no = models.CharField(max_length=75)
    machine_center_name = models.CharField(max_length=75)
    work_center_code = models.CharField(max_length=75)
    work_center_group_code = models.CharField(max_length=75)


class Output(BaseCreatedUpdated):
    entry_no = models.CharField(max_length=30)
    order = models.ForeignKey("production.Order", on_delete=models.RESTRICT)
    location = models.ForeignKey("production.Location", on_delete=models.RESTRICT)
    uom = models.CharField(max_length=20)
    quantity = models.IntegerField(default=0)


class LabelPerHour(BaseCreatedUpdated):
    item = models.ForeignKey("production.Item", on_delete=models.RESTRICT)
    location = models.ForeignKey("production.Location", on_delete=models.RESTRICT)
    quantity = models.IntegerField(default=0)
