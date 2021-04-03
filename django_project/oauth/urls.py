from .views import slack_auth, get_logged_in
from django.urls import path, include

urlpatterns = [
    path("slack_auth/", slack_auth),
    path("get_logged_in/", get_logged_in),
]