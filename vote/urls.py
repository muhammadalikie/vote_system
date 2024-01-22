from rest_framework_nested  import routers
from vote.views import RepresentativeViewSet, StudentViewSet, VoteCartViewSet, VoteViewSet

router = routers.DefaultRouter()
router.register('students', StudentViewSet)
router.register('representatives', RepresentativeViewSet)
router.register('vote_cart', VoteCartViewSet, basename='vote_cart')
vote_router = routers.NestedDefaultRouter(router, 'vote_cart', lookup='vote_cart')
vote_router.register('votes', VoteViewSet, basename='votes')

urlpatterns = router.urls + vote_router.urls
