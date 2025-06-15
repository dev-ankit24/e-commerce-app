import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { deleteCart, getCart, updateCart } from '../Store/ActionCreators/CartActionCreators'
import { Link } from 'react-router-dom'


export default function Cart() {
    let [subtotal,setSubtotal]=useState(0)
    let [shipping, setShipping]=useState(0)
    let [total , setTotal]=useState(0)
    let [cart, setCart]= useState([])

    let dispatch =useDispatch()
    let CartStateData =useSelector((state)=>state.CartStateData)

        useEffect(() => {
        dispatch(getCart())
    }, [])

    // ✅ Recalculate data when CartStateData updates
    useEffect(() => {
        getAPIData()
    }, [CartStateData])


     // Delete Product from Wishlist Table
     function deleteData(id) {
        if (window.confirm("You Are Sure to Remove Product from Cart : ")) {
         dispatch(deleteCart({id:id}))
          getAPIData();
        }
      }

    //   update quantity  and price
    function updateData(id,option){

        let item=cart.find((x)=>x.id===id)
        if(item.qty===1 && option==="DEC")
            return 
        else if(option==="DEC"){
            item.qty=item.qty-1
            item.total=item.total-item.price
        }
        else {
            if(item.qty<item.stockQuantity){
                item.qty=item.qty+1
                item.total=item.total+item.price
            }
           
        }
        dispatch(updateCart({...item}))
        getAPIData()
    }
   
    // Get Card data  and Calcutale shiiping Price , Total price
    // function getAPIData(){
    //     dispatch(getCart())
    //     if(CartStateData.length){
    //         let data=CartStateData.filter((x)=>x.user===localStorage.getItem("userid"))
    //         setCart(data)
    //         let sum=0
    //         for(let item of data){
    //             sum=sum+item.total
    //         }
    //         setSubtotal(sum)
    //         if(sum>0 && sum<1000){
    //             setShipping(60)
    //             setTotal(sum+60)
    //             console.log(total);
                
    //         }  
    //         else {
    //             setTotal(sum)
    //             console.log(total,"else");
                
    //             setShipping(0)  
    //         }
            
    //     }
            
    //     else
    //     setCart([])
    // }
    function getAPIData() {
  if (CartStateData.length) {
    const userId = localStorage.getItem("userid");
    let data = CartStateData.filter(x => x.user === userId);
    setCart(data);

    let sum = 0;
    for (let item of data) {
      sum += item.total;
    }
    setSubtotal(sum);

    const shipping = (sum > 0 && sum < 1000) ? 60 : 0;
    setShipping(shipping);
    setTotal(sum + shipping);
  } else {
    setCart([]);
    setSubtotal(0);
    setShipping(0);
    setTotal(0);
  }
}



  return (
    <>
    <div className="container-fluid my-3">
        <h5 className='text-center bg bg-warning p-2'><i>Cart Section</i></h5>
    {
       
       
       
       cart.length?
                    <>
                    <div className="table-responsive">
                        <table className='table table-bordered border-primary'>
                            <thead>
                                <tr>
                                   <th></th>
                                   <th>Name</th>
                                   <th>Brand</th>
                                   <th>Color</th>
                                   <th>Size</th>
                                   <th>Price</th>
                                   <th></th>
                                   <th>QTY</th>
                                   <th></th>
                                   <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                cart?.map((item, index)=>{
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
                                        <td><button className='btn btn-primary' onClick={()=>updateData(item.id,"DEC")}><i className='fa fa-minus'></i></button></td>
                                        <td>{item.qty}</td>
                                        <td><button className='btn btn-primary' onClick={()=>updateData(item.id,"INC")}><i className='fa fa-plus'></i></button></td>
                                    
                                        <td>&#8377;{item.total}</td>
                                        <td><button className=' btn btn-danger' onClick={()=>deleteData(item.id)}><i className='fa fa-trash fs-4'></i></button></td>

                                    
                                    </tr>
                                    )
                                })
                               }
                            </tbody>
                        </table>

                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                            <table className="table table-bordered border-primary">
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
                    </>
                    :
                    <div className="text-center">
                        <h5>No Item in Cart</h5>
                        <Link to='/shop' className='btn btn-primary'>Shop Now</Link>
                    </div>
                   
                }
    </div>
    </>
  )
}
