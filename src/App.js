/* global fetch, Headers */
import React, {Component} from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import 'whatwg-fetch'
import './App.css'

import { Restaurant, RestaurantList } from './Restaurant'
import { Reservation } from './Reservation'
import { PageTemplate } from './PageTemplate'

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
      if (response.ok) {
        return response.json()
      }

      throw new Error(response.status + ' ' + response.statusText)
    }).then((json) => {
      const restaurants = json
      this.setState({ restaurants: restaurants })
    })
  }

  fetchRestaurant (id) {
    fetch('/restaurants/' + id).then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error(response.status + ' ' + response.statusText)
    }).then((json) => {
      const restaurant = json
      this.setState({ restaurant: restaurant })
    })

    fetch('/restaurants/' + id + '/reservations').then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error(response.status + ' ' + response.statusText)
    }).then((json) => {
      const reservations = json
      const restaurant = this.state.restaurant
      restaurant.availableTimes = reservations.available
      this.setState({ restaurant: restaurant })
    })
  }

  reserveRestaurant (reservationData) {
    console.log(JSON.stringify(reservationData))

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    return fetch('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
      headers: myHeaders
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.status + ' ' + response.statusText)
      }

      return response.ok
    })
  }

  render () {
    const {children} = this.props
    const child = React.cloneElement(children,
       {reserveRestaurant: this.reserveRestaurant.bind(this),
        fetchRestaurant: this.fetchRestaurant.bind(this),
        restaurants: this.state.restaurants,
        restaurant: this.state.restaurant})

    return (
      <PageTemplate view={child} />
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
