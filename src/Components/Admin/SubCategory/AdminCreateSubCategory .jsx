import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Link, json, useNavigate } from "react-router-dom";
import FormValidation from "../../Validators/FormValidation";

import {getSubcategory,createSubcategory} from '../../../Store/ActionCreators/SubCategoryActionCreators'
import { useDispatch, useSelector } from "react-redux";
export default function AdminCreateSubCategory() {
  let [data, setData] = useState({
    name: "",
    active: true,
  });
  let [errorMassage, setErrorMassage] = useState("Name Field is Mendatory");
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let dispatch= useDispatch()
  let SubcategoryStateData = useSelector((state)=>state.SubcategoryStateData)

  // data access in input field.
  function getInputData(e) {
    let { name, value } = e.target;
    if (name === "name") setErrorMassage(FormValidation(e));
    setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "true" ? true : false) : value,
      };
    });
  }
 function postData(e) {
    e.preventDefault();
    //  api call
    if (errorMassage.length) {
      setShow(true);
    }
    // data get and check name
    // let response=await fetch('http://localhost:8000/Subcategory',{
    //   method:"GET",
    //   headers:{
    //     "content-type":"application/json"
    //   },
    //   // body:JSON.stringify({...data})
    // });
    // response = await response.json() 

     else {
      // check name is exit or not  and then show error 
      let item = SubcategoryStateData.find((x) => x.name.toLowerCase() === data.name.toLowerCase());
      if (item) {
        setShow(true);
        setErrorMassage("SubCategory Name is Already Exist");
      }
      // data post (save) in json database
      else{
         //**********    ********** */
        //  response= await fetch("http://localhost:8000/Subcategory/"+id ,{
        //   method:"PUT",
        //   headers:{
        //     "content-type":"application/json"
        //   },
        //   body:JSON.stringify({...data})
        // });
        // response = await response.json()
        dispatch(createSubcategory({ ...data }))
      navigate("/admin/subcategory");
    }
      }
      
  }
  useEffect(()=>{
    (()=>{
    
      // let response=await fetch('http://localhost:8000/Subcategory',{
        //   method:"GET",
        //   headers:{
        //     "content-type":"application/json"
        //   },
        //   // body:JSON.stringify({...data})
        // });
        // response = await response.json() 

      dispatch(getSubcategory())
    })()
  },[SubcategoryStateData.length])
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">
              SubCategory{" "}
              <Link to="/admin/subcategory">
                {" "}
                <i className="fa fa-backward text-light float-end"></i>{" "}
              </Link>
            </h5>

            {/* form create section  */}

            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData} placeholder="SubCategory Name" className={`form-control border border-primary ${show && errorMassage.length?"border-2 border-danger":" border-2 border-primary"}`}
                  />
                  {show && errorMassage.length ? <p className="text-danger text-capitalize">{errorMassage}</p>:"" }
                
                </div>
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select name="active" onChange={getInputData} className="form-select border-2 border-primary" >
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
