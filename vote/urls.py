from rest_framework import routers
from vote.views import RepresentativeViewSet, StudentViewSet, VoteViewSet

router = routers.DefaultRouter()
router.register('students', StudentViewSet)
router.register('representatives', RepresentativeViewSet)
router.register('votes', VoteViewSet, basename='votes')

urlpatterns = router.urls
