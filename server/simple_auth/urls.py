from django.conf.urls import url
import django.contrib.auth.views as auth_views
from django.core.urlresolvers import reverse



urlpatterns = [
    url(r'^in/$',
        auth_views.login,
        {'template_name': 'simple_auth/login.html'},
        name='simple_login'),
    url(r'^out/$',
        auth_views.logout_then_login,
        name='simple_logout'),
]
