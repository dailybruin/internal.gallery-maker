from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
import requests
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import os
import environ
from django.contrib.sessions.models import Session
from django_project.settings import SLACK_SECRET_KEY
import logging

logging.basicConfig(level=logging.DEBUG)

def slack_auth(request):
    # logging.debug(request)
    # logging.debug(request.GET)
    API_ENDPOINT = "https://slack.com/api/oauth.v2.access"
    # your API key here 
    code = request.GET['code']
    # logging.debug(code)
    # data to be sent to api 
    # logging.debug(SLACK_SECRET_KEY)
    data = {
        'client_id':'4526132454.1654017102375',
        'client_secret':SLACK_SECRET_KEY,
        'code':code, 
        'redirect_uri':'http://localhost:8000/django/oauth/slack_auth' 
        } 
    # sending post request and saving response as response object 
    try:
        r = requests.post(url = API_ENDPOINT, data = data) 
        
        # logging.debug("Request Body", r.request.body)
        # logging.debug("Request", r.request)
        # logging.debug("Request headers", r.request.headers)
        # logging.debug("Request text", r.text)
        jsoned = json.loads(r.text)
        # logging.debug(jsoned["ok"])
        loggedIn = jsoned["ok"]
        userId = jsoned["authed_user"]["id"]
        accessToken = jsoned["authed_user"]["access_token"]
        data = {
            "token" : accessToken
        }
        API_ENDPOINT = "https://slack.com/api/users.identity"
        r2 = "trying a request"
        r2 = requests.post(url = API_ENDPOINT, data = data) 


        finding_name = json.loads(r2.text)
        name = finding_name["user"]["name"]
        # print(name)
        # logging.debug('userId', userId)
        if loggedIn:
            userId = str(userId)
            user = authenticate(username=userId,password='', first_name=name)
            # logging.debug('Request', request)
            # logging.debug('user', user)
            # instance = User.objects.all()
            # logging.debug('instance', instance)
            # sessions = Session.objects.all()
            # sessions.delete()
            # instance.delete()
            if user is not None:
                # The user already exists in the database
                login(request, user)
                # print(user)
                return redirect('/')
            else:
                # A new user needs to be made
                new_user = User.objects.create_user(username=userId, password='', first_name=name)
                new_user.is_active = True
                new_user.save()
                new_user = authenticate(username=userId, password='',first_name=name)
                login(request, new_user)
                # return HttpResponse("Success after making a new user")
                return redirect('/')
        if not loggedIn:
            return JsonResponse({
                "error": "error communicating with Slack API"
            }, safe=False)
    except requests.exceptions.RequestException as e:
        return JsonResponse({
                "error": "error communicating with POST/GET requests"
            }, safe=False)

def get_logged_in(request):
    # logging.debug("request.user authenticate", request.user.is_authenticated)
    # logging.debug('request.user', request.user)
    # sessions = Session.objects.all()
    # logging.debug('sessions', sessions )
    # instance = User.objects.all()
    # instance.delete()
    # logging.debug('instance', instance)
    if request.user.is_authenticated:
        name = request.user.first_name
        return JsonResponse({
                "name" : name,
                "ok": "True"
            }, safe=True)
    else:
        return JsonResponse({
                "ok": "False"
            }, safe=False)