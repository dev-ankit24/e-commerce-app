import React, { useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {getTestimonial} from '../../Store/ActionCreators/TestimonialActionCreators'
import { useDispatch, useSelector } from 'react-redux';
export default function Testimonial() {
  let dispatch = useDispatch()
  let TestimonialStateData=useSelector((state)=>state.TestimonialStateData)
  let option={
    loop:true, 
    items:1,
    nav:true,
    dots:false,
    autoplay:true ,
    navText:["<button class='my-owl-btn'><i class='fa fa-less-than'></i></button>", "<button class='my-owl-btn'><i class='fa fa-less-than'></i></button>"]
  }
  useEffect(()=>{
    (()=>{
      dispatch(getTestimonial())
    })()
  },[TestimonialStateData.length])
  return (
    <>
    {/* <!-- Testimonial Start --> */}
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="border-start border-5 border-primary ps-4 mb-5">
              <h6 className="text-body text-uppercase mb-2">Testimonial</h6>
              <h1 className="display-6 mb-0">What Our Happy Clients Say!</h1>
            </div>
            <p className="mb-4">
              Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
              ipsum et lorem et sit, sed stet lorem sit clita duo justo magna
              dolore erat amet
            </p>
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa fa-users fa-2x text-primary flex-shrink-0"></i>
                  <h1 className="ms-3 mb-0">10,000+</h1>
                </div>
                <h5 className="mb-0">Happy Clients</h5>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa fa-check fa-2x text-primary flex-shrink-0"></i>
                  <h1 className="ms-3 mb-0">1000+</h1>
                </div>
                <h5 className="mb-0">Products </h5>
              </div>
            </div>
          </div>
          <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.5s">
            <div className="testimonial-carousel">

              {/* npm insall carousel  */}
              <OwlCarousel className='' {...option}>
              {
                TestimonialStateData.length && TestimonialStateData.map((item,index)=>{
                  return <div key={index} className="testimonial-item">
                  <img className=" mb-4" style={{height:100, width:100}} src={item.pic} alt="image" />
                  <p className="fs-5 testimonial-message">{item.message}</p>
                  <div  className="bg-primary mb-3"  style={{width: "60px" , height: "5px"}}></div>
                  <h5>{item.name}</h5>
                </div>
                })
              }
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- Testimonial End --> */}
    </>
  )
}
