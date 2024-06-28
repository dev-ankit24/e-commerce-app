import React from 'react'
import { Link } from 'react-router-dom'

function ProfileTable(props) {
  return (
    <>
         <h5 className='bg-primary text-center p-2 text-light '>{props.title}</h5>
         <table className='table table-bordered'>
         <tbody >
          <tr>
            <th>Name</th>
            <td>{props.user.name}</td>
          </tr>
          <tr>
            <th>User Name</th>
            <td>{props.user.username}</td>
          </tr>
          <tr>
            <th>E-mail</th>
            <td>{props.user.email}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{props.user.phone}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{props.user.address}</td>
          </tr>
          <tr>
            <th>Pin</th>
            <td>{props.user.pin}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{props.user.city}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{props.user.state}</td>
          </tr>
          <tr>
          
            <td colSpan={2} > <Link to="/update-profile" className='w-100 btn bg-primary text-light'>Update Profile</Link></td>
          </tr>
         </tbody>
         </table>
    </>
  )
}

export default ProfileTable