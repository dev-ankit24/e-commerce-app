import React, { useState } from "react";
import FormValidation from "./Validators/FormValidation";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let [errorMassage, setErrorMassage] = useState({
    name: "Name Field is Mendatory",
    username: "Username Field is Mendatory",
    email: "Email Field is Mendatory",
    phone: "Phone Field is Mendatory",
    password: "Password Field is Mendatory",
  });
  let navigate = useNavigate();
  let [show, setShow] = useState(false);

  function getInputData(e) {
    var { name, value } = e.target;
    setErrorMassage((old) => {
      return {
        ...old,
        [name]: FormValidation(e),
      };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  async function postData(e) {
    e.preventDefault();
    if (data.password === data.cpassword) {
      let error = Object.values(errorMassage).find((x) => x !== "");
      if (!error) {
        // Data get  check username or email 
        let response = await fetch("/user", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        response = await response.json();
        // check username or email  by get respone
        let item = response.find((x) => x.username === data.username || x.email === data.email);
        if (item) {
          setShow(true);
          setErrorMassage((old) => {
            return {
              ...old,
              username: item.username === data.username ? "UserName Alresy Exits" : "",
              email: item.email === data.email ? "Email Address Alresy Exits" : "",
            };
          });
        }
         else {
          item = {
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: "Buyer",
          };
          // post data   by post method in json database file
          response = await fetch("/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(item),
          });
          response = await response.json();
            if (response) 
              navigate("/login");
            else 
              alert("something went wrong");
        }
      } 
      else setShow(true);
    } 
    else {
      setErrorMassage((old) => {
        return {
          ...old,
          password: "Password or Confirm password Does't Match",
        };
      });
      setShow(true);
    }
  }
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-8 col-sm-9 col-11 m-auto">
            <h5 className="bg-primary text-center p-2 text-light">
              Create a Free Account
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 my-2">
                  <input  type="text"  name="name"  onChange={getInputData}  className={`form-control border border-primary ${show && errorMassage.name?"border-2 border-danger":" border-2 border-primary"}`}  placeholder="Full Name"/>
                  {show && errorMassage.name ?<p className="text-danger">{errorMassage.name}</p>:""}
                </div>
                <div className="col-md-6 my-2">
                  <input type="text" name="username" onChange={getInputData} className={`form-control border border-primary ${show && errorMassage.username?"border-2 border-danger":" border-2 border-primary"}`} placeholder="UserName"/>
                  {show && errorMassage.username ? <p className="text-danger">{errorMassage.username}</p>:""}
                </div>
                <div className="col-md-6 my-2">
                  <input name="email" onChange={getInputData} type="email" className={`form-control border border-primary ${show && errorMassage.email?"border-2 border-danger":" border-2 border-primary"}`} placeholder="Email"/>
                  {show && errorMassage.email ? <p className="text-danger">{errorMassage.email}</p> : ""}
                </div>
                <div className="col-md-6 my-2">
                  <input  type="number"  name="phone"  onChange={getInputData}  className={`form-control border border-primary ${show && errorMassage.phone?"border-2 border-danger":" border-2 border-primary"}`}  placeholder="Phone Number"/>
                  {show && errorMassage.phone ?<p className="text-danger">{errorMassage.phone}</p>:""}
                </div>
                <div className="col-md-6 my-2">
                  <input  type="password"  name="password"  onChange={getInputData}  className={`form-control border border-primary ${show && errorMassage.password?"border-2 border-danger":" border-2 border-primary"}`}  placeholder="Password " />
                  {show && errorMassage.password ?<p className="text-danger">{errorMassage.password}</p>:""}
                </div>
                <div className="col-md-6 my-2">
                  <input type="password" name="cpassword" onChange={getInputData} className={`form-control border border-primary ${show && errorMassage.password?"border-2 border-danger":" border-2 border-primary"}`} placeholder="Confirm Password"/>
                  {show && errorMassage.password ? <p className="text-danger">{errorMassage.password}</p>:""}
                </div>
              </div>
              <div className="mb-2">
                <button type="submit" className="btn bg-primary w-100 text-light"> SignUp</button>
              </div>
            </form>
            <div className="d-flex justify-content-between">
              <Link to="/login">Alredy Have Account?Login </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
