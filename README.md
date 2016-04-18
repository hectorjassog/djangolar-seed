# Djangolar Template
Template folder structure and initial config to start a project using
Django/Django Rest Framework for a formidable API backend and AngularJS for its
spectacular frontend magic

*This document is nowhere near the level of the official documentations. Please don't use it as a reference document. It's only for quick-starting with this project*

## Usage
You can fork, clone, or import this repository into a new one.  
For developing the project, you should have the followings installed on your machine:
- A good terminal (PowerShell for Windows, lol)
- [Python](https://www.python.org/)
  - Python 3.5
    - pip (Python package manager, should be installed by default)
    - sqlite3 (check its presence by running `import sqlite3` in your Python console)
  - [virtualenv](https://pypi.python.org/pypi/virtualenv)
  - [virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper)
  or the [powershell version](https://pypi.python.org/pypi/virtualenvwrapper-powershell)
  for Windows (with powershell)
- [Node](https://nodejs.org/en/)
  - node (v4) 'n' npm (latest)

**Commands concerning the whole project should be run from its root and those concerning only of its side (client/server), from the corresponding directory.**

Once you have your repository set up on your local machine and virtual environment activated, you can run the following commands to install all the project's dependencies :
```sh
#Server-side
pip install -r requirements.txt

#Client-side
npm install
bower install
```

Check that everything is OK :
```sh
#Server-side
./manage.py shell
./manage.py runserver 53215

#Client-side
grunt test
grunt serve
```
Then go to http://localhost:9000/ and http://localhost:9000/api/

If nothing goes wrong, you're ready to work on either part of your wonderful project !  
To be continued ...  
[Server](server/) / [Client](client/)

## Deployment
*And I think it's gonna be a long long time ...*
