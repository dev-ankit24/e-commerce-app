import React, { useEffect } from 'react'
import Testimonial from './Partials/Testimonial'
import AboutContact from './Partials/AboutContact'
import Product from './Partials/Product'
import { Link } from 'react-router-dom'

// get data 
import {getMaincategory} from '../Store/ActionCreators/MainCategoryActionCreators'
import {getProduct} from '../Store/ActionCreators/ProductActionCreators'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  let dispatch =useDispatch()
  let MaincategoryStateData=useSelector((state)=>state.MaincategoryStateData)
  let ProductStateData = useSelector((state)=>state.ProductStateData)

  useEffect(()=>{
    (()=>{
     dispatch(getProduct())
    })()
  },[ProductStateData.length])
useEffect(()=>{
  (()=>{
    dispatch(getMaincategory())
  })()
},[MaincategoryStateData.length])
  return (

<>
{/* <!-- Carousel Start --> */}
    <div className="container-fluid p-0  wow fadeIn" data-wow-delay="0.1s">
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="w-100" src="/img_banner/slider.5.webp" style={{height:425}} alt="Image" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                    <h5 className="text-light text-uppercase mb-3 animated slideInDown">Welcome to fashionShop</h5>
                    <h1 className=" text-light mb-3 animated slideInDown">Leatest and Branded Product for Girl</h1>
                    <ol className="breadcrumb mb-4 pb-2">
                      <li className="breadcrumb-item fs-5 text-light"> Jeans</li>
                      <li className="breadcrumb-item fs-5 text-light">Shirt</li>
                      <li className="breadcrumb-item fs-5 text-light"> Trousers </li>
                      <li className="breadcrumb-item fs-5 text-light"> T-Shirt</li>
                      <li className="breadcrumb-item fs-5 text-light"> More..</li>
                    </ol>
                    <Link to="/shop?mc=Girl" className="btn btn-primary py-3 px-5" >Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          <div className="carousel-item">
            <img className="w-100" src="/img_banner/slider.77.jpeg" style={{height:425}}  alt="Image" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                    <h5 className="text-light text-uppercase mb-3 animated slideInDown"> Welcome To fashion Shop</h5>
                    <h1 className="text-light mb-3 animated slideInDown"> Leatest and Branded Product for Women</h1>
                    <ol className="breadcrumb mb-4 pb-2">
                    <li className="breadcrumb-item fs-5 text-light"> Jeans</li>
                      <li className="breadcrumb-item fs-5 text-light">Shirt</li>
                      <li className="breadcrumb-item fs-5 text-light"> Trousers </li>
                      <li className="breadcrumb-item fs-5 text-light"> T-Shirt</li>
                      <li className="breadcrumb-item fs-5 text-light"> More..</li>
                    </ol>
                    <Link to="/shop?mc=Men"className="btn btn-primary py-3 px-5" >Shop Now</Link>               
                   </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="w-100" src="/img_banner/slider88.jpeg" style={{height:425}} alt="Image" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                    <h5 className="text-light text-uppercase mb-3 animated slideInDown"> Welcome To fashion Shop</h5>
                    <h1 className=" text-light mb-3 animated slideInDown"> Leatest and Branded Product for Men</h1>
                    <ol className="breadcrumb mb-4 pb-2">
                    <li className="breadcrumb-item fs-5 text-light"> Jeans</li>
                      <li className="breadcrumb-item fs-5 text-light">Shirt</li>
                      <li className="breadcrumb-item fs-5 text-light"> Trousers </li>
                      <li className="breadcrumb-item fs-5 text-light"> T-Shirt</li>
                      <li className="breadcrumb-item fs-5 text-light"> More..</li>
                    </ol>
                    <Link to="/shop?mc=Women" className="btn btn-primary py-3 px-5" >Shop Now</Link>               
                   </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="w-100" src="/img_banner/slider99.jpeg" style={{height:425}} alt="Image" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                    <h5 className="text-light text-uppercase mb-3 animated slideInDown"> Welcome To fashion Shop</h5>
                    <h1 className=" text-light mb-3 animated slideInDown"> Leatest and Branded Product for Kids</h1>
                    <ol className="breadcrumb mb-4 pb-2">
                      <li className="breadcrumb-item fs-5 text-light"> Jeans</li>
                      <li className="breadcrumb-item fs-5 text-light">Shirt</li>
                      <li className="breadcrumb-item fs-5 text-light"> Trousers </li>
                      <li className="breadcrumb-item fs-5 text-light"> T-Shirt</li>
                      <li className="breadcrumb-item fs-5 text-light"> More..</li>
                    </ol>
                    <Link to="/shop?mc=Kids" className="btn btn-primary py-3 px-5" >Shop Now</Link>               
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button type="button" data-bs-target="#header-carousel" data-bs-slide="next" className="carousel-control-next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    {/* <!-- Carousel End --> */}

{
  MaincategoryStateData.length && ProductStateData.length && MaincategoryStateData.map((item,index)=>{
    return <Product key={index} data={ProductStateData.filter((x)=>x.maincategory === item.name).slice(0,12)} title={item.name} />})
}
<AboutContact/>
<Product data={ProductStateData.slice(0,36)} title={"All Category Products"}/ >
<Testimonial/>
</>
  )
}
