from django import forms
from .models import ProrationType, Account


class CreateProrationType(forms.ModelForm):
    class Meta:
        model = ProrationType
        fields = ("name",)


class EditProrationType(forms.ModelForm):
    class Meta:
        model = ProrationType
        fields = ("active",)


class EditAccount(forms.ModelForm):
    class Meta:
        model = Account
        fields = ("proration_type", "active")
