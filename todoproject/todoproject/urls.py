
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todoapp.views import TodoViewSet
from rest_framework import routers

route = routers.DefaultRouter()
route.register('', TodoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls))
]
