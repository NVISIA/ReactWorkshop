import React, { Component } from 'react'

class PageTemplate extends Component {
  render () {
    return (
      <div>{this.props.view}</div>
    )
  }
}

export { PageTemplate }
