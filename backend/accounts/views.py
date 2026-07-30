from django.shortcuts import render
from rest_framework import generics
from .models import User
# Create your views here.
from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer