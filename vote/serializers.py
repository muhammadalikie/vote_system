from django.db import IntegrityError
from rest_framework import serializers
from .models import Representative, Vote, VoteCart
from core.models import User as Student


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ['id', 'username', 'field', 'vote_code']


class RepresentativeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Representative
        fields = ['id', 'student', 'name', 'vote_cart']


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
        return Vote.objects.filter(
            representative=representative, vote_cart=representative.vote_cart
        ).count()


class VoteCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteCart
        fields = ['id', 'name', 'description']


class VoteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id', 'representative']

    def get_fields(self):
        # get the original field names to field instances mapping
        fields = super(VoteCreateSerializer, self).get_fields()

        vote_cart = VoteCart.objects.get(pk=self.context['vote_cart'])
        # modify the queryset
        fields['representative'].queryset = Representative.objects.filter(
            vote_cart=vote_cart)

        # return the modified fields mapping
        return fields

    def create(self, validated_data):
        try:
            vote_cart = VoteCart.objects.get(pk=self.context['vote_cart'])
            
            return Vote.objects.create(student=self.context['student'],
                                           vote_cart=vote_cart, **validated_data)
        except IntegrityError:
            error_msg = {'error': 'You cannot register the same vote'}
            raise serializers.ValidationError(error_msg)



class VoteSerializer(serializers.ModelSerializer):
    vote_cart = serializers.CharField(source='vote_cart.name')
    student = serializers.CharField(source='student.username')
    representative = serializers.CharField(
        source='representative.student.username')
    date = serializers.SerializerMethodField(method_name='formated_date')

    class Meta:
        model = Vote
        fields = ['id', 'vote_cart', 'student', 'representative', 'date']

    def formated_date(self, vote):
        vote = Vote.objects.get(pk=vote.pk).date
        return f'{vote.year}-{vote.month}-{vote.day} {vote.hour}:{vote.minute}:{vote.second}'
