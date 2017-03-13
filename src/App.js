import React, {Component} from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import './App.css'

import { Restaurant, RestaurantList } from './Restaurant'
import { Reservation } from './Reservation'
import { Nav } from './Nav'

const Home = () => <div><h1>Hello, World!</h1></div>
const Container = (props) => (
  <div>
    <Nav />
    {props.children}
  </div>
)

class App extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Home} />
          <Route path='/restaurant/:id' component={Restaurant} />
          <Route path='/restaurants' component={RestaurantList} />
          <Route path='/reservation/:id' component={Reservation} />
          <Route path='/reservations(/:restaurantId)' component={Reservation} />
        </Route>
      </Router>
    )
  }
}

export default App
