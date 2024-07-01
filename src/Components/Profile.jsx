import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileTable from './Partials/ProfileTable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWishlist, getWishlist } from '../Store/ActionCreators/WishlistActionCreators'
import { getCheckout} from '../Store/ActionCreators/CheckoutActionCreators'


function Profile() {
    let [user, setUser] = useState({}) 
    let [wishlist, setWishlist]= useState([])
    let [orders,setOrders]=useState([])

    let dispatch =useDispatch()
    let navigate = useNavigate()

    let WishlistStateData =useSelector((state)=>state.WishlistStateData)
    let CheckoutStateData =useSelector((state)=>state.CheckoutStateData)

    // Api CAll By Get User data
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

       // Delete Product from Wishlist Table
       async function deleteData(id) {
        if (window.confirm("You Are Sure to Delete Product from Wishlist : ")) {
         dispatch(deleteWishlist({id:id}))
          getAPIData();
        }
      }

    // Get wishlist data 
    function getAPIData(){
        dispatch(getWishlist())
        if(WishlistStateData.length)
            setWishlist(WishlistStateData.filter((x)=>x.user===localStorage.getItem("userid")))
        else
        setWishlist([])
    }
    useEffect(()=>{
        (()=>{
            getAPIData()
        })()
    },[WishlistStateData.length])

    // get checkout and check condition
    useEffect(()=>{
        (()=>{
            dispatch(getCheckout())
            if(CheckoutStateData.length)
            setOrders(CheckoutStateData.filter((x)=>x.user===localStorage.getItem("userid")))
        })()
    },[CheckoutStateData.length])

 
    
    return (
             <>
             
             <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-6">
                        {
                            user.pic?
                            <img src={user.pic} alt="user-image" height={400} width="100%"  /> :
                            <img src="/img/anuj.jpg" alt="user-image" width="100%" height={400} style={{borderRadius:"10%"}} srcset="" />
                        }
                    </div>
                    <div className="col-md-6">
                        <ProfileTable title={"Buyer Profile"} user={user}/>
                    </div>
                </div>
                {
                    wishlist.length?
                    
                    <div className="table-responsive ">
                        <h5 className='bg-primary text-center text-light'> Your Wishlist Section</h5>
                        <table className='table table-bordered border-dark'>
                            <thead>
                                <tr>
                                   <th>Image</th>
                                   <th>Name</th>
                                   <th>Brand</th>
                                   <th>Color</th>
                                   <th>Size</th>
                                   <th>Price</th>
                                   <th></th>
                                   <th></th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                wishlist.map((item, index)=>{
                                    return( <tr key={index}>
                                        <td><a href={item.pic} target='_blank'>
                                           <img src={item.pic} alt="item image" width={50} height={50}/>
                                            </a>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.color}</td>
                                        <td>{item.size}</td>
                                        <td>&#8377;{item.price}</td>
                                        <td><Link to={`/products/${item.product}`} className='btn btn-primary '><i className='fa fa-shopping-cart fs-4    '></i></Link></td>
                                        <td><button className=' btn btn-danger' onClick={()=>deleteData(item.id)}><i className='fa fa-trash fs-4'></i></button></td>
                                    </tr>
                                    )
                                })
                               }
                            </tbody>
                        </table>

                    </div>:
                    <div className="text-center mx-2" >
                        <h5 className='bg-primary  text-light'>No Item in Wishlist</h5>
                        <Link to='/shop' className='btn btn-primary' style={{marginBottom:"20px"}}>Shop Now</Link>
                    </div>   
                }

                {/* user order histry and trackout your product*/}
                {
                    orders.length?
                    orders.map((item,index)=>{
                        return <div className="row" key={index}>
                    <h5 className='bg-warning text-center text-dark  text-light'> Your Order History Section</h5>

                        <div className="col-md-3">
                            <table>
                                <tr>
                                    <th>Order Id</th>
                                    <td>{item.id}</td>
                                </tr>
                                <tr>
                                    <th>Product Status</th>
                                    <td>{item.oderStatus}</td>
                                </tr>
                                <tr>
                                    <th>Payment Mode</th>
                                    <td>{item.paymentMode}</td>
                                </tr>
                                <tr>
                                    <th>Payment Status</th>
                                    <td>{item.paymentStatus}</td>
                                </tr>
                                <tr>
                                    <th>SubTotal</th>
                                    <td>{item.subtotal}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="col-9"></div>
                    </div>
                    })
                    :
                <div className="text-center">
                    <h5 className='bg-primary  text-light'>No Item in Wishlist</h5>
                    <Link to='/shop' className='btn btn-warning'>Shop Now</Link>
                </div>
                }
             </div>
             </>
    )
}

export default Profile