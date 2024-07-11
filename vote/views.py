from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets, permissions
from rest_framework.decorators import action
from .models import Representative, Vote, VoteCart
from .serializers import RepresentativeCreateSerializer, \
    StudentCreateSerializer, StudentSerializer, RepresentativeSerializer, \
    VoteCartSerializer, VoteCreateSerializer, VoteSerializer, VoteCartCreateSerializer
from core.models import User as Student
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import UserPermission


class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return StudentCreateSerializer
        return StudentSerializer


class RepresentativeViewSet(ModelViewSet):
    queryset = Representative.objects.all()
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RepresentativeCreateSerializer
        return RepresentativeSerializer


class VoteCartViewSet(mixins.ListModelMixin,
                      mixins.DestroyModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    permission_classes = [UserPermission]

    def get_serializer_class(self):
        if self.request.method == 'POST' and self.request.user.is_staff:
            return VoteCartCreateSerializer
        return VoteCartSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return VoteCart.objects.all()
        return VoteCart.objects.filter(requirements=self.request.user.requirements)


class VoteViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.RetrieveModelMixin,
                  viewsets.GenericViewSet):

    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Vote.objects.filter(student=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VoteCreateSerializer
        return VoteSerializer

    def get_serializer_context(self):
        return {'student': self.request.user, 'vote_cart': self.kwargs['vote_cart_pk']}

    def destroy(self, request, *args, **kwargs):
        Vote.objects.filter(student=self.request.user).delete()
        return super().destroy(request, *args, **kwargs)
