from django.db import models

# Create your models here.
class CourseDetails(models.Model):
    courseId = models.CharField(max_length=5, primary_key=True)  # unique id for each user  
    courseName = models.CharField(max_length=20)
    path = models.CharField(max_length=500)