import React from 'react'
import { Route } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import SearchResult from './components/SearchResult'
import Property from './components/Property'
import AddProperty from './pages/AddProperty'

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
      <Route path="/add" component={AddProperty} />
      <Route path="/properties" component={SearchResult} />
      <Route path="/property/:id" component={Property} />
  </Route>
)
