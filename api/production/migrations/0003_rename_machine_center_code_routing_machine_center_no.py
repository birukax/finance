# Generated by Django 5.1.7 on 2025-03-21 08:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("production", "0002_order_location"),
    ]

    operations = [
        migrations.RenameField(
            model_name="routing",
            old_name="machine_center_code",
            new_name="machine_center_no",
        ),
    ]
