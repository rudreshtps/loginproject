from django.db import models

# Create your models here.
class QuestionDetails(models.Model):
    questionId = models.CharField(max_length=5)
    studentId = models.CharField(max_length=15)
    conceptId = models.CharField(max_length=20)
    currect_ans = models.TextField(null=False)
    score = models.IntegerField()
    entered_ans = models.TextField(null=True)
    skipped_ans = models.TextField(null=True)
    dateAndTime= models.DateTimeField(auto_now_add=True)
    session= models.IntegerField()