from rest_framework import serializers
from .models import Echo

class EchoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Echo
        fields = '__all__'