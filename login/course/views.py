import datetime
from datetime import datetime
import json
from django.shortcuts import HttpResponse
from django.db.models import Sum

from django.views.decorators.csrf import csrf_exempt

from .service import download_blob, download_list_blob
from user.models import UserDetails

from .models import CourseDetails

#COURSE PAGE=====================================================================

def getcourse(request):
    try:
        courses = CourseDetails.objects.all()
        courseData = []
        for c in courses:
            courseData.append({'courseId':c.courseId,'courseName':c.courseName,'path':c.path})
        return HttpResponse(json.dumps(courseData))
    except Exception as e:
        print("Exception Occured while getting all the courses")
        print(str(e))
        return HttpResponse('Server Error! Please Try Again Later',status=500)
    

#INDEX PAGE=====================================================================

def getindex(request,course,id):
    try:
        user = UserDetails.objects.get(StudentId=id)
        map=user.progress_Id
        if map:
            pid="-1"
            for cp in map:
                if cp==course:
                    pid=map[course]
            if pid=="-1":
                pid="New User"
            map[course]=pid
            user.progress_Id=map
            user.save() 
        else:
            pid="New User"
            map[course]=pid
            user.progress_Id=map
            user.save()
        Data={"progress_id" : pid} 
        json_content = download_blob("Syllabus/"+course+"/Reasoning_01.json")
        json_content_str = json_content.decode('utf-8')
        json_data = json.loads(json_content_str)
        json_data.update(Data)
        updated_json_content = json.dumps(json_data)
        
        return HttpResponse(updated_json_content)
        
    except Exception:
        return HttpResponse('Something went wrong with"Index" API',status=503)

#THEORY PAGE=====================================================================
    
def getheory(request,course,pid,id):
    try:
        user=UserDetails.objects.get(StudentId=id)
        if user.progress_Id[course]!="Certified User":    
            user.progress_Id[course]=pid
            user.save()
        json_content = download_blob("Concept/"+pid+"/eConcept1.json")
        json_content_str = json_content.decode('utf-8')
        return HttpResponse(json_content_str)
    except Exception as e:
            return HttpResponse(f"An error occurred: {e}", status=500)

#CERTIFICATE PAGE=====================================================================

@csrf_exempt      
def certificate(request):
    if request.method == 'POST':
        try:
            # Get the data from the request body
            data = json.loads(request.body)
            std=UserDetails.objects.get(StudentId=data["studentId"]);
            std.progress_Id[data["course"]]="Certified User"
            std.save()
            return HttpResponse("Certification added")    
        except Exception as e:
            return HttpResponse(f"An error occurred: {e}") 
       