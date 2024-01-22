from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets
from .models import Representative, Vote, VoteCart
from .serializers import StudentSerializer, RepresentativeSerializer, VoteCartSerializer, VoteCreateSerializer, VoteSerializer
from core.models import User as Student
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class StudentViewSet(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.UpdateModelMixin,
                     viewsets.GenericViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUser]


class RepresentativeViewSet(ModelViewSet):
    queryset = Representative.objects.all()
    serializer_class = RepresentativeSerializer
    permission_classes = [IsAdminUser]


class VoteCartViewSet(ModelViewSet):
    queryset = VoteCart.objects.all()
    serializer_class = VoteCartSerializer
    permission_classes = [IsAdminUser]


class VoteViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Vote.objects.filter(vote_cart=self.kwargs['vote_cart_pk'])

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VoteCreateSerializer
        return VoteSerializer

    def get_serializer_context(self):
        return {'student': self.request.user, 'vote_cart':self.kwargs['vote_cart_pk']}
