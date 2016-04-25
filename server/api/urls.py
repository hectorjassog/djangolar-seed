from django.conf.urls import url

from api import views

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.api_root),
    url(r'^album/$', views.AlbumList.as_view(), name='album-list'),
    url(r'^album/(?P<pk>[0-9]+)$', views.AlbumDetail.as_view(), name='album-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
