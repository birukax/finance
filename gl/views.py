import datetime
from django.shortcuts import render, redirect, get_object_or_404
from .models import ProrationType, Account, NetChange
from .tasks import fetch_accounts, fetch_net_changes
from .forms import EditAccount, EditProrationType, CreateProrationType
from main.tasks import edit_model, create_model


def account_list(request):
    accounts = Account.objects.all()

    context = {
        "accounts": accounts,
    }
    return render(request, "account/list.html", context)


def edit_account(request, id):
    account = get_object_or_404(Account, id=id)
    edit_model(
        request,
        account,
        EditAccount,
        "gl:account_list",
        "account/edit.html",
    )


def proration_type_list(request):
    proration_types = ProrationType.objects.all()

    context = {
        "proration_types": proration_types,
    }
    return render(request, "proration_type/list.html", context)


def create_proration_type(request):
    create_model(
        request,
        CreateProrationType,
        "gl:proration_type_list",
        "proration_type/create.html",
    )


def edit_proration_type(request):
    proration_type = get_object_or_404(ProrationType, id=id)
    edit_model(
        request,
        proration_type,
        EditProrationType,
        "gl:proration_type_list",
        "proration_type/edit.html",
    )
