import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
let navigate =useNavigate()
// Remove Data localstroage and click logout button and navigate LOGIN page
function logout(){
  localStorage.removeItem("login")
  localStorage.removeItem("name")
  localStorage.removeItem("role")
  localStorage.removeItem("userid")
  navigate("/login")
}
  return (
    <>
      {/* <!-- Topbar Start --> */}
      <div className="container-fluid bg-light p-0">
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <Link
              to="tel: +918392823395"
              className="h-100 d-inline-flex align-items-center border-start text-dark border-end px-3"
            >
              <small className="fa fa-phone-alt me-2"></small>
              <small>+91 8392823395</small>
            </Link>
            <Link
              to="mailto:akumarrai45@gmail.com"
              className="h-100 d-inline-flex align-items-center text-dark border-end px-3"
            >
              <small className="far fa-envelope-open me-2"></small>
              <small>akumarrai45@gmail.com</small>
            </Link>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center">
              <Link
                className="btn btn-square border-end border-start"
                to="'https://www.facebook.com/ankitkumr.kumr.3?mibextid=ZbWKwL"
                target="-blank"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <a className="btn btn-square border-end" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-square border-end" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="btn btn-square border-end" href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Topbar End --> */}

      {/* <!-- Navbar Start --> */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <h2 className="m-0">
            <i className="fa fa-home text-primary me-3"></i>  fashinShop
            {/* <img src="./img/p1.jpg" alt="" height={100} width={100} /> */}
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-3 py-lg-0">
            <NavLink to="" className="nav-item nav-link ">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About Us
            </NavLink>
            <NavLink to="/shop" className="nav-item nav-link">
              Shop
            </NavLink>
            <NavLink to="/contact" className="nav-item nav-link">
              Contact 
            </NavLink>
           
           {/* Check Condition User login show toggle  */}
            {
              localStorage.getItem("login")?
              <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" > {localStorage.getItem("name")}<i class="fa fa-user text-primary"></i></a>
              <div className="dropdown-menu bg-light m-0">
                {
                  localStorage.getItem("role")==="Buyer"?
                  <>
                  <Link to="/profile" className="dropdown-item">Profile     <i class="fa fa-user"></i></Link>
                 <Link to="/cart" className="dropdown-item">Cart </Link>
                 <Link to="/checkout" className="dropdown-item">Checkout <i class="fa fa-check"></i> </Link>
                  </>:
                  <Link to="/admin" className="dropdown-item">Profile     <i class="fa fa-user"></i></Link>
                }
                <button className="dropdown-item" onClick={logout}>Logout</button>
              </div>
            </div>
              : <NavLink to="/login" className="nav-item nav-link"> Login</NavLink>
            }
          </div>
        </div>
      </nav>
      {/* <!-- Navbar End --> */}
    </>
  );
}
