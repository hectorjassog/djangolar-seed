from rest_framework import permissions

from .models import UserProfile

class IsAdminOrSelf(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        profile = UserProfile.objects.get(pk=request.user)
        return profile.is_admin or request.user is obj

class IsAdmin(permissions.BasePermission):

    def has_permission(self, request, view):

        profile = UserProfile.objects.filter(user=request.user).first()
        return request.user.is_superuser or profile is not None and profile.is_admin
