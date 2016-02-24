# fang-react

## how to build and run the project

* run `npm install && bower install` for dependencies
* create data/db folder under project root
* run `sh start-db.sh` to start mongodb
* `cd` to the project root in terminal, run `npm run watch`
* open another terminal window/tab, `cd` to the project root and run `gulp`

## import testing data

call `http://localhost:3000/api/load` to load testing data

## a few mongodb command for help

* run `mongo` to get into the mongodb command shell
* run `use nef` to select database 'nef'
* run `db.getCollectionNames()` to list all collections in the database
* run `db.property.find()` to list all data in collection 'property'
* run `db.property.drop()` to delete the collection 'property'

## references:

* [a walkthrough of the project structure](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/)
* [React Eco System](http://www.toptal.com/react/navigating-the-react-ecosystem)
* [ALT for Flux](http://alt.js.org/guide/)
