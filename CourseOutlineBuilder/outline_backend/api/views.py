from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import *
from .models import *

class OutlineViewSet(viewsets.ModelViewSet):
    queryset = Outline.objects.all()
    serializer_class = OutlineSerializer

class CalendarInformationViewSet(viewsets.ModelViewSet):
    queryset = CalendarInformation.objects.all()
    serializer_class = CalendarInformationSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('outline',)

class LearningOutcomeViewSet(viewsets.ModelViewSet):
    queryset = LearningOutcome.objects.all().order_by('number')
    serializer_class = LearningOutcomeSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('outline',)

class TimetableViewSet(viewsets.ModelViewSet):
    queryset = Timetable.objects.all()
    serializer_class = TimetableSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('outline',)

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('outline',)    

class ExaminationsViewSet(viewsets.ModelViewSet):
    queryset = Examinations.objects.all()
    serializer_class = ExaminationsSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('outline',)

class CalculatorViewSet(viewsets.ModelViewSet):
    queryset = Calculator.objects.all()
    serializer_class = CalculatorSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('outline',)

class FinalGradeComponentViewSet(viewsets.ModelViewSet):
    queryset = FinalGradeComponent.objects.all()
    serializer_class = FinalGradeComponentSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('outline',)

class TextbookViewSet(viewsets.ModelViewSet):
    queryset = Textbook.objects.all()
    serializer_class = TextbookSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('outline',)

class PolicyViewSet(viewsets.ModelViewSet):
    queryset = Policy.objects.all()
    serializer_class = PolicySerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('outline',)