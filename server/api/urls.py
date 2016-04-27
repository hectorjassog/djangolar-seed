from django.conf.urls import url

from api import views

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$',
        views.api_root),
    url(r'^album/$',
        views.AlbumList.as_view(), name='album-list'),
    url(r'^album/(?P<pk>[0-9]+)/$',
        views.AlbumDetail.as_view(), name='album-detail'),
    #url(r'^track/(?P<pk>[0-9]+)$',
    #    views.TrackDetail.as_view(), name='track-detail'),
    url(r'^album/(?P<pk>[0-9]+)/track/$',
        views.AlbumTrackListing.as_view(), name='album-track-list'),
    url(r'^album/(?P<album_id>[0-9]+)/track/(?P<order>-?[0-9]+)/$',
        views.TrackDetail.as_view(), name='album-track-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
