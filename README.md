# fang-react

## how to build and run the project

* run `npm install && bower install` for dependencies
* create data/db folder under project root
* run `sh start-db.sh` to start mongodb
* `cd` to the project root in terminal, run `npm run watch`
* open another terminal window/tab, `cd` to the project root and run `gulp`

## import testing data

run `mongoimport --db nef --collection property --drop --file data.json` under root folder

## a few mongodb command for help

* run `mongo` to get into the mongodb command shell
* run `use nef` to select database 'nef'
* run `db.getCollectionNames()` to list all collections in the database
* run `db.property.find()` to list all data in collection 'property'
* run `db.property.drop()` to delete the collection 'property'
