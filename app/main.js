import React from 'react'
import { Router, browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
import routes from './routes'
import counterpart from 'counterpart'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

counterpart.registerTranslations('en', require('../locales/en.json'))
counterpart.registerTranslations('cn', require('../locales/cn.json'))
counterpart.setLocale('cn')

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)
