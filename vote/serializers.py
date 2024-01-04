from django.db import IntegrityError
from rest_framework import serializers
from .models import Representative, Vote
from core.models import User as Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'username', 'field']


class RepresentativeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='student.username')
    student_id = serializers.IntegerField(source='student.id')
    number_of_votes = serializers.SerializerMethodField(method_name='cal_vote_number')
    class Meta:
        model = Representative
        fields = ['id', 'student_id', 'name', 'username', 'number_of_votes']

    def cal_vote_number(self, representative):
        return Vote.objects.filter(
            representative=representative
        ).count()

class VoteCreateSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source='student.username', read_only=True)
    
    class Meta:
        model = Vote
        fields = ['id', 'student', 'representative']


    def create(self, validated_data):
        try:
            return Vote.objects.create(student=self.context['student'], **validated_data)
        except IntegrityError:
            error_msg = {'error': 'You cannot register the same vote'}
            raise serializers.ValidationError(error_msg)
            

class VoteSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True)
    student = serializers.CharField(source='student.username')
    representative = serializers.CharField(
        source='representative.student.username')
    date = serializers.SerializerMethodField(method_name='formated_date')

    class Meta:
        model = Vote
        fields = ['id', 'name', 'student', 'representative', 'date']

    def formated_date(self, vote):
        vote = Vote.objects.get(pk=vote.pk).date
        return f'{vote.year}-{vote.month}-{vote.day} {vote.hour}:{vote.minute}:{vote.second}'