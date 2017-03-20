import React, { Component } from 'react'

import { Grid, Row, Col12Of12, Col8Of12, Col4Of12 } from './WaffleGrid'
import { Panel } from './Panel'
import { ButtonLink } from './ButtonLink'

import './PageTemplate.css'

const iconStyle = {
  display: 'inline-block',
  float: 'left',
  width: '90px'
}

const titleStyle = {
  display: 'inline-block',
  marginTop: '0px'
}

class TitleMain extends Component {
  render () {
    return (
      <h1 className='TitleMain' style={titleStyle}>{this.props.children}</h1>
    )
  }
}

class TitleSub extends Component {
  render () {
    return (
      <p className='TitleSub'>{this.props.children}</p>
    )
  }
}

class PageTemplate extends Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col12Of12>
            <img src='img/icon_01.png' style={iconStyle} />
            <TitleMain>Easy Reservations</TitleMain>
            <TitleSub>Simply choose a restaurant, a time,
            and submit your reservation!</TitleSub>
          </Col12Of12>
        </Row>
        <Row>
          <Col8Of12>
            {this.props.view}
          </Col8Of12>
          <Col4Of12>
            <Panel>
              <h5>Welcome Back!</h5>
              <ButtonLink to='/logout'>Logout</ButtonLink>
            </Panel>
            <Panel>
              <h5>There is so much more!</h5>
              <p>This is but one example with ReactJS, there is so much more possible!</p>
              <ButtonLink href=''>Go to ReactJS Docs</ButtonLink>
            </Panel>
          </Col4Of12>
        </Row>
      </Grid>
    )
  }
}

export { PageTemplate }
