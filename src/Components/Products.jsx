import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProduct } from '../Store/ActionCreators/ProductActionCreators'
import  Product     from  '../Components/Partials/Product'
import { useParams } from 'react-router-dom'

export default function Products() {
  let {id}=useParams()
  let [product,setProduct]=useState({})
  let [relatedProduct,setRelatedProduct]= useState([]);
  let [qty,setQty]=useState(1)

  let dispatch =useDispatch()
  let ProductStateData= useSelector((state)=>state.ProductStateData)

  useEffect(()=>{
    (()=>{
      dispatch(getProduct())
      if(ProductStateData.length){
      let item = ProductStateData.find((x)=>x.id===id)
        setProduct(item)
        setRelatedProduct(ProductStateData.filter((x)=>x.maincategory===item.maincategory))
      }
      
    })()
  }, [ProductStateData.length,id])
  return (
       <>
       <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={product.pic&& product.pic[0]} style={{height:550, width:"100%"}} class="d-block w-100" alt="..."/>
                </div>
                {
                  product.pic && product.pic.slice(1).map((item,index)=>{
                    return <div class="carousel-item" >
                          <img src={item} style={{height:550, width:"100%"}} class="d-block w-100" alt="..."/>

                  </div>
                  })
                }
                
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
         </div>
          </div>
          {/* Product  Table   */}
          <div className="col-md-6">
            <h4 className='text-center p-2 bg-primary text-light'>{product.name}</h4>
            <table className=' table table-bordered'>
              <tbody>
                <tr>
                  <th>Maincategory</th>
                  <td>{product.maincategory}</td>
                </tr>
                <tr>
                  <th>Subcategory</th>
                  <td>{product.subcategory}</td>
                </tr>
                <tr>
                  <th>Brand</th>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <th>Color/Size</th>
                  <td>{`${product.color} / ${product.size}`}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td><p><del className='text-danger mx-2'>&#8377;{product.basePrice}</del>  &#8377; {product.finalPrice}<sup className='text-success'>{product.discount}% Off</sup></p></td>
                </tr>
                <tr>
                  <th>Stock</th>
                  <td><strong>{product.quantity} </strong> Quanity Left In Stock</td>
                </tr>
                <tr>
                  <th colSpan={2}>
                   {
                    product.stock ?
                    <>
                     <p>
                      <button className='btn btn-primary'><i className='fa fa-minus' onClick={()=>qty>1?setQty(qty -1):""}></i></button>
                      <strong className='mx-3'>{qty}</strong>
                      <button className='btn btn-primary'><i className='fa fa-plus' onClick={()=>qty<product.quantity?setQty(qty+1):""}></i></button>
                    </p>
                    <div className="btn-group">
                      <button className='btn btn-primary'><i className='fa fa-shopping-cart'></i> Add To Cart</button>
                      <button className='btn btn-warning  mx-3'><i className='fa fa-heart text-danger fs-4'></i> Add To Wishlist</button>
                    </div>
                    </>:
                      <button className='btn btn-warning  mx-3'><i className='fa fa-heart text-danger fs-4'></i> Add To Wishlist</button>

                   }

                  </th>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>
                    <div dangerouslySetInnerHTML={{__html:product.description}}/>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
        <Product title={"Related Products"} data={relatedProduct.slice(0,12)}/>
       </div>
       </>
  )
}
