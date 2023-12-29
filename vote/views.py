from urllib import request
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets
from .models import Representative, Vote
from .serializers import StudentSerializer, RepresentativeSerializer, VoteCreateSerializer, VoteSerializer
from core.models import User as Student
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class StudentViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    


class RepresentativeViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = Representative.objects.all()
    serializer_class = RepresentativeSerializer


class VoteViewSet(ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteCreateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VoteCreateSerializer
        return VoteSerializer

    def get_serializer_context(self):
        return {'student':self.request.user}