import json
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from datetime import datetime
from django.db.models import Sum

from course.service import download_list_blob

from .models import QuestionDetails
from user.models import UserDetails

#EXERCISE PAGE=====================================================================

@csrf_exempt  # Use this decorator if you want to allow POST requests without CSRF token
@require_POST
def addquestion(request):
    if request.method == 'POST':
        try:
            data = request.body
            question = json.loads(data)
            user = QuestionDetails.objects.filter(conceptId=question["conceptId"], studentId=question["studentId"],questionId=question["questionId"]).order_by('-dateAndTime').first()
            print("n")
            q = QuestionDetails(
                studentId=str(question["studentId"]),
                questionId=str(question["questionId"]),
                conceptId=str(question["conceptId"]),
                currect_ans=str(question["correct_answer"]),
                entered_ans=str(question["entered_answer"]),
                skipped_ans=" ",
                dateAndTime=(datetime.now()),
                session=1,
                score=int(question["score"])
                )
            if user:
                 print(user.session)
                 q.session=user.session+1
                 q.save()
                 return HttpResponse("done")
            q.save()
            print("yessss")
            if q.session==1:
                    std=UserDetails.objects.get(StudentId=question["studentId"])
                    std.score=std.score+(question['score'])
                    std.save()
                   
            return HttpResponse("done")
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON data", status=400)
        except KeyError as e:
            return HttpResponse(f"Missing key: {e}", status=400)
        except Exception as e:
            return HttpResponse(f"An error occurred: {e}", status=500)
    else:
        return HttpResponse("Method Not Allowed", status=405)
    
def getexse(req,pid,id):
    try:
        user = QuestionDetails.objects.filter(conceptId=pid, studentId=id).order_by('-dateAndTime').first()
        if user:
            total_score = QuestionDetails.objects.filter(conceptId=pid,studentId=id,session=user.session).aggregate(total_score=Sum('score'))
            score=total_score["total_score"]
        else:
            score=0
            user = QuestionDetails(studentId=id, conceptId="New User",questionId="0", dateAndTime=datetime.now())
        Data={
             "progress_id" : str(user.conceptId),
             "questionId"  :user.questionId,
             "score":score
             } 
        main=[]
        main.append(Data)
        json_content = download_list_blob("Question/"+pid)
        main.append(json_content)
        updated_json_content = json.dumps(main)
        return HttpResponse(updated_json_content)
    except Exception as e:
            return HttpResponse(f"An error occurred: {e}", status=500) 

@csrf_exempt
@require_POST  
def endexercise(req,course,pid,id):
    if req.method == 'POST':
        try:
            user=UserDetails.objects.get(StudentId=id)
            if user.progress_Id[course]=="Certified User":
                return HttpResponse("Done")
            user.progress_Id[course]=pid
            user.save()
            return HttpResponse("Done")
        except UserDetails.DoesNotExist:
            return HttpResponse("No such Student Id Found",status=404)
        except Exception as e:
            return HttpResponse(f"An error occurred: {e}", status=500)  
    else:
        return HttpResponse("Method Not Allowed", status=405)