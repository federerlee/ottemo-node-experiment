# Ottemo Community Server

an ambitious open-source ecommerce solution based on Node.js

## Ottemo Installation Instructions and Getting Started

### OSX
    brew install npm
    brew install git-flow
    brew install hub
    eval "$(hub alias -s)"  // add this to your .bashrc or .bash_profile
    npm install -g mocha bower
    gem install compass  // you must have ruby 1.9.x or 2.x.x installed

### Debian based Linux
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

## Install PostgreSQL 9.3

### Ubuntu
 
Change 'trusty-pgdg' to your specific version of ubuntu, run 'lsb_release -c' to determine your release version

    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" >> /etc/apt/sources.list.d/postgresql.list'
    sudo apt-get update
    sudo apt-get install python-software-properties postgresql-9.3 libpq-dev pgadmin3 postgresql-contrib -y
    
    sudo su postgres -c psql
    create user USERNAME with password 'PASSWORD';
    alter user USERNAME supervisor;

    create database ottemo_dev;
    grant all privileges on database ottemo_dev to USERNAME;

    alter user USERNAME with password 'PASSWORD';

## Install local dependancies
    cd <directory of cloned repo>
    npm install
    bower install

## Usage

### Clone the Repository
    git clone https://github.com/ottemo/api-server.git ottemo-api-server

### Initialize Git-Flow
    git checkout master
    git checkout develop
    git flow init -d

### Start a Feature Branch
    git flow feature start <FEATURE-NAME>

### Issue a Pull Request on Github
    git push -u origin <FEATURE-BRANCH>
    git pull-request -b develop

### Install local dependancies and begin coding
    $ sails lift         // development mode by default and invokes nodemon

Add routes (`config/routes.js`), create models (`api/models/`) and controllers (`api/controllers/`).

## License

[MIT License](http://mit-license.org/) copyright 2014, Ottemo
