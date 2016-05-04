from rest_framework import permissions

from django.contrib.auth.models import User

from .models import UserProfile

class IsAdminOrSelf(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        try:
            profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return request.user == obj or request.user.is_superuser
        return profile.is_admin or request.user == obj

class IsAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return request.user.is_superuser
        return profile is not None and profile.is_admin
