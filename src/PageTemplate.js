import React, { Component } from 'react'
import { Grid } from './WaffleGrid'

class PageTemplate extends Component {
  render () {
    return (
      <Grid>{this.props.view}</Grid>
    )
  }
}

export { PageTemplate }
