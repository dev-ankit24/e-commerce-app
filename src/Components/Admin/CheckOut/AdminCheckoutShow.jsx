import React, { useEffect, useState } from "react";


import SideBar from "../SideBar";

import {getCheckout, updateCheckout} from '../../../Store/ActionCreators/CheckoutActionCreators'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function AdminChekoutShow() {
  let [data, setData] = useState({});
  let {id} = useParams()
  let navigate =useNavigate()

  
  let CheckoutStateData = useSelector((state)=>state.CheckoutStateData)
  let dispatch=useDispatch()

  // Detele data table
 async function deleteData() {
    if (window.confirm("You Are Sure to Delete That Item : ")) {
      navigate("/admin/contact")
    
    }
  }
async function updateData(){
  if(window.confirm("Are You Sure Update This Item:"))
    dispatch(updateCheckout({...data, active:false}))
   setData((old)=>{
    return{
      ...old,
      active:false
    }
   })
}

  useEffect(() => {
    (()=>{
      dispatch(getCheckout())
      if(CheckoutStateData.length){
        let item= CheckoutStateData.find((x)=>x.id===id)
        if(item)
           setData(item)
      }
    })()
  }, [CheckoutStateData.length]);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-warning text-dark p-2 text-center">
              Checkout Query{" "}
              
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{data.phone}</td>
                  </tr>
                  <tr>
                    <th>Subject</th>
                    <td>{data.subject}</td>
                  </tr>
                  <tr>
                    <th>Message</th>
                    <td>{data.message}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{new Date(data.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>Active</th>
                    <td>{data.active?<span className="text-success"> Yes</span>:<span className="text-danger">No</span>}</td>
                  </tr>
                  <tr>
                    <th colSpan={3}>
                    {
                      data.active?
                      <button onClick={updateData} className="btn btn-success w-100">Update Status</button>:
                      <button onClick={deleteData} className="btn btn-danger w-100">Delete</button>
                    }

                    </th>
                    
                  </tr>
                </tbody>
               </table>              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
