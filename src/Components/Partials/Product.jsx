
import React from 'react'
import { Link } from 'react-router-dom'

export default function Product(props){
  return(
  <>
  {/* <!-- Service Start --> */}
  <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-end mb-5">
          <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
            <div className="border-start border-5 border-primary ps-4">
              {
                props.title==="Related Products" ? 
              <h6 className="text-body text-uppercase mb-2"> Other Related Products</h6>:
                 <>
                     <h6 className="text-body text-uppercase mb-2">Our Latest Products</h6>
                     <h3 className=" mb-0">  for {props.title}</h3>
                 </>
                 
              }
          
            </div>
          </div>
        </div>
        <div className="row g-4  justify-content-center">
         {
          props.data && props.data.map((item,index)=>{
            return <div key={index} className=" col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="service-item bg-dark overflow-hidden h-100">
                     < img className="img-fluid" src={item.pic[0]} style={{height:200, width:"100%" }} alt="" />
                      <div className="   position-relative text-center h-100 p-4 " style={{ backgroundColor:"#eeeeee"  }}>
                     <h4 className="mb-3 " style={{height:50}}>{item.name}</h4>
                   <p style={{color:"black", fontSize:"19px", fontWeight:700}}><del className='text-danger mx-4'>&#8377; {item.basePrice}</del>&#8377;{item.finalPrice}<sup className='text-success fs-6'>{item.discount}% Off</sup></p>
                   <p style={{color:"black" }}> {item.quantity} In Stock</p>
                  <Link to={`/products/${item.id}` } className='btn btn-warning  w-100'>Add to Card</Link>
                </div>
              </div>
            </div>
          } )
          }
        
        </div>
      </div>
    </div>
    
  </>
  
    
  
  )
}
 