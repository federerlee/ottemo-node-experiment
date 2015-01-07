# Deprecated

Ottemo is democratizing ecommerce for the Small and Medium Enterprise.  This repository was experimental and allowed us to validate our intentions.  We have since moved to a different platform and will be releasing our new platform in the coming weeks. For more information, please visit our [website](http://ottemo.io).

## Ottemo Installation Instructions and Getting Started

### Install PostgreSQL 9.3

Instructions provided for Mac and Debian based linux. There is a sample database configuration file called: sample-local-js

#### OSX

This will start postgresql upon startup/login.  We are also installing pgadmin3 to provide a gui based management tool.

    brew update
    brew install postgresql pgadmin3
    initdb /usr/local/var/postgres
    ln -s /usr/local/Cellar/postgresql/9.x.x/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
    pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

    psql postgres -c 'CREATE EXTENSION "adminpack";'     // add adminpack to postgres db

#### Ubuntu
 
Change 'trusty-pgdg' to your specific version of ubuntu, run 'lsb_release -c' to determine your release version

    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" >> /etc/apt/sources.list.d/postgresql.list'
    sudo apt-get update
    sudo apt-get install python-software-properties postgresql-9.3 libpq-dev pgadmin3 postgresql-contrib-9.3 -y

#### Create a dev database and user
    
    sudo su postgres -c psql
    create user USERNAME with password 'PASSWORD';
    alter user USERNAME superuser;
    
    create database ottemo_dev;
    grant all privileges on database ottemo_dev to USERNAME;

    alter user USERNAME with password 'PASSWORD';     // only if you need to change or add a password
    CREATE EXTENSION adminpack;                       // add adminpack to postgres db
    \c ottemo_dev;                                    // change to the ottemo_dev db
    CREATE EXTENSION adminpack;                       // add adminpack to otteme_dev db
    \q

#### Change postgresql trust levels for development

change this line in /etc/postgresql/9.3/main/pg_hba.conf

    local   all             all                                    md5
to:

    local   all             all                                    trust

and change this line: 

    host    all             all             127.0.0.1/32            md5
    
to:

    host    all             all             127.0.0.1/32            trust

### Set up your local env for development

#### OSX
    brew install npm
    brew install git-flow
    brew install hub
    eval "$(hub alias -s)"  // add this to your .bashrc or .bash_profile
    npm install -g mocha bower
    gem install compass  // you must have ruby 1.9.x or 2.x.x installed

#### Debian based Linux
    sudo apt-get update
    sudo apt-get install -y python-software-properties python g++ make
    sudo add-apt-repository -y ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

    sudo gem install compass
    sudo apt-get install git-flow

    curl http://hub.github.com/standalone -sLo ~/bin/hub
    chmod +x ~/bin/hub
    eval "$(hub alias -s)"  // add this to your .bashrc or .bash_profile

    npm install -g mocha bower

## To Download and Setup Ottemo

### Clone the Repository
    git clone https://github.com/ottemo/ottemo.git ottemo
    
### Install local dependancies for Ottemo
    cd <directory of cloned repo>
    npm install
    bower install
    
## Contribute to Ottemo development
We use git-flow internally, below is a mini quickstart if you are new to git-flow.

### Initialize Git-Flow
    git checkout master
    git checkout develop
    git flow init -d

### Start a Feature Branch
    git flow feature start <FEATURE-NAME>

### Issue a Pull Request on Github
    git push -u origin <FEATURE-BRANCH>
    git pull-request -b develop

### Run in development mode
    $ sails lift         // development mode by default

Add routes (`config/routes.js`), create models (`api/models/`) and controllers (`api/controllers/`).

## License

[MIT License](http://mit-license.org/) copyright 2014, Ottemo
