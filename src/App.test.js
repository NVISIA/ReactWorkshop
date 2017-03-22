/* global it, describe, expect, beforeEach, afterEach, spyOn */
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { RestaurantList } from './Restaurant'
import App, { DataContainer } from './App'

const fetchMock = require('fetch-mock')

describe('App', () => {
  beforeEach(() => {
    fetchMock.mock('/restaurants', [], {})
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
    fetchMock.mock('/restaurants', [], {})
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
    const restaurantList = <RestaurantList restaurants={[]} />
    const tree = TestUtils.renderIntoDocument(<DataContainer children={restaurantList} />)
    const component = TestUtils.findRenderedComponentWithType(tree, DataContainer)

    spyOn(component, 'fetchRestaurantList').and.callThrough()
    expect(component.fetchRestaurantList).not.toHaveBeenCalled()
    component.componentDidMount()
    expect(component.fetchRestaurantList).toHaveBeenCalled()
  })

  afterEach(() => {
    fetchMock.restore()
  })
})
