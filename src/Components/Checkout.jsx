import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../Store/ActionCreators/CartActionCreators'
import { Link, useNavigate } from 'react-router-dom'
import ProfileTable from './Partials/ProfileTable'


export default function Checkout() {
    let [user, setUser] = useState({}) 
    let [subtotal,setSubtotal]=useState(0)
    let [shipping, setShipping]=useState(0)
    let [total , setTotal]=useState(0)
    let [cart, setCart]= useState([])

    let dispatch =useDispatch()
    let navigate =useNavigate()
    let CartStateData =useSelector((state)=>state.CartStateData)
    
    // Get Card data  and Calcutale  Shpiiing price, total price
    useEffect(()=>{
        (()=>{
            dispatch(getCart())
        if(CartStateData.length){
            let data=CartStateData.filter((x)=>x.user===localStorage.getItem("userid"))
            setCart(data)
            let sum=0
            for(let item of data){
                sum=sum+item.total
            }
            setSubtotal(sum)
            if(sum>0 && sum<1000){
                setShipping(60)
                setTotal(sum+60)
            }  
            else {
                setTotal(sum)
                setShipping(0)  
            }
            
        }
            
        else
        setCart([])
        })()
    },[CartStateData.length])

//  API call Get User Data 
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
    <div className="container-fluid my-3">
        <div className="row">
        <div className="col-md-6"><ProfileTable title="Billing Address" user={user}/></div>
        <div className='col-md-6'>
         <h5 className='bg-warning text-center p-2'>Items In Your Cart</h5>
        <div className="table-responsive">
                        <table className='table table-bordered border-dark'>
                            <thead>
                                <tr>
                                   <th></th>
                                   <th>Name</th>
                                   <th>Price</th>
                                   <th>QTY</th>
                                   <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                cart.map((item, index)=>{
                                    return( <tr key={index}>
                                        <td><a href={item.pic} target='_blank'>
                                           <img src={item.pic} alt="item image" width={50} height={50}/>
                                            </a>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>&#8377;{item.price}</td>
                                        <td>{item.qty}</td>
                                        <td>&#8377;{item.total}</td>
                                    </tr>
                                    )
                                })
                               }
                            </tbody>
                        </table>

                        <table className="table table-bordered  border-dark">
                                <thead>
                                     <tr>
                                        <th>SubTotal</th>
                                        <td>&#8377;{subtotal}</td>
                                     </tr>
                                     <tr>
                                        <th>Shipping</th>
                                        <td>{subtotal>0 && subtotal<1000?<p>&#8377;{shipping}</p>:<b className='text-success'>Free Delivery</b> } </td>
                                         {/* <td>{shipping}</td> */}
                                         </tr>
                                     <tr>
                                        <th>Total</th>
                                        <td>&#8377;{total}</td>
                                     </tr>
                                     <tr>
                                        <th colSpan={2}><Link to="/checkout" className='btn btn-warning w-100'>Proceed To Checkout</Link></th>
                                     </tr>
                                </thead>
                            </table>
                </div>
        </div>
        </div>
    </div>
    </>

)
}
