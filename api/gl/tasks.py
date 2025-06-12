import requests
from decouple import config
from requests_ntlm import HttpNtlmAuth
from .models import Account, NetChange


def fetch_accounts():
    url = config("GL_ACCOUNT")
    user = config("NAV_USER")
    password = config("NAV_PASSWORD")
    auth = HttpNtlmAuth(user, password)
    try:
        response = requests.get(url, auth=auth)
        if response.ok:
            data = response.json()
            for acc in data["value"]:
                # print(acc)
                account, updated = Account.objects.update_or_create(
                    name=acc["Name"],
                    defaults={
                        "no": acc["No"],
                    },
                )
                print(account.name, account.no)
    except Exception as e:
        print(e)


def fetch_net_changes(start_date, end_date):
    url = config("GL_ENTRY")
    user = config("NAV_USER")
    password = config("NAV_PASSWORD")
    auth = HttpNtlmAuth(user, password)
    try:
        # acc_url = f"{url}&$filter=Posting_Date ge {start_date} and Posting_Date le {end_date} and startswith(G_L_Account_No,'5')&$top=100"
        for acc in Account.objects.all():
            acc_url = f"{url}&$filter=G_L_Account_No eq '{acc.no}' and Posting_Date ge {start_date.strftime('%Y-%m-%d')} and Posting_Date le {end_date.strftime('%Y-%m-%d')} "
            response = requests.get(acc_url, auth=auth)
            print(f"Query Response for {acc.name}: {response.status_code}")
            if response.ok:
                data = response.json()
                amount = 0
                for a in data["value"]:
                    amount = amount + float(a["Amount"])
                net_change, updated = NetChange.objects.update_or_create(
                    account=acc,
                    amount=amount,
                    start_date=start_date,
                    end_date=end_date,
                    defaults={
                        "account": acc,
                        "start_date": start_date,
                        "end_date": end_date,
                    },
                )
                # print(net_change.account.name, net_change.amount)
            # else:
            #     print(response.text)
    except Exception as e:
        print(e)
