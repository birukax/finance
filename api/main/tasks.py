from django.shortcuts import redirect, render
from decouple import config
from requests_ntlm import HttpNtlmAuth


def autenticate_api():
    user = config("NAV_USER")
    password = config("NAV_PASSWORD")
    auth = HttpNtlmAuth(user, password)
    return auth


def create_model(
    request,
    form,
    success_url,
    form_template,
    context={},
):
    if request.method == "POST":
        form = form(request.POST)
        if form.is_valid():
            form.save()
            return redirect(success_url)
    else:
        form = form()
    context["form"] = form
    return render(request, form_template, context)


def edit_model(
    request,
    instance,
    form,
    success_url,
    form_template,
    context={},
):
    if request.method == "POST":
        form = form(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return redirect(success_url)
    else:
        form = form(instance=instance)
    context["form"] = form
    return render(request, form_template, context)
