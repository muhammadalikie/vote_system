from rest_framework.permissions import BasePermission


class IsAuthenticatedForVote(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and
                    request.user.vote_code)
