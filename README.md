# Djangolar Template
Template folder structure and initial configuration to start a project using
Django/Django Rest Framework for a formidable API back-end and AngularJS for its
spectacular front-end magic

*This document is nowhere near the level of the official documentations. Please don't use it as a reference document. It's only for quick-starting with this project*

## Usage
You can fork, or import this repository into a new one.  
For developing the project, you should have the followings installed on your machine:
- A good terminal (PowerShell for Windows, LOL)
- [Python](https://www.python.org/)
  - Python 3.5
    - pip (Python package manager, should be installed by default)
    - sqlite3 (check its presence by running `import sqlite3` in your Python console)
  - [virtualenv](https://pypi.python.org/pypi/virtualenv)
  - [virtualenvwrapper](https://pypi.python.org/pypi/virtualenvwrapper)
  or, if you feel as brave as Don Quixote, the [powershell version](https://pypi.python.org/pypi/virtualenvwrapper-powershell)
  for Windows (with powershell) or [plain cmd prompt version](https://pypi.python.org/pypi/virtualenvwrapper-win)
- [Node](https://nodejs.org/en/)
  - node (v4) 'n' [npm](https://www.npmjs.com/) (v3)
  - [bower](http://bower.io/)
  - [grunt-cli](https://www.npmjs.com/package/grunt-cli) (v0.1)

Need help to install everything ? Click [here !](#installation)

**Commands concerning the whole project should be run from its root and those concerning only one of its side (client/server), from the corresponding directory.**

Once you have your repository and system dependencies set up on your local machine and virtual environment (for the server side) activated, you can run the following commands to install all the project's dependencies :
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
./manage.py migrate #if you're using a new database / you may also need makemigrations
./manage.py test
./manage.py shell #C-D to quit
./manage.py runserver 53215

#Client-side
grunt test
grunt serve
```
Then go to <http://localhost:9000/> and <http://localhost:9000/api/>

If nothing goes wrong, you're ready to work on either part of your wonderful project !  
To be continued ...  
##### [Server](server/) / [Client](client/)

## Installation

### Python
Once you have installed Python 3.5 on your machine (Windows or OS X, you need to compile it yourself on GNU/Linux), you should have access to the `pip` command-line interface.  
If not, execute [get-pip.py](https://bootstrap.pypa.io/get-pip.py) within your target Python interpreter (the one you want `pip` for)

When you can finally use `pip` (it may be `pip3` or `pip3.5`):
###### On \*nix
```sh
# Depending on your Python installation, you may need to sudo those commands
$ pip install virtualenv
$ pip install virtualenvwrapper

# You should add those to your .bashrc/.profile/whatever is your shell startup script
$ export WORKON_HOME=$HOME/.virtualenvs # Or wherever you want your virtualenvs to live
$ export PROJECT_HOME=$HOME/dev # Or wherever you want to work
$ export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python
# Or whatever Python interpreter you want to use for your virtualenvs
# You can also use a command-line argument when creating one
$ . /usr/local/bin/virtualenvwrapper.sh # Or wherever is your script

# How to work (Tab-completion included !)
# Create a v-env with the same name as the project, a project folder, and link them
$ mkproject <project>
# activate a v-env and move to its project
$ workon <env>
#The prompt should look like this with a v-env activated
(<env>) foo@bar ~/dev/<project> $
# Install packages in your new shiny sandbox
$ pip install httpie
$ pip install -r requirements.txt
# To exit a v-env
$ deactivate
```

###### On Windows
```powershell
Il en faut peu pour être heureux ...
```

### Node
npm is included in Node but comes in an old (read "LTS") version with "Argon" (Node v4 LTS)
To update it, you simply need to run  
```sh
npm update -g npm
```
then you can install bower and grunt-cli
```sh
npm install -g bower grunt-cli@">=0.1.13 <1.0.0"
```

If you have problems (e.g. EACCESS) go look around [there](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

## Continuous Integration
...

## Deployment
*And I think it's gonna be a long long time ...*
