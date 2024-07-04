import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {createContactUs} from '../Store/ActionCreators/ContactUsActionCreators'
import FormValidation from './Validators/FormValidation'

export default function Contact() {
  var [data, setData]=useState({
    name:"",
    email:"",
    phone:"",
    subject:"",
    message:""
  })

  var [errorMessage,setErrorMessage]=useState({
    name:"Name is Field Required",
    email:"Email is Field Required",
    phone:"Phone is Field Required",
    subject:"Subject is Field Required",
    message:"Message is Field Required",
  })
  let [message,setMessage]=useState("")
  let [show ,setShow]=useState(false)
  let dispatch =useDispatch()

  function inputData(e) {
    let { name, value } = e.target;
      setErrorMessage((old)=>{
        return{
          ...old,
          [name]:FormValidation(e)
        }
      });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  function postData(e) {
    e.preventDefault();
   let error = Object.values(errorMessage).find((x)=>x.length>0)
   if(error)
    setShow(true)
  else{
    dispatch(createContactUs({...data, date:new Date(), active:true}))
    setData({
      name:"",
      email:"",
      phone:"",
      subject:"",
      message:""
    })
    setMessage("Thanks you to share Your Query with us ,Our team Will Contact You Soon")
  }
  }
  return (
    <>
    {/* <!-- Contact Start --> */}
    <div className="container-xxl py-5">
      <div className="container">
      <div className="wow fadeInUp mb-5" data-wow-delay="0.1s">
            <div className="row g-4 align-items-center">
              <div className="col-sm-6">
                <img className="img-fluid" src='/img_banner/img2.jpg' style={{height:250, width:"80%"}} alt="contact/images" />
              </div>
              <div className="col-sm-6">
                <h3 className="mb-0">FashionShop</h3>
                <h6>Contact Details</h6>
                <p style={{textAlign:"justify"}}>
                If you require any further information, please feel free to reach out to me. <b>If I can be of any help,</b> please do not hesitate to <b>contact me </b>. Please let me know if you have further questions on this matter.  <br />
                we established this secure connection in case he ever had a need to contact us. If you have any comments or questions about this website or <b>fashionShop</b> in general, feel free to contact us.
                </p>
                  <div className="d-flex justify-content-between">
                  <p className="mb-0"><i className='fa fa-phone'></i>    < a href="tel:+918392823395">+91 8392823395</a></p>
                  <p className="mb-0"><i className='fa fa-envelope'></i>   <a href="mailto:akumarrai45@gmail.com">akumarrai45@gamil.com</a></p>
                  </div>
              </div>
            </div>
          </div>
        <div className="row g-5">
         
          <div
            className="col-lg-6 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{minHeight: "450px"}}
          >
            <div className="position-relative h-100">
            <div style={{overflow:"hidden", maxWidth:"100%", width:"500px", height:"400px"}}>
              <div id="canvas-for-googlemap" style={{height:"100%", width:"100%", maxWidth:"100%"}}>
                <iframe style={{height:"100%", width:"100%", border:"0"}} frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=a-43,+sector-16+noida&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8">
                </iframe>
                </div>
                <a className="embed-map-html" rel="nofollow" href="https://www.bootstrapskins.com/themes" id="authmaps-data">premium bootstrap themes</a>
                {/* <style>#canvas-for-googlemap img{max-height:none;max-width:none!important;background:none!important;}</style> */}
                </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="border-start border-5 border-primary ps-4 mb-5">
              <h6 className="text-body text-uppercase mb-2">Contact Us</h6>
              <h5 className=" mb-0">
                If You Have Any Query, Please Contact Us
              </h5>
            </div>
            {message?<p className='text-success'>{message}</p>:""}
            <form onSubmit={postData}>
              <div className="mb-3">
                  <input type="text"  name='name' onChange={inputData}  value={data.name} className={`form-control border-2 border-primary ${show && errorMessage.name?`border-danger border-2`: `border-primary border-2`}`} placeholder='Full Name' />
                  {show && errorMessage.name?<p className='text-danger'>{errorMessage.name}</p>:""}
              </div>

              <div className="row">
                <div className="col-md-6 mb-2">
                    <div className="mb-2">
                    <input type="text"  onChange={inputData} name='email' value={data.email} className={`form-control border-2 border-primary ${show && errorMessage.email?`border-danger border-2`: `border-primary border-2`}`} placeholder='Email Address' />
                    {show && errorMessage.email?<p className='text-danger'>{errorMessage.email}</p>:""}
                    </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="mb-2">
                  <input type="number"onChange={inputData}   name='phone' value={data.phone} className={`form-control border-2 border-primary ${show && errorMessage.phone?`border-danger border-2`: `border-primary border-2`}`} placeholder='Phone Number' />
                  {show && errorMessage.phone?<p className='text-danger'>{errorMessage.phone}</p>:""}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                  <input type="text"  name='subject' onChange={inputData}  value={data.subject} className={`form-control border-2 border-primary ${show && errorMessage.subject?`border-danger border-2`: `border-primary border-2`}`} placeholder='Subject*' />
                  {show && errorMessage.subject?<p className='text-danger'>{errorMessage.subject}</p>:""}
              </div>

              <div className=" mb-3">
                  <textarea name="message" value={data.message} onChange={inputData} className={`border-2 border-primary form-control ${show && errorMessage.message?'border-danger':'border-primary'}`} placeholder='Message.....'  rows={3}></textarea>
                  {show && errorMessage.message?<p className='text-danger'>{errorMessage.message}</p>:""}
              </div>

              <div className="mb-3">
                <button type='submit' className='btn btn-warning w-100'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- Contact End --> */}
    </>
  )
}
