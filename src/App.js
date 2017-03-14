import React, {Component} from 'react'
import { Router, Route, hashHistory } from 'react-router'
import './App.css'

import { Restaurant, RestaurantList } from './Restaurant'
import { Reservation } from './Reservation'

class App extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={RestaurantList} />
        <Route path='/restaurant/:id' component={Restaurant} />
        <Route path='/restaurants' component={RestaurantList} />
        <Route path='/reservation/:id' component={Reservation} />
        <Route path='/reservations(/:restaurantId)' component={Reservation} />
      </Router>
    )
  }
}

export default App
