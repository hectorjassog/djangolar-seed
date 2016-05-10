# PostgreSQL Installation Guide
Available some time after the end of the Universe

*This document is nowhere near the level of the official documentations. Please don't use it as a reference document. It's only for quick-starting with this project*

## Command-line interface
- `pg_*`: set of commands to manipulate postgres clusters :
  - `pg_ctlcluster <version> <cluster> <action>`  
  do something, e.g. `pg_cluster 9.4 main status` checks running status of the main 9.4 cluster
  - `pg_createcluster` creates a new postgres cluster
  - `pg_dropcluster` deletes a postgres cluster
  - `pg_conftool` lets you configure your cluster, in particular `listen_addresses` for security reasons

- generic options :
  - `-U <username>` specify a user to connect or execute a command (default: current user)
  - `-h <host>` specify the host of target database cluster (default: `localhost`)
  - `-p <port>` specify the port of target database cluster (default: `5432` or lowest one binded to a cluster after)

- [`psql`](#psql) (supports `U/h/p` options): command to start a postgreSQL shell:
  - `-l` list all database of the selected cluster
  - `-d <database>` connects to the selected database

- `createdb <database>`[[SQL](#create_database)](supports `U/h/p` options): creates a database
  - `-T <template>` to specify a template (default: `template1`). Use `template0` for a virgin database (in case template1 has been modified)
- `dropdb <database>`(supports `U/h/p` options) to delete a database

- `createuser <username>`[[SQL](#create_user)](supports `U/h/p` options): creates a postgreSQL user
  - `-r` grants CREATEROLE privilege
  - `-g <role>` add it as member of those roles (multiples roles = multiples `-g`)
  - `-E` encrypts the password
  - `-d` grants CREATEDB privilege

- `pg_dump` and `pg_restore` : dumps or restore a database. See `man` pages for more info.
## PSQL
###### Cheat Sheet
list all databases: `\l`
list all tables: `\dt`
list all roles/users: `\du`
describe table/index/sequence/view: `\d [name]`

###### CREATE USER / ROLE
```SQL
CREATE ROLE name WITH
LOGIN #optional, tell if it's a user or a role (can log in or not)
ENCRYPTED PASSWORD password #only works with LOGIN
CREATEDB #privilege, optional
CREATEROLE #privilege, optional
CREATEUSER #privilege, optional
VALID UNTIL 'timestamp' #optional
IN ROLE role_name #optional, add this user as member of those role
```
###### CREATE DATABASE
```SQL
CREATE DATABASE name
WITH
OWNER user_name # optional, defaults to current user
TEMPLATE template # optional, defaults to template1
```

## installation
[binaries](http://www.postgresql.org/download/) OR from [source code](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
