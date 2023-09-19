from django.shortcuts import render
from .serializer import TodoSerializer
from .models import TodoModel
from rest_framework.viewsets import ModelViewSet

# Create your views here.


class TodoViewSet(ModelViewSet):
    queryset = TodoModel.objects.all().order_by('-id')
    serializer_class = TodoSerializer
