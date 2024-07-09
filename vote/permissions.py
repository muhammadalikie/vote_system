from rest_framework import permissions

class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action == 'list':
            return bool(request.user and request.user.is_authenticated)
            
        elif view.action in ['create', 'retrieve', 'update', 'partial_update', 'destroy']:
            return bool(request.user and request.user.is_staff)
