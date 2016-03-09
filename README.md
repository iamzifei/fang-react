# fang-react

## How to build and run the project

* run `npm install && bower install` for dependencies
* create data/db folder under project root
* run `sh start-db.sh` to start mongodb
* `cd` to the project root in terminal, run `npm run watch`
* open another terminal window/tab, `cd` to the project root and run `gulp`
* run `sh import-suburb.sh` to import suburb table, you may need to change the database name in the shell script

## Testing data import

call `http://localhost:3000/api/load` to load testing data, you only need to do this once

## Mongodb command tips

* run `mongo` to get into the mongodb command shell
* run `use nef` to select database 'nef'
* run `db.getCollectionNames()` to list all collections in the database
* run `db.property.find()` to list all data in collection 'property'
* run `db.property.drop()` to delete the collection 'property'

## Branching strategy

* please create a branch for each feature, branch name should be `feature\<BRANCH NAME>` or `bugbix\<BRANCH NAME>`
* use pull request to merge back to the master branch
* master branch for deployment
* tag the production version

## Project structure

* PropertyActions -> PropertyStore (handle all CRUD actions and states for property/properties)
* ListingActions -> ListingStore (handle all properties listing actions and states)
* SearchActions -> SearchStore (handle all search including search narrow downs)

## How to translate

1) do the following import in component if needed:
  ```
  import counterpart from 'counterpart'
  import Translate from 'react-translate-component'
  ```
2) put the translated string in JSON format under `locales` folder 
  a) for React component, use:
  ```
  <Translate content="nav.toggle" />
  ```
  b) for String output, use:
  ```
  counterpart("nav.search.placeholder")
  ```
for more details, please refer to [React Translate Componenent](https://github.com/martinandert/react-translate-component) and [Counterpart](https://github.com/martinandert/counterpart)

## Todo:

### stage 1
* ~~pagination (may use this one: [react-paginate](https://github.com/AdeleD/react-paginate))~~
* ~~suburb/postcode search auto-complete~~
* ~~google map integration for property details page~~
* ~~translation (Using [React Translate Componenent](https://github.com/martinandert/react-translate-component), later on can move to [React-Intl V2](https://github.com/yahoo/react-intl/issues/162))~~
* add property with image upload (may use this one: [react-dropzone](https://github.com/okonet/react-dropzone))
* display property images carousel in property details page (may use this one: [react-responsive-carousel](https://github.com/leandrowd/react-responsive-carousel))
* narrow down search results by price, type & features
* style polish & responsive

### stage 2
* user register/login
* user profile
* social network login integration
* property details form enhancement
* property management

### stage 3
* nearby facilities for property
* search by facilities

### stage 4
* property shortlist
* property rating/comment

## Deploy notes:

* add/update Google Map API key
* remove the testing data and relevant API
* import suburb/postcode information into DB
* solving the test errors

## references:

- [a walkthrough of the project structure](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/)
- [React Eco System](http://www.toptal.com/react/navigating-the-react-ecosystem)
- [ALT for Flux](http://alt.js.org/guide/)
- [Flux Data Flow](http://rackt.org/redux/docs/basics/DataFlow.html)
- [Redux](http://rackt.org/redux/docs/basics/index.html)
- [React Router Redux](https://github.com/reactjs/react-router-redux)
- [Fetch API](https://github.com/github/fetch)
- [Fetch Mock](https://github.com/wheresrhys/fetch-mock)
- [Immutable JS](https://github.com/facebook/immutable-js)
- [Redux Form](http://erikras.github.io/redux-form)
- [Migrating to Redux](http://redux.js.org/docs/recipes/MigratingToRedux.html)
