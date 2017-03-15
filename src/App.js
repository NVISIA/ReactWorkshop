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
      restaurants: []
    }
  }

  componentDidMount () {
    fetch('/restaurants').then((response) => {
      return response.json()
    }).then((json) => {
      const restaurants = json
      this.setState({ restaurants: restaurants })
    })
  }

  render () {
    /*
     * We need to add the restaurants list to the props that are passed to the
     * child elements.  React would let us to this like
     * <RestaurantList restaurants={this.state.restaurants} />
     * but since it's not us instantiating the child elements but the Router,
     * we need to clone the props and add our own property, then render the
     * children with this new props instead of the default one provided by the
     * Router.
     */
    const {children} = this.props
    const child = React.cloneElement(children,
       {restaurants: this.state.restaurants})

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
