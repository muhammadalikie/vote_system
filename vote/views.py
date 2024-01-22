from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets
from .models import Representative, Vote, VoteCart
from .serializers import RepresentativeCreateSerializer, StudentSerializer, RepresentativeSerializer, VoteCartSerializer, VoteCreateSerializer, VoteSerializer
from core.models import User as Student
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import IsAuthenticatedForVote

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
    permission_classes = [IsAdminUser]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RepresentativeCreateSerializer
        return RepresentativeSerializer


class VoteCartViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    
    serializer_class = VoteCartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return VoteCart.objects.all()
        elif self.request.user.vote_code:
            return VoteCart.objects.filter(pk=self.request.user.vote_code)
        
    
            


class VoteViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedForVote]

    def get_queryset(self):
        return Vote.objects.filter(vote_cart=self.kwargs['vote_cart_pk'])

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return VoteCreateSerializer
        return VoteSerializer

    def get_serializer_context(self):
        return {'student': self.request.user, 'vote_cart': self.kwargs['vote_cart_pk']}
