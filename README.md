##Ottemo##
An ambitious open-source ecommerce solution based on node.js.


##Getting Started##
Ottemo requires node.js and MongoDb. After installing, clone this repository, cd into the ottemo directory, and follow the instructions below.

####Install dependencies####
`$ npm install`
####Export required environment variables####
```
$ export HOST=0.0.0.0
$ export PORT=3000
$ export MONGO_URL=mongodb://ip:port/dbname
$ export FACEBOOK_ID=oauthid           # Only needed for oauth support.
$ export FACEBOOK_SECRET=oauthsecret   
$ export FACEBOOK_URL='http://ip:port' # This will need to be an ip and port available from the Internet.
```
####Start ottemo http server####
`$ node .`
