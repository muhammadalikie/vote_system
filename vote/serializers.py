from django.db import IntegrityError
from django.forms import ValidationError
from rest_framework import serializers
from .models import Representative, Vote, VoteCart
from core.models import User as Student
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from core.models import User


# student serialiers:
# for post method:
class StudentCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['id', 'username', 'password',
                  'requirements']


# for other methods:
class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ['id', 'username', 'requirements']


# Representative serializers:
# for post method:
class RepresentativeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Representative
        fields = ['id', 'student', 'name', 'vote_cart']

# for other methods:


class RepresentativeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='student.username', read_only=True)
    field = serializers.CharField(source='student.field', read_only=True)
    number_of_votes = serializers.SerializerMethodField(
        method_name='cal_vote_number')
    vote_cart = serializers.CharField(source='vote_cart.name')

    class Meta:
        model = Representative
        fields = ['id', 'student', 'username', 'name',
                  'field', 'vote_cart', 'number_of_votes']

    def cal_vote_number(self, representative):
        count = Vote.objects.filter(
            representative=representative, representative__vote_cart=representative.vote_cart
        ).count()
        return count

# vote cart serializers:


class VoteCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteCart
        fields = ['id', 'name', 'description']


# vote serializers:
class VoteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id', 'representative']

    def create(self, validated_data):
        vote_cart = VoteCart.objects.get(pk=self.context['vote_cart'])
        student = Student.objects.get(pk=self.context['student'].pk)
        try:
            if vote_cart.vote_count <= Vote.objects.filter(student=self.context['student'],
                                                           vote_cart=vote_cart).count():
                raise serializers.ValidationError(
                    {'error': 'you can\'t vote more than vote count!'})
            if vote_cart.requirements != student.requirements:
                raise serializers.ValidationError(
                    {'error': 'you haven\'t permission to vote!'})

            return Vote.objects.create(student=self.context['student'],
                                       vote_cart=vote_cart,
                                       **validated_data)
        except IntegrityError:
            error_msg = {'error': 'You cannot register the same vote'}
            raise serializers.ValidationError(error_msg)


class VoteSerializer(serializers.ModelSerializer):
    student = serializers.CharField(source='student.username')
    representative = serializers.CharField(
        source='representative.student.username')
    date = serializers.SerializerMethodField(method_name='formated_date')

    class Meta:
        model = Vote
        fields = ['id', 'student', 'representative', 'date']

    def formated_date(self, vote):
        vote = Vote.objects.get(pk=vote.pk).date
        return f'{vote.year}-{vote.month}-{vote.day} {vote.hour}:{vote.minute}:{vote.second}'
