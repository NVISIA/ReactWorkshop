/* global it, describe, expect */
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

import { FormattedTime } from './Restaurant'

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

describe('ReservationForm', () => {
  it('should be constructed properly', () => {
  })
})
