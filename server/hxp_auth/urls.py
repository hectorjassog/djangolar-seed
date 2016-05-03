from django.conf.urls import url
import django.contrib.auth.views as auth_views

urlpatterns = [
    url(r'^$',
        auth_views.login,
        {'template_name': 'hxp_auth/login.html'},
        name='login'),
]
