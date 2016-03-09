import React from 'react'
import Router from 'react-router'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routes from './routes'
import counterpart from 'counterpart'

counterpart.registerTranslations('en', require('../locales/en.json'))
counterpart.registerTranslations('cn', require('../locales/cn.json'))
counterpart.setLocale('cn')

ReactDOM.render(
  <Router history={createBrowserHistory()}>{routes}</Router>,
  document.getElementById('app')
)
