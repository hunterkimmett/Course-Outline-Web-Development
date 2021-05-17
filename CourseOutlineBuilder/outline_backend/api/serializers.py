
from rest_framework import serializers

from .models import *


class OutlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outline
        fields = '__all__'

class CalendarInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarInformation
        fields = '__all__'

class LearningOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningOutcome
        fields = '__all__'

class TimetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timetable
        fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class ExaminationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examinations
        fields = '__all__'

class CalculatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculator
        fields = '__all__'

class FinalGradeComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalGradeComponent
        fields = '__all__'

class TextbookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Textbook
        fields = '__all__'

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = '__all__'