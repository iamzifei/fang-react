import { createStore, combineReducers } from 'redux'
import { createModelReducer, formReducer } from 'react-redux-form'
import propertyReducer from './reducers/property'
import config from '../config'

const reducers = combineReducers({
  property: propertyReducer,
  propertyForm: formReducer(config.propertyReduxModelName)
})

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState)

  return store
}
