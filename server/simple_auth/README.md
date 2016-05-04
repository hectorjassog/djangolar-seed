# Simple Authentication
Simply simple Django app to handle session authentication using Django's default backend

## Standalone Installation
_**Pythonic installation coming some day**_

- [ ] Copy the directory into your own project
- [ ] Add `'simple_auth.apps.SimpleAuthConfig'` to your `INSTALLED_APPS` setting
- [ ] Add `url(r'^choose-a-name/', include('simple_auth.urls')),` to your `urls.py` (potentially namespacing them)
- [ ] Also add the following in your `settings.py`:

```py
LOGIN_REDIRECT_URL = '/ex/' # change this to match your client
LOGIN_URL = 'simple_login' # those two are defined in the app
LOGOUT_URL = 'simple_logout' # and you can namespace then in your urls
```

You can now log in via https://example.com/choose-a-name/in/ and out via https://example.com/choose-a-name/in/

You can also access your login URL in your project's code with :
```py
from django.core.urlresolvers import reverse
from django.conf import settings
reverse(settings.LOGIN_URL)
```
and the same goes for the logout one
