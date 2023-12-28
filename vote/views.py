from rest_framework.viewsets import ModelViewSet
from .models import Student, Representative, Vote
from .serializers import StudentSerializer, RepresentativeSerializer, VoteSerializer


class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class RepresentativeViewSet(ModelViewSet):
    queryset = Representative.objects.all()
    serializer_class = RepresentativeSerializer


class VoteViewSet(ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
