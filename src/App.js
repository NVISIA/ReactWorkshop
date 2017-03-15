/* global fetch */
import React, {Component} from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import 'whatwg-fetch'
import './App.css'

import { Restaurant, RestaurantList } from './Restaurant'
import { Reservation } from './Reservation'

class DataContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      restaurants: [],
      restaurant: {}
    }
  }

  componentDidMount () {
    this.fetchRestaurantList()
  }

  fetchRestaurantList () {
    fetch('/restaurants').then((response) => {
      return response.json()
    }).then((json) => {
      const restaurants = json
      this.setState({ restaurants: restaurants })
    })
  }

  fetchRestaurant (id) {
    fetch('/restaurants/' + id).then((response) => {
      return response.json()
    }).then((json) => {
      const restaurant = json
      this.setState({ restaurant: restaurant })
    })
  }

  render () {
    const {children} = this.props
    const child = React.cloneElement(children,
       {fetchRestaurant: this.fetchRestaurant.bind(this),
        restaurants: this.state.restaurants,
        restaurant: this.state.restaurant})

    return (
      <div>
        {child}
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={DataContainer}>
          <IndexRoute component={RestaurantList} />
          <Route path='restaurant/:id' component={Restaurant} />
          <Route path='restaurants' component={RestaurantList} />
          <Route path='reservation/:id' component={Reservation} />
          <Route path='reservations(/:restaurantId)' component={Reservation} />
        </Route>
      </Router>
    )
  }
}

export default App
