from urllib import request
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets
from .models import Representative, Vote
from .serializers import StudentSerializer, RepresentativeSerializer, VoteCreateSerializer, VoteSerializer
from core.models import User as Student
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class StudentViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUser]
    

class RepresentativeViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = Representative.objects.all()
    serializer_class = RepresentativeSerializer
    permission_classes = [IsAdminUser]


class VoteViewSet(ModelViewSet):
    serializer_class = VoteCreateSerializer
        
    def get_queryset(self):
        if self.request.user.is_staff:
            return Vote.objects.all()
        else :
            return Vote.objects.filter(student=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VoteCreateSerializer
        return VoteSerializer

    def get_serializer_context(self):
        return {'student':self.request.user}