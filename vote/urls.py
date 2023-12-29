from rest_framework import routers
from core.models import User as Student
from vote.serializers import StudentSerializer
from vote.views import RepresentativeViewSet, StudentViewSet, VoteViewSet

router = routers.DefaultRouter()
router.register('students', StudentViewSet, basename='students')
router.register('representatives', RepresentativeViewSet)
router.register('votes', VoteViewSet)

urlpatterns = router.urls
