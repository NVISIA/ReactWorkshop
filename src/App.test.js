/* global it, describe, expect, beforeEach, afterEach, spyOn */
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import { RestaurantList } from './Restaurant'
import App, { DataContainer } from './App'

import TestRestaurants from './restaurants.json'
import TestReservations from './reservations.json'

const fetchMock = require('fetch-mock')

describe('App', () => {
  beforeEach(() => {
    fetchMock.mock('/restaurants/0OcqCLrarG3unXM5/reservations', TestReservations, {})
    fetchMock.mock('/restaurants/0OcqCLrarG3unXM5', TestRestaurants[0], {})
    fetchMock.mock('/restaurants', TestRestaurants, {})
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  afterEach(() => {
    fetchMock.restore()
  })
})

describe('DataContainer', () => {
  beforeEach(() => {
    fetchMock.mock('/restaurants/0OcqCLrarG3unXM5/reservations', TestReservations, {})
    fetchMock.mock('/restaurants/0OcqCLrarG3unXM5', TestRestaurants[0], {})
    fetchMock.mock('/restaurants', TestRestaurants, {})
  })

  it('should be constructed correctly', () => {
    const restaurantList = <RestaurantList restaurants={[]} />
    const tree = TestUtils.renderIntoDocument(<DataContainer children={restaurantList} />)
    const component = TestUtils.findRenderedComponentWithType(tree, DataContainer)

    expect(component).toBeDefined()
    expect(component.state.restaurants).toBeDefined()
    expect(component.state.restaurants).toEqual([])
    expect(component.state.restaurant).toBeDefined()
    expect(component.state.restaurant).toEqual({})
  })

  it('should call fetchRestaurants after mounting', () => {
    const restaurantList = <RestaurantList restaurants={TestRestaurants} />
    const tree = TestUtils.renderIntoDocument(<DataContainer children={restaurantList} />)
    const component = TestUtils.findRenderedComponentWithType(tree, DataContainer)

    spyOn(component, 'fetchRestaurantList').and.callThrough()
    expect(component.fetchRestaurantList).not.toHaveBeenCalled()
    component.componentDidMount()
    expect(component.fetchRestaurantList).toHaveBeenCalled()
  })

  it('should fetch a list of restaurants', () => {
    const restaurantList = <RestaurantList restaurants={TestRestaurants} />
    const tree = TestUtils.renderIntoDocument(<DataContainer children={restaurantList} />)
    const component = TestUtils.findRenderedComponentWithType(tree, DataContainer)
    fetchMock.reset() // need to clear the list of calls made during object construction

    expect(fetchMock.called('/restaurants')).toEqual(false)
    component.fetchRestaurantList().then(() => {
      expect(component.state.restaurants).toEqual(TestRestaurants)
    })
    expect(fetchMock.called('/restaurants')).toEqual(true)
  })

  it('should fetch a restaurant', () => {
    const restaurantList = <RestaurantList restaurants={TestRestaurants} />
    const tree = TestUtils.renderIntoDocument(<DataContainer children={restaurantList} />)
    const component = TestUtils.findRenderedComponentWithType(tree, DataContainer)
    fetchMock.reset() // need to clear the list of calls made during object construction

    expect(fetchMock.called('/restaurants/0OcqCLrarG3unXM5')).toEqual(false)
    component.fetchRestaurant('0OcqCLrarG3unXM5').then(() => {
      expect(component.state.restaurant).toEqual(TestRestaurants[0])
    })

    expect(fetchMock.called('/restaurants/0OcqCLrarG3unXM5')).toEqual(true)
  })

  it('should fetch a list of reservations', () => {
    const restaurantList = <RestaurantList restaurants={TestRestaurants} />
    const tree = TestUtils.renderIntoDocument(<DataContainer children={restaurantList} />)
    const component = TestUtils.findRenderedComponentWithType(tree, DataContainer)
    fetchMock.reset() // need to clear the list of calls made during object construction

    expect(fetchMock.called('/restaurants/0OcqCLrarG3unXM5/reservations')).toEqual(false)
    component.fetchReservations('0OcqCLrarG3unXM5').then(() => {
      expect(component.state.restaurant.availableTimes).toEqual(TestReservations.available)
    })

    expect(fetchMock.called('/restaurants/0OcqCLrarG3unXM5/reservations')).toEqual(true)
  })

  it('should reserve a restaurant for a specific time', () => {
    const restaurantList = <RestaurantList restaurants={TestRestaurants} />
    const tree = TestUtils.renderIntoDocument(<DataContainer children={restaurantList} />)
    const component = TestUtils.findRenderedComponentWithType(tree, DataContainer)
    fetchMock.postOnce('/reservations', {ok: true})
    fetchMock.reset() // need to clear the list of calls made during object construction

    expect(fetchMock.called('/reservations')).toEqual(false)
    component.reserveRestaurant({})
    expect(fetchMock.called('/reservations')).toEqual(true)
  })

  afterEach(() => {
    fetchMock.restore()
  })
})
