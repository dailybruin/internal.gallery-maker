from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
def test(request):
    print(request)
    print(request.GET)
    return HttpResponse("Done!")

@csrf_exempt
def image(request):
    print(request.POST)
    print(request.POST['img'])
    return HttpResponse("Received")
    
