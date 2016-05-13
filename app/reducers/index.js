import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import AddPropertyReducer from './add_property_reducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    routing,
    property: AddPropertyReducer,
    form: formReducer
})

export default rootReducer;