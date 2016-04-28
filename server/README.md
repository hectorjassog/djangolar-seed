# Djangolar - Server
Server side of this fantastic application, invincible REST API using [DRF (Django Rest Framework)](http://www.django-rest-framework.org/)

*This document is nowhere near the level of the official documentations. Please don't use it as a reference document. It's only for quick-starting with this project*

**You should always be working in a virtual environment, the same for the whole life of the project if possible**

## TL;DR
```sh
# Update your database schema, if needed
./manage.py migrate
# Test, if tests there are
./manage.py test
# Start the server so the client can access it
./manage.py runserver 0.0.0.0:53215
```

## So what ?
- **Terminology** :
  - *Project* means the whole Django project
  - *Application* or *App* designs a single Django app, similar to a Python module, such as DRF or even Django Auth
- **Files** :
  - [`requirements.txt`](requirements.txt) : File to install python dependencies. Used to replicate environments.  
  See [`pip freeze`](https://pip.pypa.io/en/stable/reference/pip_freeze/).
  **MUST BE UPDATED EACH TIME YOU INSTALL NEW DEPENDENCIES**.
  - `__init.py__` : those (probably empty) files are there to tell python that the directory is a python module
  - [`manage.py`](manage.py) : Python script wrapping the `django-admin` CLI. Used to manage a Django project. See [Manage](#manage).
  - [`urls.py`](urls.py) : Server-wide configuration of URLs. See [URLs](#urls).
  - [`conf/`](conf/)
    - [`settings.py`](conf/settings.py) : Settings of the Django project. Contains references to modules and other values needed by the project (e.g. django apps, [database](#database)). See [Settings](#settings).
    - [`wsgi.py`](conf/wsgi.py) : Configuration for running the Python application server. See [Gunicorn](#gunicorn).
- **Third-party apps** :
  - [Django Rest Framework](http://www.django-rest-framework.org/)  
  Powerful and flexible toolkit for building Web APIs.
  - [Django Cors Headers](https://github.com/OttoYiu/django-cors-headers)  
  A Django App that adds CORS (Cross-Origin Resource Sharing) headers to responses.

**See [Django documentation](https://docs.djangoproject.com/en/1.9/) for more information**

### Manage
`manage.py` is a Python script (shebang included !) used to run just about everything in the project. It should always be run from its own directory. You can feed it to Python or run it directly
```sh
python manage.py <command>
# OR
./manage.py <command>
```
Most useful commands :
- "" or `help` for ... wait for it ... a list of all commands
  - `help <command>` for help about a specific command
- `makemigrations` to create the migrations file for your model and database
  - `makemigrations <app>` to do it for only one of your installed app
- `migrate` actually apply all migrations to your default database (as defined in your [settings](#settings))
  - `migrate <app>` to apply only one app migrations ( + dependencies )
  - `migrate <app> <migration>` only up to the specified migration (possibly rollbacking in the process)
  - `--database DB` to specify which database to migrate
- `runserver` to run the Django **development** server on *<http://localhost:8000>*
  - `runserver <port>` to specify a port
  - `runserver <hostname:port>` to specify where you want it served  
  (0.0.0.0:xxxx to use the machine's name and access it from outside)
- `shell` to run a python interpreter shell configured with the project in mind
- `test` for running tests. See [Testing](#testing)
- `startapp` to create a new django app in your project. See [Development](#development)

### [Settings](conf/settings.py)
One of the most important aspect of the project is probably the database (unless you're an ugly troll who want to roll on SQLite)

- #### Databases
By default, to ensure the project can run immediately, it's configured with SQLite (popping the file in the `server` directory)  
There's some code for configuring it to use a [PostgreSQL](http://www.postgresql.org/) database instead. To install and configure one, read [this](pgsql.md).

- #### Installed apps
Or where you tell Django which apps it should load in this project, including the ones we will be developing

### [URLs](urls.py)
It's where you define your project-level (or root) url patterns, which will include/prefix the app-level ones. By default and as example, contains patterns for Django Admin and to the API

### Development
The whole point of this is to develop a (as much as possible) RESTful API to consume with our AngularJS client. Then to refactor it to allow for a one-to-one relation between Model and App
(think an app for users, one for water meters, one for temperature sensors)

Continue in the [`api` app](api/)

### Testing
Coming Soon ...

### Gunicorn
Because the goal is to go into production  
[Coming soon ...](http://gunicorn.org/)
