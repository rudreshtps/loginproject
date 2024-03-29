import json
from django.shortcuts import HttpResponse

from .models import UserDetails

# Create your views here.
#LOG-IN PAGE=====================================================================
def fetch(request,email):
    try:
        if request.method == "GET": 
            user = UserDetails.objects.get(email=email)
            data = {
             "StudentId" : str(user.StudentId)
             }            
            return HttpResponse(json.dumps(data), content_type='text/plain')  
        else :
            return HttpResponse('Error! Invalid Request',status=400)
    except UserDetails.DoesNotExist:
        return HttpResponse('Error! User does not exist', status=404)
