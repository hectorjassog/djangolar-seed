from django.contrib.auth.forms import AuthenticationForm

class SimpleAuthForm(AuthenticationForm):

    def __init__(self, request=None, *args, **kwargs):
        super(SimpleAuthForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['placeholder'] = "Nom d'utilisateur"
        self.fields['password'].widget.attrs['placeholder'] = 'Mot de passe'
