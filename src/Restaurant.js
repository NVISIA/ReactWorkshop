import React, { Component } from 'react'
import { Link } from 'react-router'

const restaurantStyle = {
  border: '1px solid black',
  width: '40%',
  padding: '4px'
}

const tableStyle = {
  width: '100%'
}

class Restaurant extends Component {
  constructor (props) {
    super(props)
    this.id = props.id
    this.name = props.name || ''
    this.tagline = props.tagline || ''
    this.price = props.price || ''
    this.rating = props.rating || ''
    this.address = props.address || ''
    this.description = props.description || ''
    this.availableTimes = props.availableTimes || []
  }

  get linkUrl () {
    return ('restaurant/' + this.id)
  }

  render () {
    if (this.props.params && this.props.params.id) {
      // detail view
      return (
        <div className='Restaurant'>
          <h1>{this.name}</h1>
          <h2>{this.tagline}</h2>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <td>Price: {this.price}</td>
                <td>Rating: {this.rating}</td>
                <td>Address: {this.address}</td>
              </tr>
            </tbody>
          </table>
          <p>{this.description}</p>
          <p>TIMES HERE</p>
        </div>
      )
    }

    return (
      <div className='Restaurant' style={restaurantStyle}>
        <h2>{this.name}</h2>
        <h3>{this.tagline}</h3>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td>Price: {this.price}</td>
              <td>Rating: {this.rating}</td>
              <td>Address: {this.address}</td>
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
            availableTimes={item.availableTimes}
          />
        ))}
      </div>
    )
  }
}

export { Restaurant, RestaurantList }
