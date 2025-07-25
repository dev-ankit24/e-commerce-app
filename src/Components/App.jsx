import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Partials/Navbar";
import Home from "./Home";
import Footer from "./Partials/Footer";
import About from "./About";
import Contact from "./Contact";
import Error from "./Error";
import Shop from "./Shop";
import AdminHome from "./Admin/AdminHome";

// Import MainCategory 
import AdminMainCategory from "./Admin/MainCategory/AdminMainCategory";
import AdminCreateMainCategory from "./Admin/MainCategory/AdminCreateMainCategory ";
import AdminUpdateMainCategory from "./Admin/MainCategory/AdminUpdateMainCategory ";

//  Import Subcategory
import AdminUpdateSubCategory from "./Admin/SubCategory/AdminUpdateSubCategory ";
import AdminCreateSubCategory from "./Admin/SubCategory/AdminCreateSubCategory ";
import AdminSubCategory from "./Admin/SubCategory/AdminSubCategory";

// Import Brand
import AdminBrand from "./Admin/Brand/AdminBrand";
import AdminCreateBrand from "./Admin/Brand/AdminCreateBrand";
import AdminUpdateBrand from "./Admin/Brand/AdminUpdateBrand";

// import Testimonial
import AdminTestimonial from "./Admin/Testimonial/AdminTestimonial";
import AdminCreateTestimonial from "./Admin/Testimonial/AdminCreateTestimonial";
import AdminUpdateTestimonial from "./Admin/Testimonial/AdminUpdateTestimonial";

//import  Product 
import AdminProduct from "./Admin/Product/AdminProduct";
import AdminUpdateProduct from "./Admin/Product/AdminUpdateProduct";
import AdminCreateProduct from "./Admin/Product/AdminCreateProduct";
import Products from "./Products";
import SignUp from "./SignUp";
import Login from "./Login";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import AdminNewsletter from "./Admin/Newsletter/AdminNewsletter";
import AdminUserList from "./Admin/User/AdminUser";
import AdminContactUs from "./Admin/ContactUs/AdminContactUs";
import AdminContactUsShow from "./Admin/ContactUs/AdminContactUsShow";
import AdminCheckout from "./Admin/CheckOut/AdminCheckout";
import AdminCheckoutShow from "./Admin/CheckOut/AdminCheckoutShow";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
        <Navbar />
            <Routes>
              {/* Public routes. */}
              <Route path='' element={<Home/>}/>
              < Route path='/about' element={<About/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/shop' element={<Shop/>}/>
              <Route path='/products/:id' element={<Products/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/login' element={<Login/>}/>
              
              {/* Buyer routes.(user) */}
              {/* route gaurd */}
             {
              localStorage.getItem("login")?
              <>
               <Route path='/profile' element={<Profile/>}/>
              <Route path='/update-profile' element={<UpdateProfile/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
              <Route path='/confirmation' element={<Confirmation/>}/>
              </>:""
             }
              {/* admin routes */}
              <Route path='/admin' element={<AdminHome/>}/>

              {
                localStorage.getItem("login") && localStorage.getItem("role")==="Admin"?
                <>
                {/* Admin Maincatgory route */}
              <Route path='/admin/maincategory' element={<AdminMainCategory/>}/>
              <Route path='/admin/maincategory/create' element={<AdminCreateMainCategory/>}/>
              <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMainCategory/>}/>

               {/* SubCatgory route */}
              < Route path='/admin/subcategory' element={<AdminSubCategory/>}/>
              <Route path='/admin/subcategory/create' element={<AdminCreateSubCategory/>}/>
              <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubCategory/>}/>

               {/* Brand route */}
               < Route path='/admin/brand' element={<AdminBrand/>}/>
              <Route path='/admin/brand/create' element={<AdminCreateBrand/>}/>
              <Route path='/admin/brand/update/:id' element={<AdminUpdateBrand/>}/>

               {/* Testimonial route */}
               < Route path='/admin/testimonial' element={<AdminTestimonial/>}/>
              <Route path='/admin/testimonial/create' element={<AdminCreateTestimonial/>}/>
              <Route path='/admin/testimonial/update/:id' element={<AdminUpdateTestimonial/>}/>

              
               {/* products route */}
               < Route path='/admin/product' element={<AdminProduct/>}/>
              <Route path='/admin/product/update/:id' element={<AdminUpdateProduct/>}/>
              <Route path='/admin/product/create' element={<AdminCreateProduct/>}/>

              {/* NeswLetter Route */}
              <Route path='/admin/newsletter' element={<AdminNewsletter/>}/>

              <Route path='/admin/user' element={<AdminUserList/> }/>

              <Route path='/admin/contact' element={<AdminContactUs/>}/>
              <Route path='/admin/contact/show/:id' element={<AdminContactUsShow/>}/>

              <Route path='/admin/checkout' element={<AdminCheckout/>}/>
              <Route path="/admin/checkout/show/:id" element={<AdminCheckoutShow/>}/>

                </>:""
              }



              <Route path='/*' element={<Error/>}/>
            </Routes>
        <Footer/>
    </BrowserRouter>
  );
}
