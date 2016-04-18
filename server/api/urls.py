from django.conf.urls import url

from api import views

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.api_root),
]

urlpatterns = format_suffix_patterns(urlpatterns)
