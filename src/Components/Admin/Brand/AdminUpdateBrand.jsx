import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Link, json, useNavigate, useParams } from "react-router-dom";

import FormValidation from "../../Validators/FormValidation";
import imageValidation from "../../Validators/ImageValidation";

import { getBrand,updateBrand } from "../../../Store/ActionCreators/BrandActionCreators";
import { useDispatch, useSelector } from "react-redux";
export default function AdminUpdateBrand() {
  let {id}=useParams()
  // let [Brand,setBrand]=useState([])
  let [data, setData] = useState({
    name: "",
    pic:"",
    active: true,
  });

  let [errorMassage, setErrorMassage] = useState({
    name:"",
    pic:"" 
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch()
  let BrandStateData = useSelector((state)=>state.BrandStateData)


  // data access in input field.
  function getInputData(e) {
    let name = e.target.name
    let value  = e.target.files ? "/brands/"+e.target.files[0].name :e.target.value
    if (name === "name" || name ==="pic"){
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

    //  //  api call data get and check name 
    // let response=await fetch('http://localhost:8000/Brand',{
    //   method:"GET",
    //   headers:{
    //     "content-type":"application/json"
    //   },
    //   // body:JSON.stringify({...data})
    // });
    // response = await response.json()

     else {
      // check name is exit or not  and then show error 
      let item = BrandStateData.find((x) => x.name.toLowerCase() === data.name.toLowerCase());
      if (item && item.id !==id) {
        setShow(true);
        setErrorMassage((old)=>{
          return{
            ...old,
            name: "Brand Name is Already Exist"
          }
        });
      }
      // data post (save) in json database
      else{
        //**********    ********** */
        // let response= await fetch("http://localhost:8000/Brand/"+id ,{
        //   method:"PUT",
        //   headers:{
        //     "content-type":"application/json"
        //   },
        //   body:JSON.stringify({...data})
        // });
        // response = await response.json()
      dispatch(updateBrand({ ...data }))
      navigate("/admin/brand");
    }
      }
      
  }
  useEffect(()=>{
    // selfInvolve function call and API call 
    (()=>{
      dispatch(getBrand())
      if(BrandStateData.length){
        let item=BrandStateData.find((x)=>x.id===id)
        if (item){
          setData({...item})
      }
      // setBrand(BrandStateData)
      
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
              Brand{" "}
              <Link to="/admin/brand">
                {" "}
                <i className="fa fa-backward text-light float-end"></i>{" "}
              </Link>
            </h5>

            {/* form create section  */}

            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                <input  type="text"  name="name"  value={data.name}  onChange={getInputData}  placeholder="Brand Name"  className={`form-control border border-primary ${show && errorMassage.name?"border-2 border-danger":" border-2 border-primary"}`}
                  />
                  {show && errorMassage.length ? <p className="text-danger text-capitalize">{errorMassage} </p>:"" }
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pic</label>
                  <input type="file" name="pic" onChange={getInputData} className={`form-control border border-primary ${show && errorMassage.pic?"border-2 border-danger":" border-2 border-primary"}`} />
                  {show && errorMassage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMassage.pic}
                    </p>
                  ) : (
                    ""
                  )}
                 
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
