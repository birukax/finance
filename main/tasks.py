from decouple import config
from requests_ntlm import HttpNtlmAuth


def autenticate_api():
    user = config("NAV_USER")
    password = config("NAV_PASSWORD")
    auth = HttpNtlmAuth(user, password)
    return auth
