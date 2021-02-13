from django.http import HttpResponse
from django.shortcuts import redirect
import requests
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import os
import environ
from django.contrib.sessions.models import Session
from django_project.settings import SLACK_SECRET_KEY


def slack_auth(request):
    print(request)
    print(request.GET)
    API_ENDPOINT = "https://slack.com/api/oauth.v2.access"
    # your API key here 
    code = request.GET['code']
    print(code)
    # data to be sent to api 
    print(SLACK_SECRET_KEY)
    data = {
        'client_id':'4526132454.1654017102375',
        'client_secret':SLACK_SECRET_KEY,
        'code':code, 
        'redirect_uri':'http://localhost:8000/django/oauth/slack_auth' 
        } 
    # sending post request and saving response as response object 
    r = requests.post(url = API_ENDPOINT, data = data) 
    print(r.request.body)
    print(r.request)
    print(r.request.headers)
    print(r.text)
    jsoned = json.loads(r.text)
    print("----------")
    print(jsoned["ok"])
    loggedIn = jsoned["ok"]
    userId = jsoned["authed_user"]["id"]
    name = jsoned["authed_user"]["name"]
    print('userId', userId)
    print(type(loggedIn))
    if loggedIn:
        user = authenticate(username=userId,password='')
        print('Request', request)
        print('user', user)
        instance = User.objects.all()
        print('instance', instance)
        sessions = Session.objects.all()
        # sessions.delete()
        # instance.delete()
        if user is not None:
            # The user already exists in the database
            # return HttpResponse("Success with an existing user")
            login(request, user)
            return redirect('/')
        else:
            # A new user needs to be made
            new_user = User.objects.create_user(username=userId, password='')
            new_user.is_active = True
            new_user.save()
            new_user = authenticate(username=userId, password='')
            login(request, new_user)
            # return HttpResponse("Success after making a new user")
            return redirect('/')
    if not loggedIn:
        return HttpResponse("Failure! ok=false")

def get_logged_in(request):
    print("request.user authenticate", request.user.is_authenticated)
    print('request.user', request.user)
    sessions = Session.objects.all()
    print('sessions', sessions )
    instance = User.objects.all()
    print('instance', instance)
    if request.user.is_authenticated:
        return HttpResponse(True)
    else:
        return HttpResponse(False)