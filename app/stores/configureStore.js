import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

// Middleware you want to use in production:
function thunkMiddleware(_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;

    return function (next) {
        return function (action) {
            return typeof action === 'function' ? action(dispatch, getState) : next(action);
        };
    };
}

const routingMiddleware = routerMiddleware(browserHistory)

const enhancer = applyMiddleware(thunkMiddleware, routingMiddleware);

export default function configureStore(initialState) {

    return createStore(rootReducer, initialState, enhancer)
}
