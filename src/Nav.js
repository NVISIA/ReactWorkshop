import React from 'react'
import { Link } from 'react-router'

const Nav = () => (
  <div className='Nav'>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/restaurants'>Restaurant List</Link></li>
    </ul>
  </div>
)

export { Nav }
