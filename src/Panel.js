import React, { Component } from 'react'

import './Panel.css'

class Panel extends Component {
  render () {
    return (
      <div className='Panel'>{this.props.children}</div>
    )
  }
}

export { Panel }
