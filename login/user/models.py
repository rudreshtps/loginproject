from django.db import models

# Create your models here.
class UserDetails(models.Model):
    StudentId = models.CharField(max_length=15, primary_key=True)  # unique id for each user  
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    college_Id = models.CharField(max_length=20)
    email = models.EmailField(  unique=True)
    whatsApp_No=models.IntegerField()
    mob_No=models.IntegerField()
    sem=models.CharField(max_length=3)
    branch=models.CharField(max_length=10) 
    status=models.CharField(max_length=3)
    user_category=models.CharField(max_length=3)
    reg_date=models.DateField(auto_now_add=True)
    exp_date=models.DateField()
    score = models.IntegerField()
    progress_Id=models.JSONField(default=dict)#=====================

