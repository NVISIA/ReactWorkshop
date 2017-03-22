/* global it, describe, expect */
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

import { FormattedTime, Price, Rating, Tagline,
  RestaurantCardTitle } from './Restaurant'

describe('FormattedTime', () => {
  it('should format time', () => {
    const renderer = ReactTestUtils.createRenderer()
    renderer.render(<FormattedTime time={new Date(1490216400000)} />)
    const result = renderer.getRenderOutput()

    expect(result.type).toBe('span')
    expect(result.props.children).toEqual([
      4, ':', '00', ' ', 'PM'
    ])
  })
})

describe('Price', () => {
  it('should format prices', () => {
    const renderer = ReactTestUtils.createRenderer()
    renderer.render(<Price value='3' />)
    const result = renderer.getRenderOutput()

    expect(result.type).toBe('span')
    expect(result.props.children).toEqual('$$$')
  })
})

describe('Rating', () => {
  it('should format ratings', () => {
    const renderer = ReactTestUtils.createRenderer()
    renderer.render(<Rating value='75' />)
    const result = renderer.getRenderOutput()

    expect(result.type).toBe('span')
    expect(result.props.children).toEqual('****')
  })
})

describe('Tagline', () => {
  it('should render taglines', () => {
    const renderer = ReactTestUtils.createRenderer()
    renderer.render(<Tagline data={<span>Twelve of them</span>} />)
    const result = renderer.getRenderOutput()

    expect(result.type).toBe('span')
    expect(result.props.children).toEqual([
      <br />,
      <span>Twelve of them</span>
    ])
  })

  it('should render nothing if there\'s no data', () => {
    const renderer = ReactTestUtils.createRenderer()
    renderer.render(<Tagline />)
    const result = renderer.getRenderOutput()

    expect(result).toBeNull
  })
})

describe('RestaurantCardTitle', () => {
  it('should render card titles', () => {
    const renderer = ReactTestUtils.createRenderer()
    renderer.render(<RestaurantCardTitle name='stuff' tagline='things' />)
    const result = renderer.getRenderOutput()

    expect(result.type).toBe('p')
    expect(result.props.children).toEqual([
      <strong>stuff</strong>,
      <Tagline data='things' />
    ])
  })
})

describe('ReservationForm', () => {
  it('should be constructed properly', () => {
  })
})
