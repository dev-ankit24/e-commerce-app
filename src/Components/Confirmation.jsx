import React from 'react'
import { Link } from 'react-router-dom'

export default function Confirmation() {
  return (
    <div className='text-center'>
        <h1 className='text-success'>!!!!! Thank You !!!!! </h1>
        <h3>Your  Order Has Been Placed</h3>
        <h4>You Cand Track Order  IN Profile  Section</h4>
        <Link to="/shop" className='btn bg-warning text-dark'> Shop Now</Link>

    </div>
  )
}
