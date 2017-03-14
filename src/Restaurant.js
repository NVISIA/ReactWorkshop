import React, { Component } from 'react'

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

  render () {
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
      </div>
    )
  }
}

class RestaurantList extends Component {
  constructor (props) {
    super(props)
    this.items = props.items

    // temporary
    this.items = [{
      id: 1,
      name: 'Testaurant',
      tagline: 'The Testiest',
      price: '$',
      rating: '*',
      address: '123 Fake St.',
      description: 'A Test Establishment serving No Food!',
      availableTimes: []
    }]
  }

  render () {
    return (
      <div className='RestaurantList'>
        <h1>Restaurant List</h1>
        {this.items.map(item => (
          <Restaurant
            key={item.id}
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
