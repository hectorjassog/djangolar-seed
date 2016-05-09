# PostgreSQL Installation Guide
Available some time after the end of the Universe

*This document is nowhere near the level of the official documentations. Please don't use it as a reference document. It's only for quick-starting with this project*

- `psql` : command to start a postgreSQL shell:
  - `-p <port>` connect to the cluster on the selected port (default: 5432 or the lowest one after that it finds)
  - `-U <username>` connect with selected user (default: current one in the shell)
  - `-l` list all database of the selected cluster
  - `-d <database>` connect to the selected database

- `pg_*`: set of commands to manipulate postgres clusters :
  - `pg_ctlcluster <version> <cluster> <action>`  
  do something, e.g. `pg_cluster 9.4 main status` check running status of the main 9.4 cluster
  - `pg_createcluster` create a new postgres cluster
  - `pg_dropcluster` delete a postgres cluster

## installation

[binaries](http://www.postgresql.org/download/) OR from [source code](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
