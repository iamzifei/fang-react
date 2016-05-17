import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import AddPropertyReducer from './add_property_reducer'
import userReducer from './userReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    routing,
    property: AddPropertyReducer,
    userState : userReducer,
    form: formReducer
})

export default rootReducer;
