from .views import slack_auth
from django.urls import path, include

urlpatterns = [
    path("slack_auth/", slack_auth),
]