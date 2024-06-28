import React, {useState } from "react";
import SideBar from "../SideBar";
import { Link, useNavigate } from "react-router-dom";
import FormValidation from "../../Validators/FormValidation";
import imageValidation from "../../Validators/ImageValidation";

import {createTestimonial} from '../../../Store/ActionCreators/TestimonialActionCreators'
import { useDispatch } from "react-redux";

export default function AdminCreateTestimonial() {
  let [data, setData] = useState({
    name: "",
    pic:"",
    message:"",
    active: true,
  });
  let [errorMassage, setErrorMassage] = useState({
    name:"Name Field is Mendatory",
    pic:"Pic File is Mendatory",
    message :"Massage is Mendatory"
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let dispatch= useDispatch()
 

  // data access in input field.
  function getInputData(e) {
    let name = e.target.name
    let value  = e.target.files ? "/testimonials/" +e.target.files[0].name :e.target.value
    if (name!=="active"){
      setErrorMassage((old)=>{
        return{
          ...old,
          [name]:e.target.files ? imageValidation(e): FormValidation(e)
        }
    })
    } 
     
    setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "true" ? true : false) : value,
      };
    });
  }
 function postData(e) {
    e.preventDefault();
    let error= Object.values(errorMassage).find((x)=>x.length >0)
    if (error) 
      setShow(true);
    
      // data post (save) in json database
     else{
      
        dispatch(createTestimonial({ ...data }))
       navigate("/admin/testimonial");
    }
      
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">
              Testimonial{" "}
              <Link to="/admin/testimonial">
                {" "}
                <i className="fa fa-backward text-light float-end"></i>{" "}
              </Link>
            </h5>

            {/* form create section  */}

            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData}placeholder="TestimonialName"className="form-control border border-primary" />
                  {show && errorMassage.name ? <p className="text-danger text-capitalize">{errorMassage.name}</p>:""}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
                  <input type="file" name="pic" onChange={getInputData} className="form-control border border-primary" />
                  {show && errorMassage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMassage.pic}
                    </p>
                  ) : (
                    ""
                  )}
                 
                </div>
              </div>
              <div className="mb-3">
              <label>Message</label>
                <textarea name="message" placeholder="Message....." onChange={getInputData} className="form-control" rows={3}/>
                {show && errorMassage.message ?<p className="text-danger text-capitalize">{errorMassage.message}</p>: "" }
              </div>
              <div className="row">
              <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    onChange={getInputData}
                    className="form-select"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary p-2 w-100">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
