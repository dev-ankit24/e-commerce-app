import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Link, json, useNavigate, useParams } from "react-router-dom";

import FormValidation from "../../Validators/FormValidation";
import imageValidation from "../../Validators/ImageValidation";

import { getTestimonial,updateTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators";
import { useDispatch, useSelector } from "react-redux";
export default function AdminUpdateTestimonial() {
  let {id}=useParams()
  // let [Testimonial,setTestimonial]=useState([])
  let [data, setData] = useState({
    name: "",
    pic:"",
    message:  "",
    active: true,
  });

  let [errorMassage, setErrorMassage] = useState({
    name:"",
    message:"",
    pic:"" 
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch()
  let TestimonialStateData = useSelector((state)=>state.TestimonialStateData)


  // data access in input field.
  function getInputData(e) {
    let name = e.target.name
    let value  = e.target.files ? "/testimonials/"+e.target.files[0].name :e.target.value
    if (name !== "active"){
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
    // console.log(data)
    let error= Object.values(errorMassage).find((x)=>x.length >0)
    if (error) 
      setShow(true);
    
      // data post (save) in json database
     else{
      
        dispatch(updateTestimonial({ ...data }))
      navigate("/admin/testimonial");
    }
      
  }
  useEffect(()=>{
    // selfInvolve function call and API call 
    (()=>{
      dispatch(getTestimonial())
      if(TestimonialStateData.length){
        let item=TestimonialStateData.find((x)=>x.id===id)
        if (item){
          setData({...item})
      }
      // setTestimonial(TestimonialStateData)
      
      }
    })()
  },[])
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
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={getInputData}
                    placeholder="Testimonial Name"
                    className="form-control"
                  />
                  {show && errorMassage.length ? 
                    <p className="text-danger text-capitalize">
                      {errorMassage}
                    </p>
                  : 
                    ""
                  }
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pic</label>
                  <input type="file" name="pic" onChange={getInputData} className="form-control" />
                  {show && errorMassage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMassage.pic}
                    </p>
                  ) : (
                    ""
                  )}
                 
                </div>
                <div className="mb-3">
              <label>Message</label>
                <textarea name="message" placeholder="Message....." onChange={getInputData} className="form-control" rows={3} value={data.message}/>
              </div>

                <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    value={data.active}
                    onChange={getInputData}
                    className="form-select"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
                </div>
               
              <div className="mb-3">
                <button type="submit" className="btn btn-primary p-2 w-100">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
