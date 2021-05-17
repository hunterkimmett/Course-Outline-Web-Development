from django.shortcuts import render

from rest_framework import viewsets

from .serializers import EchoSerializer
from .models import Echo

class EchoViewSet(viewsets.ModelViewSet):
    queryset = Echo.objects.all()
    serializer_class = EchoSerializer