import React, { Component } from 'react'
import { Link } from 'react-router'

import './Restaurant.css'

const restaurantStyle = {
  width: '40%',
  padding: '4px'
}

const tableStyle = {
  width: '100%'
}

function FormattedTime (props) {
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

class ReservationForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      phone: '',
      guests: 1
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    let reservationData = {}
    Object.assign(reservationData, this.state)
    reservationData.restaurantId = this.props.restaurant.id
    reservationData.time = new Date(this.props.desiredTime).getTime()
    reservationData.guests = this.state.guests
    this.props.reservationFn(reservationData).then((success) => {
      if (success) {
        this.props.resetFn(e)
        console.log('Reserved ', this.props.restaurant.name, ' at ',
         reservationData.time)
      } else {
        console.log('Error!')
      }
    })
  }

  handleChange (e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    if (!this.props.desiredTime) {
      return null
    }

    return (
      <div className='ReservationForm'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h4>Reserve {this.props.restaurant.name} at&nbsp;
            <FormattedTime time={this.props.desiredTime} />
          </h4>
          <table>
            <tbody>
              <tr>
                <td><label for='name'>Name for Reservation:</label></td>
                <td><input type='text' name='name' id='name' value={this.state.name}
                  onChange={this.handleChange.bind(this)} /></td>
              </tr>
              <tr>
                <td><label for='phone'>Phone Number:</label></td>
                <td><input type='text' name='phone' id='phone' value={this.state.phone}
                  onChange={this.handleChange.bind(this)} /></td>
              </tr>
              <tr>
                <td><label for='guests'>Number of Guests:</label></td>
                <td><input type='number' name='guests' id='phone'
                  value={this.state.guests} onChange={this.handleChange.bind(this)} /></td>
              </tr>
            </tbody>
          </table>
          <button type='submit'>Reserve</button>
          <button type='reset' onClick={this.props.resetFn}>Clear</button>
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
          <h1>{this.props.restaurant.name}</h1>
          <h2>{this.props.restaurant.tagline}</h2>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td>Price: <Price value={this.props.restaurant.price} /></td>
                <td>Rating: <Rating value={this.props.restaurant.rating} /></td>
                <td>Address: {this.props.restaurant.address}</td>
              </tr>
            </tbody>
          </table>
          <p>{this.props.restaurant.description}</p>
          <AvailableTimesList restaurant={this.props.restaurant}
            reservationFn={this.requestReservation.bind(this)} />
          <ReservationForm restaurant={this.props.restaurant}
            reservationFn={this.props.reserveRestaurant}
            desiredTime={this.state.desiredTime}
            resetFn={this.hideForm.bind(this)} />
        </div>
      )
    }

    // card for list view
    return (
      <div className='Restaurant' style={restaurantStyle}>
        <h2>{this.props.name}</h2>
        <h3>{this.props.tagline}</h3>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td>Price: <Price value={this.props.price} /></td>
              <td>Rating: <Rating value={this.props.rating} /></td>
              <td>Address: {this.props.address}</td>
            </tr>
          </tbody>
        </table>
        <p>{this.description}</p>
        <Link to={this.linkUrl}>Show Times</Link>
      </div>
    )
  }
}

class RestaurantList extends Component {
  render () {
    return (
      <div className='RestaurantList'>
        <h1>Restaurant List</h1>
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
