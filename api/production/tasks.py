import requests
from decouple import config
from requests_ntlm import HttpNtlmAuth
from main.tasks import autenticate_api
from .models import Item, Location, Order, Routing, Output, LabelPerHour


def fetch_items():
    url = config("ITEMS")

    try:
        response = requests.get(url, auth=autenticate_api())
        if response.ok:
            print("Fetch Item OK")
            data = response.json()
            for item in data["value"]:
                if item["No"] == "" or item["No"] == None:
                    continue
                item, updated = Item.objects.update_or_create(
                    no=item["No"],
                    defaults={
                        "name": item["Description"],
                        "unit_of_measure": item["Base_Unit_of_Measure"],
                    },
                )
                locations = Location.objects.filter(active=True)
                if locations.exists():
                    for l in locations:
                        label_per_hour, created = LabelPerHour.objects.get_or_create(
                            item=item,
                            location=l,
                        )
                # print(item.name, item.no)
        else:
            print(response.text)
    except Exception as e:
        print(e)


def fetch_locations():
    url = config("LOCATIONS")
    try:
        response = requests.get(url, auth=autenticate_api())
        if response.ok:
            print("Fetch Location OK")
            data = response.json()
            for location in data["value"]:
                location, updated = Location.objects.update_or_create(
                    code=location["Code"],
                    defaults={
                        "name": location["Name"],
                    },
                )
                # print(location.name, location.code)
        else:
            print(response.text)
    except Exception as e:
        print(e)


def fetch_orders():
    url = config("ORDERS")
    try:
        response = requests.get(url, auth=autenticate_api())
        if response.ok:
            print("Fetch Order OK")
            data = response.json()
            for order in data["value"]:
                item = Item.objects.filter(no=order["Source_No"])
                location = Location.objects.filter(code=order["Location_Code"])
                if item.exists() and location.exists():

                    order, updated = Order.objects.update_or_create(
                        no=order["No"],
                        defaults={
                            "item": item.first(),
                            "location": location.first(),
                        },
                    )
                    if not updated:
                        print(f"{order['No']} - {updated}")
                else:
                    print(order["Source_No"], order["No"])
        else:
            print(response.text)
    except Exception as e:
        print(e)


def fetch_routings():
    url = config("ROUTINGS")
    try:
        response = requests.get(url, auth=autenticate_api())
        if response.ok:
            print("Fetch Routing OK")
            data = response.json()
            for routing in data["value"]:
                order = Order.objects.filter(no=routing["Prod_Order_No"])
                if order.exists():
                    order = order.first()
                    routing, updated = Routing.objects.update_or_create(
                        order=order,
                        defaults={
                            "operation_no": routing["Operation_No"],
                            "machine_center_no": routing["No"],
                            "machine_center_name": routing["Description"],
                            "work_center_code": routing["Work_Center_No"],
                            "work_center_group_code": routing["Work_Center_Group_Code"],
                        },
                    )
                else:
                    print(routing["Prod_Order_No"])
        else:
            print(response.text)
    except Exception as e:
        print(e)


def fetch_outputs():
    url = config("OUTPUTS")
    try:
        response = requests.get(url, auth=autenticate_api())
        if response.ok:
            print("Fetch Output OK")
            data = response.json()
            for output in data["value"]:
                order = Order.objects.filter(no=output["Order_No"])
                location = Location.objects.filter(code=output["Location_Code"])
                if order.exists() and location.exists():
                    order = order.first()
                    location = location.first()
                    output, updated = Output.objects.update_or_create(
                        entry_no=output["Entry_No"],
                        defaults={
                            "order": order,
                            "location": location,
                            "posting_date": output["Posting_Date"],
                            "uom": output["Unit_of_Measure_Code"],
                            "quantity": output["Quantity"],
                        },
                    )
                else:
                    print(output["Order_No"], output["Location_Code"])
        else:
            print(response.text)
    except Exception as e:
        print(e)
