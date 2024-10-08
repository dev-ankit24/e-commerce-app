import React, { useEffect, useState } from "react";


import SideBar from "../SideBar";

import { updateCheckout} from '../../../Store/ActionCreators/CheckoutActionCreators'
import { useDispatch, } from "react-redux";
import { Link, useParams } from "react-router-dom";
export default function AdminCheckoutShow() {
  let [data, setData] = useState({});
  let [user ,setUser]=useState({})
  let [paymentStatus, setPaymentStatus]=useState("")
  let [oderStatus,setOrderStatus]=useState("")
  let {id} = useParams()


  
  // let CheckoutStateData = useSelector((state)=>state.CheckoutStateData)
  let dispatch=useDispatch()

async function updateData(){
  if(window.confirm("Are You Sure Update Payment or Order Status :"))
    dispatch(updateCheckout({...data, oderStatus:oderStatus, paymentStatus:paymentStatus}))
   setData((old)=>{
    return{
      ...old,
      oderStatus:oderStatus,
      paymentStatus:paymentStatus
    }
   })
}
//get checkout data 
  useEffect(() => {
    (async()=>{
       let response= await fetch("/checkout",{
        method:"GET",
        headers:{
          "content-type":"application/json"
        }
       })
       response= await response.json()
       if(response.length)
        var item= response.find((x)=>x.id===id)
        setOrderStatus(item)
        if(item)
          setData(item)

          // get user data by usr id
          let response1= await fetch("/user/"+item.user,{
            method:"GET",
            headers:{
              "content-type":"application/json"
            }
          })
          response1 = await response1.json()
          setUser(response1)
    })()
  }, [data.length]);

  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-warning text-dark p-2 text-center">
              Checkout Query
              
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <th>User</th>
                    <address>
                    <td>{user.name}<br />
                    {user.phone}<br />{user.email} , <br />
                    {user.address}<br />
                    {user.city},{user.pin}, {user.state}</td><br />
                    </address>
                  </tr>
                  <tr>
                    <th>Order Status</th>
                    <td>{data.oderStatus}
                      {
                        data.oderStatus !=="Delivered"?
                        <>
                        <br />
                        <select name="oderstatus"  value={oderStatus} onChange={(e)=>setOrderStatus(e.target.value)} className="form-select border-2 border-pramary">
                          <option >Order is Placed</option>
                          <option >Order is Packed</option>
                          <option >Order to Ship</option>
                          <option >Out Of Delivery </option>
                          <option >Delivered</option>
                        </select>
                        </>:""
                      }
                    </td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>{data.paymentStatus}
                      {
                        data.paymentStatus !== "Payment Done"?
                        <>
                        <br />
                        <select name="paymentStatus" value={paymentStatus} onChange={(e)=>setPaymentStatus(e.target.value)} className="form-select border-2 border-primary">
                          <option>Pending</option>
                          <option> Payment Done</option>
                        </select>
                        </>:""
                      }
                    </td>
                  </tr>
                  <tr>
                    <th>Payment Mode </th>
                    <td>{data.paymentMode}</td>
                  </tr>
                  <tr>
                    <th>SubTotal </th>
                    <td>&#8377; {data.subtotal} /-</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td> &#8377; {data.shipping} /-</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>&#8377; {data.total} /-</td>
                  </tr>
                  <tr>
                    <th>RPPID</th>
                    <td> {data.rppid}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{new Date(data.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th colSpan={3}>
                    {
                      data.oderStatus !=="Delivered" || data.paymentStatus==="Pending"?
                      <button onClick={updateData} className="btn btn-success w-100">Update</button>
                      :
                      <Link to="/admin/checkout"className="btn btn-warning w-100">Admin Checkout <i className="fa fa-backward"></i></Link>
                    }

                    </th>
                    
                  </tr>
                </tbody>
               </table>   
               <h5 className="text-center p-2 text-light " style={{backgroundColor:"gray"}}>Order Products</h5>
              <table className="table table-bordered">
                <thead>
                    <th>Pic</th>
                    <th> Prodect Name</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th>Total</th>
                </thead>
                <tbody>
                  {
                    data.products?.map((item, index)=>{
                      return <tr key={index}>
                            <td>
                              <a href={item.pic} target="_blank" rel="noreferrer">
                                <img src={item.pic} height={50}width={50} alt="product image" />
                              </a>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.color}</td>
                            <td>{item.size}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                            <td>{item.total}</td>

                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
