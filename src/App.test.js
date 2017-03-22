/* global it, describe, expect, beforeEach, afterEach, spyOn */
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import { RestaurantList } from './Restaurant'
import App, { DataContainer } from './App'

import TestData from './restaurants.json'

const fetchMock = require('fetch-mock')

describe('App', () => {
  beforeEach(() => {
    fetchMock.mock('/restaurants', TestData, {})
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
    fetchMock.mock('/restaurants', TestData, {})
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
    const restaurantList = <RestaurantList restaurants={TestData} />
    const tree = TestUtils.renderIntoDocument(<DataContainer children={restaurantList} />)
    const component = TestUtils.findRenderedComponentWithType(tree, DataContainer)

    spyOn(component, 'fetchRestaurantList').and.callThrough()
    expect(component.fetchRestaurantList).not.toHaveBeenCalled()
    component.componentDidMount()
    expect(component.fetchRestaurantList).toHaveBeenCalled()
  })

  it('should fetch a list of restaurants', () => {
    const restaurantList = <RestaurantList restaurants={TestData} />
    const tree = TestUtils.renderIntoDocument(<DataContainer children={restaurantList} />)
    const component = TestUtils.findRenderedComponentWithType(tree, DataContainer)
    fetchMock.reset() // need to clear the list of calls made during object construction

    expect(fetchMock.called('/restaurants')).toEqual(false)
    component.fetchRestaurantList().then(() => {
      expect(component.state.restaurants).toEqual(TestData)
    })
    expect(fetchMock.called('/restaurants')).toEqual(true)
  })

  afterEach(() => {
    fetchMock.restore()
  })
})
