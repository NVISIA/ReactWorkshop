import React, { Component } from 'react'

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
    return (<div className='Restaurant'><h1>{this.name}</h1></div>)
  }
}

class RestaurantList extends Component {
  render () {
    return (
      <div className='RestaurantList'>
        <h1>Restaurant List</h1>
        {this.props.items.map(item => (
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
