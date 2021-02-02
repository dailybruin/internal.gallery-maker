from django.http import HttpResponse

def slack_auth(req):
    print(req)
    return HttpResponse("Received log in request")
