import React from 'react'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ReactDOM from 'react-dom'
import routes from './routes'
import counterpart from 'counterpart'
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'

counterpart.registerTranslations('en', require('../locales/en.json'));
counterpart.registerTranslations('cn', require('../locales/cn.json'));
counterpart.setLocale('cn');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
)
