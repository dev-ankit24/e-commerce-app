import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminHome() {
  let [user, setUser]=useState({})
  let navigate =useNavigate()
  useEffect(()=>{
    ( async ()=>{
        let response= await fetch("/user",{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })
        response= await response.json()
        let item = response.find((x)=>x.id===localStorage.getItem("userid"))
        if(item)
            setUser(item)
        else
        navigate("/login")
    })()
},[])
  return (
    <>
  <div className="container-fluid">
  <div className="row my-3">
        <div className="col-md-3">
            <SideBar/>
        </div>
        <div className="col-md-9">
            <div className="row">
                <div className="col-md-6">
                {
                            user.pic?
                            <img src={user.pic} alt="user-image" height={400} width="100%"  /> :
                            <img src="/img/anuj.jpg" alt="user-image" width="100%" height={400} style={{borderRadius:"10%"}} srcset="" />
                        }
                </div>
                <div className="col-md-6">
                  <h5 className='bg-primary p-2 text-light text-center'> Admin Profile</h5>
                  <table className='table table-bordered'>
                     <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{user.name}</td>
                      </tr>
                      <tr>
                        <th>User Name</th>
                        <td>{user.username}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td>{user.phone}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <th colSpan={2}><Link to='/update-profile' className='btn btn-primary w-100 '>Update Profile</Link></th>
                      </tr>
                     </tbody>
                  </table>
                </div>
            </div>
            
        </div>
     </div>
  </div>
    </>
  )
}
