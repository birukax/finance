from django.urls import path
from . import views

app_name = "gl"

urlpatterns = [
    path("account/list", views.account_list, name="account_list"),
    path("account/edit/<int:id>", views.edit_account, name="edit_account"),
    path("proration-type/list", views.proration_type_list, name="proration_type_list"),
    path(
        "proration-type/create",
        views.create_proration_type,
        name="create_proration_type",
    ),
    path(
        "proration-type/edit/<int:id>",
        views.edit_proration_type,
        name="edit_proration_type",
    ),
]
