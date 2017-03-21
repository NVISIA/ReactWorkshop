import React, { Component } from 'react'

import { Row, Col12Of12, Col4Of12 } from './WaffleGrid'
import { ButtonLink } from './ButtonLink'

import './Restaurant.css'

const errorMessageStyle = {
  color: 'red'
}

const successMessageStyle = {
  color: 'green'
}

const infoMessageStyle = {
  color: 'blue'
}

function FormattedTime (props) {
  if (!props.time) {
    return null
  }

  let hours = parseInt(props.time.getHours())
  let minutes = props.time.getMinutes().toString()
  let ampm = 'AM'

  if (hours > 12) {
    ampm = 'PM'
    hours -= 12
  }

  if (minutes.length < 2) {
    minutes = '0' + minutes
  }

  return (
    <span>{hours}:{minutes} {ampm}</span>
  )
}

function Price (props) {
  let string = ''

  for (let i = 0; i < parseInt(props.value); i++) {
    string += '$'
  }

  return (<span>{string}</span>)
}

function Rating (props) {
  let string = ''

  for (let i = 0; i < parseInt(props.value); i += 20) {
    string += '*'
  }

  return (<span>{string}</span>)
}

function Tagline (props) {
  if (props.data) {
    return (
      <span>
        <br />
        {props.data}
      </span>
    )
  }

  return null
}

function RestaurantCardTitle (props) {
  return (
    <p>
      <strong>{props.name}</strong>
      <Tagline data={props.tagline} />
    </p>
  )
}

function RestaurantInfoRow (props) {
  return (
    <Row>
      <Col4Of12>
        Price: <Price value={props.price} />
      </Col4Of12>
      <Col4Of12>
        Rating: <Rating value={props.rating} />
      </Col4Of12>
      <Col4Of12>
        Address: {props.address}
      </Col4Of12>
    </Row>
  )
}

function StatusMessage (props) {
  if (props.error) {
    return (
      <h4 style={errorMessageStyle}>Failed to reserve {props.restaurantName}
        &nbsp;at&nbsp;<FormattedTime time={props.desiredTime} />:
        &nbsp;{props.error}</h4>
    )
  } else if (props.success) {
    return (
      <h4 style={successMessageStyle}>Reserved {props.restaurantName}
        &nbsp;at&nbsp;<FormattedTime time={props.desiredTime} />.</h4>
    )
  } else if (props.info) {
    return (
      <h4 style={infoMessageStyle}>Reserve {props.restaurantName}&nbsp;at&nbsp;
        <FormattedTime time={props.desiredTime} />: {props.info}</h4>
    )
  } else {
    return (
      <h4>Reserve {props.restaurantName}&nbsp;at&nbsp;
        <FormattedTime time={props.desiredTime} />
      </h4>
    )
  }
}

class ReservationForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      phone: '',
      guests: 1,
      nameValid: true,
      phoneValid: true,
      guestsValid: true,
      success: null,
      info: null,
      error: null,
      reservedTime: null
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    let reservationData = {
      name: this.state.name,
      phone: this.state.phone,
      guests: this.state.guests,
      restaurantId: this.props.restaurantId,
      time: new Date(this.props.desiredTime).getTime()
    }

    this.props.reservationFn(reservationData).then((success) => {
      if (success) {
        this.clearData()
        const success = 'Reserved ' + this.props.restaurant.name + ' at ' +
          reservationData.time
        console.log(success)
        this.setState({ success: success,
           reservedTime: new Date(reservationData.time) })
        this.props.resetFn(e)
      } else {
        const error = 'Error!'
        console.log(error)
        this.setState({ error: error })
      }
    })
  }

  clearData () {
    this.setState({
      name: '',
      phone: '',
      guests: 1
    })
  }

  clearMessageState () {
    this.setState({
      success: null,
      error: null,
      info: null,
      reservedTime: null
    })
  }

  handleChange (e) {
    e.preventDefault()
    this.clearMessageState()
    this.setState({ [e.target.name]: e.target.value })
  }

  reset (e) {
    this.clearMessageState()
    this.clearData()
    this.props.resetFn(e)
  }

  render () {
    if (!this.props.desiredTime) {
      if (this.state.success) {
        return (
          <div className='ReservationForm'>
            <StatusMessage success={this.state.success} info={this.state.info}
              error={this.state.error}
              restaurantName={this.props.restaurant.name}
              desiredTime={this.state.reservedTime} />
          </div>
        )
      }

      return null
    }

    return (
      <div className='ReservationForm'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <StatusMessage success={null} info={this.state.info}
            error={this.state.error} restaurantName={this.props.restaurant.name}
            desiredTime={this.props.desiredTime} />
          <table>
            <tbody>
              <tr>
                <td><label htmlFor='name'>Name for Reservation:</label></td>
                <td><input type='text' name='name' id='name'
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                  minlength='1' pattern='\w+' autocapitalize='words'
                  autocomplete='name' inputmode='verbatim' required /></td>
              </tr>
              <tr>
                <td><label htmlFor='phone'>Phone Number:</label></td>
                <td><input type='tel' name='phone' id='phone'
                  value={this.state.phone}
                  onChange={this.handleChange.bind(this)}
                  minlength='7' autocomplete='tel' inputmode='tel' required
                  pattern='^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$' />
                </td>
              </tr>
              <tr>
                <td><label htmlFor='guests'>Number of Guests:</label></td>
                <td><input type='number' name='guests' id='phone'
                  value={this.state.guests}
                  onChange={this.handleChange.bind(this)} min='1'
                  inputmode='numeric' required /></td>
              </tr>
            </tbody>
          </table>
          <button type='submit'>Reserve</button>
          <button type='reset' onClick={this.reset.bind(this)}>Clear</button>
        </form>
      </div>
    )
  }
}

class AvailableTime extends Component {
  constructor (props) {
    super(props)

    this.time = new Date(this.props.value)
  }

  onClick (e) {
    e.preventDefault()
    this.props.reservationFn(this.time)
  }

  render () {
    return (
      <span onClick={this.onClick.bind(this)}>
        <FormattedTime time={this.time} />
      </span>
    )
  }
}

class AvailableTimesList extends Component {
  render () {
    if (this.props.restaurant.availableTimes) {
      return (
        <div className='AvailableTimesList'>
          <ul>
            {this.props.restaurant.availableTimes.map((item) => {
              return (<li><AvailableTime value={item}
                reservationFn={this.props.reservationFn} /></li>)
            })}
          </ul>
        </div>
      )
    }

    return null
  }
}

class Restaurant extends Component {
  constructor (props) {
    super(props)

    if (props.params && props.params.id) {
      props.fetchRestaurant(props.params.id)
    }

    this.state = {
      desiredTime: null
    }
  }

  get linkUrl () {
    return ('restaurant/' + this.props.id)
  }

  requestReservation (time) {
    const ctime = time
    this.setState({ desiredTime: ctime })
  }

  hideForm (e) {
    e.preventDefault()
    this.setState({ desiredTime: null })
  }

  render () {
    if (this.props.params && this.props.params.id) {
      // detail view
      return (
        <div className='Restaurant'>
          <Row>
            <Col12Of12>
              <RestaurantCardTitle name={this.props.restaurant.name}
                tagline={this.props.restaurant.tagline} />
              <RestaurantInfoRow price={this.props.restaurant.price}
                rating={this.props.restaurant.rating}
                address={this.props.restaurant.address} />
              <p>Description: {this.props.restaurant.description}</p>
              <AvailableTimesList restaurant={this.props.restaurant}
                reservationFn={this.requestReservation.bind(this)} />
              <ReservationForm restaurant={this.props.restaurant}
                reservationFn={this.props.reserveRestaurant}
                desiredTime={this.state.desiredTime}
                resetFn={this.hideForm.bind(this)} />
            </Col12Of12>
          </Row>
        </div>
      )
    }

    // card for list view
    return (
      <div className='Restaurant'>
        <Row>
          <Col12Of12>
            <RestaurantCardTitle name={this.props.name}
              tagline={this.props.tagline} />
            <RestaurantInfoRow price={this.props.price}
              rating={this.props.ating}
              address={this.props.address} />
            <p>Description: {this.props.description}</p>
            <ButtonLink to={this.linkUrl}>Show Times</ButtonLink>
          </Col12Of12>
        </Row>
      </div>
    )
  }
}

class RestaurantList extends Component {
  render () {
    return (
      <div className='RestaurantList'>
        {this.props.restaurants.map(item => (
          <Restaurant
            key={item.id}
            id={item.id}
            name={item.name}
            tagline={item.tagline}
            price={item.price}
            rating={item.rating}
            address={item.address}
            description={item.description}
          />
        ))}
      </div>
    )
  }
}

export { Restaurant, RestaurantList }
