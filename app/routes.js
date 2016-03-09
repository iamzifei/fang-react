import React from 'react'
import { Route } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Search from './components/Search'
import Property from './components/Property'
import AddProperty from './components/AddProperty'

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
      <Route path="/add" component={AddProperty} />
      <Route path="/properties/:suburb" component={Search} />
      <Route path="/properties/refine/:suburb" component={Search} />
      <Route path="/property/:id" component={Property} />
  </Route>
)
