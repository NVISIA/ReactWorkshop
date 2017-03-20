import React, { Component } from 'react'
import { Link } from 'react-router'

import './ButtonLink.css'

class ButtonLink extends Component {
  render () {
    if (this.props.to) {
      return (
        <Link className='ButtonLink' to={this.props.to}>{this.props.children}</Link>
      )
    } else if (this.props.href) {
      return (
        <a className='ButtonLink' href={this.props.href}>{this.props.children}</a>
      )
    } else {
      return <a className='ButtonLink'>{this.props.children}</a>
    }
  }
}

export { ButtonLink }
