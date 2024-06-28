import React, { useEffect, useState } from "react";
import FormValidation from "./Validators/FormValidation";
import {  useNavigate } from "react-router-dom";
import imageValidation from "./Validators/ImageValidation";
export default function UpdateProfile() {
  let [data, setData] = useState({
    name: "",
    phone: "",
    address:"",
    city:"",
    pin:"",
    state:"",
    pic:""

  });
  let [errorMassage, setErrorMassage] = useState({
    name: "",
    phone: "",
    pic:""
  });
  let navigate = useNavigate();
  let [show,setShow]=useState(false)

  function getInputData(e) {
    let name = e.target.name
    let value  = e.target.files ? "/products/" +e.target.files[0].name :e.target.value
    if (name === "name" || name ==="pic" || name==="phone"){
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
  async function postData(e) {
    e.preventDefault();
          // post data   by post method in json database file
         let response = await fetch("/user/"+localStorage.getItem("userid"), {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({...data}),
          });
          response = await response.json();
            if (response) 
                if(localStorage.getItem("role")==="Admin")
                  navigate("/admin")
                else
                navigate("/profile")
            else 
              alert("something went wrong");  
}
useEffect(()=>{
  ( async ()=>{
      let response= await fetch("/user",{
          method:"GET",
          headers:{
              "content-type":"application/json"
          }
      })
      response= await response.json()
      let item = response.find((x)=>x.id===localStorage.getItem("userid"))
      if(item)
          setData({...data,...item})
      else
      navigate("/login")
  })()
},[])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-8 col-sm-9 col-11 m-auto">
            <h5 className="bg-primary text-center p-2 text-light">Update Profile Details</h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 my-2">
                  <input  type="text"  name="name" value={data.name} onChange={getInputData}  className="form-control border-primary border-2"  placeholder="Full Name"/>
                  {show && errorMassage.name ?<p className="text-danger">{errorMassage.name}</p>:""}
                </div>
                <div className="col-md-6 my-2">
                  <input  type="number"  name="phone" value={data.phone}  onChange={getInputData}  className="form-control border-primary border-2"  placeholder="Phone Number"/>
                  {show && errorMassage.phone ?<p className="text-danger">{errorMassage.phone}</p>:""}
                </div>
                <div className="my-2">
                  <label >Address</label>
                  <textarea name="address" value={data.address}  onChange={getInputData} placeholder="Address..." className="form-control border-2 border-primary"/>
                </div>
                <div className="col-md-6 my-2">
                  <input type="text" name="city"value={data.city}  onChange={getInputData} placeholder="city Name" className="form-control border-2 border-primary" />
                </div>
                <div className="col-md-6 my-2">
                  <input type="text" name="state" value={data.state}  onChange={getInputData} placeholder="State Name" className="form-control border-2 border-primary" />
                </div>
                <div className="col-md-6 my-2">
                  <input type="number" name="pin"value={data.pin}  onChange={getInputData} placeholder="Pin Code" className="form-control border-2 border-primary" />
                </div>
                <div className="col-md-6 my-2">
                  <input type="file" name="pic" onChange={getInputData} className="form-control border-2 border-primary" />
                </div>
                
              </div>
              <div className="mb-2">
                <button type="submit" className="btn bg-primary w-100 text-light"> Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

}