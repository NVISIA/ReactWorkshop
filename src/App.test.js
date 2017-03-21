/* global it, describe, expect */
import React from 'react'
import ReactDOM from 'react-dom'
import App, { DataContainer } from './App'

const fetchMock = require('fetch-mock')

it('renders without crashing', () => {
  fetchMock.mock('/restaurants', [], {})
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  fetchMock.restore()
})

describe('DataContainer', () => {
  it('should be constructed correctly', () => {
    const props = {}
    let dataContainer = new DataContainer(props)
    expect(dataContainer).toBeDefined()
    expect(dataContainer.state.restaurants).toEqual([])
    expect(dataContainer.state.restaurant).toEqual({})
  })
})
