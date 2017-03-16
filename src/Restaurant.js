import React, { Component } from 'react'
import { Link } from 'react-router'

import './Restaurant.css'

const restaurantStyle = {
  border: '1px solid black',
  width: '40%',
  padding: '4px'
}

const tableStyle = {
  width: '100%'
}

function AvailableTime (props) {
  const time = new Date(props.value)
  let hours = parseInt(time.getHours())
  let minutes = time.getMinutes().toString()
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

function AvailableTimesList (props) {
  if (props.restaurant.availableTimes) {
    return (
      <div className='AvailableTimesList'>
        <ul>
          {props.restaurant.availableTimes.map((item) => {
            return (<li><AvailableTime value={item} /></li>)
          })}
        </ul>
      </div>
    )
  }

  return null
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

class Restaurant extends Component {
  constructor (props) {
    super(props)

    if (props.params && props.params.id) {
      props.fetchRestaurant(props.params.id)
    }
  }

  get linkUrl () {
    return ('restaurant/' + this.props.id)
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
          <AvailableTimesList restaurant={this.props.restaurant} />
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
              <td>Price: {this.props.price}</td>
              <td>Rating: {this.props.rating}</td>
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
