from django.http import HttpResponse
from django.shortcuts import redirect
import requests
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import os
import environ

def slack_auth(request):
    print(request)
    print(request.GET)
    API_ENDPOINT = "https://slack.com/api/oauth.v2.access"
    # your API key here 
    code = request.GET['code']
    print(code)
    # data to be sent to api 
    data = {
        'client_id':'4526132454.1654017102375',
        'client_secret':'fcc9d7e0a722da963486b81b9018b092',
        'code':code, 
        'redirect_uri':'http://localhost:8000/django/oauth/slack_auth' 
        } 
    if os.environ.get('SLACK_SECRET_KEY'):
        SLACK_SECRET_KEY = os.environ.get('SLACK_SECRET_KEY')
    else:
        SLACK_SECRET_KEY = 'error'
    print(SLACK_SECRET_KEY)
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
    print('userId', userId)
    print(type(loggedIn))
    if loggedIn:
        user = authenticate(username=userId,password='')
        print('Request', request)
        print('user', user)
        instance = User.objects.all()
        print('instance', instance)
        # instance.delete()
        if user is not None:
            # The user already exists in the database
            return HttpResponse("Success with an existing user")
        else:
            # A new user needs to be made
            new_user = User.objects.create_user(username=userId, password='')
            new_user.is_active = True
            new_user.save()
            new_user = authenticate(username=userId,password='')
            return HttpResponse("Success after making a new user")
    if not loggedIn:
        return HttpResponse("Failure! ok=false")

def view(request):
    print(request.user)
    return "anything"
