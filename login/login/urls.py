"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from user import views as user
from course import views as course
from exercise import views as exe
urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('user/<str:email>', user.fetch,name= 'get'),
    path('course/', course.getcourse,name= 'getcourse'),
    path('course/<str:course>/<str:id>', course.getindex,name= 'getindex'),
    path('theory/<str:course>/<str:pid>/<str:id>', course.getheory,name= 'getindex'),
    path('exercise/add', exe.addquestion,name= 'addque'),
    path('exercise/<str:pid>/<str:id>', exe.getexse,name= 'exe'),
    path('exercise/finish/<str:course>/<str:pid>/<str:id>', exe.endexercise,name= 'exe'),
    path('certificate', course.certificate,name= 'certificate'),
]
