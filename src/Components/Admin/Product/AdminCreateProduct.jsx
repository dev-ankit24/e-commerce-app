import React, { useEffect, useRef, useState } from "react";
import SideBar from "../SideBar";
import { Link, useNavigate } from "react-router-dom";
import FormValidation from "../../Validators/FormValidation";
import imageValidation from "../../Validators/ImageValidation";

import {createProduct} from '../../../Store/ActionCreators/ProductActionCreators'
import { useDispatch, useSelector } from "react-redux";
import { getMaincategory } from "../../../Store/ActionCreators/MainCategoryActionCreators";
import { getSubcategory } from "../../../Store/ActionCreators/SubCategoryActionCreators";
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators";
let rte;
export default function AdminCreateProduct() {
  let refdiv=useRef(null);
  
  let [data, setData] = useState({
    name: "",
    maincategory:"",
    subcategory:"",
    brand:"",
    color:"",
    size:"",
    basePrice:0,
    finalPrice:0,
    discount:0,
    stock: true,
    quantity:0,
    description:"",
    pic:"",
    active: true,
  });
  let [errorMassage, setErrorMassage] = useState({
    name:"Name Field is Mendatory",
    pic:"Pic File is Mendatory",
    color:"Color  is Mendatory",
    size:"Size  is Mendatory",
    basePrice:" BasePrice Mendatory",
    discount:"Discount field is Mendatory",
    quantity:"Quantity is mandatory"
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let dispatch= useDispatch()
  let MaincategoryStateData = useSelector((state)=>state.MaincategoryStateData)
  let SubcategoryStateData = useSelector((state)=>state.SubcategoryStateData)
  let BrandStateData = useSelector((state)=>state.BrandStateData)

  // data access in input field.
  function getInputData(e) {
    let name = e.target.name
    // multiple image stote 
    let value  = e.target.files? Array.from(e.target?.files).map((item)=>"/products/"+item.name) :e.target.value
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
        [name]: name === "active" | name==="stock"? (value === "true" ? true : false) : value,
      };
    });
  }
 function postData(e) {
    e.preventDefault();
    // console.log(errorMassage, data);
    let error= Object.values(errorMassage).find((x)=>x.length >0)
    if (error) {
      setShow(true);
    }
    // data get and check name
    // let response=await fetch('http://localhost:8000/Product',{
    //   method:"GET",
    //   headers:{
    //     "content-type":"application/json"
    //   },
    //   // body:JSON.stringify({...data})
    // });
    // response = await response.json() 

      // check name is exit or not  and then show error 
     
      
      // data post (save) in json database
      else{
        dispatch(createProduct({ 
          ...data ,
          // form not select data  brand , mainacategory , subcategory etc 
        maincategory :data.maincategory || MaincategoryStateData[0].name,
        subcategory :data.subcategory || SubcategoryStateData[0].name,
        brand :data.brand || BrandStateData[0].name,
        basePrice:parseInt(data.basePrice),
        discount:parseInt(data.discount),
        finalPrice:parseInt(data.basePrice - data.basePrice* data.discount /100),
        quantity:parseInt(data.quantity),
        description: rte.getHTMLCode()
        }))
        navigate("/admin/product");
         //**********    ********** */
        //  response= await fetch("http://localhost:8000/Product/"+id ,{
        //   method:"PUT",
        //   headers:{
        //     "content-type":"application/json"
        //   },
        //   body:JSON.stringify({...data})
        // });
        // response = await response.json()
       
    }
  }

  useEffect(()=>{
    rte=new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode("");
  },[])
  useEffect(()=>{
    (()=>{
      dispatch(getMaincategory())
    })()
  },[MaincategoryStateData.length])

  useEffect(()=>{
    (()=>{
      dispatch(getSubcategory())
    })()
  },[SubcategoryStateData.length])

  useEffect(()=>{
    (()=>{
      dispatch(getBrand())
    })()
  },[BrandStateData.length])

  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">
              Product{" "}
              <Link to="/admin/product">
                {" "}
                <i className="fa fa-backward text-light float-end"></i>{" "}
              </Link>
            </h5>

            {/* form create section  */}

            <form onSubmit={postData}>
              <div className="row">
                <div className=" mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData}placeholder="ProductName"className="form-control border border-primary" />
                  {show && errorMassage.name ? <p className="text-danger text-capitalize">{errorMassage.name}</p>:""}
                </div>

                <div className="row">
                    <div className="col-md-3 col-sm-6 mb-3">
                      <label >MainCategory</label>
                      <select name="maincategory"  onChange={getInputData} className="form-select border border-primary">
                        {
                          MaincategoryStateData.map((item, index)=>{
                            return <option key={index} value={item.name}>{item.name}</option>
                          })
                        }
                      </select>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-3">
                      <label>SubCategory</label>
                      <select name="subcategory"  onChange={getInputData} className="form-select  border border-primary">
                        {
                          SubcategoryStateData.map((item, index)=>{
                            return <option key={index} value={item.name}>{item.name}</option>
                          })
                        }
                      </select>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-3">
                      <label >Brand</label>
                      <select name="brand"  onChange={getInputData} className="form-select border border-primary">
                        {BrandStateData.map((item, index)=>{
                          return <option value={item.name} key={index}>{item.name}</option>
                        })}
                      </select>
                    </div>

                    <div className="col-md-3 col-sm-6 mb-3">
                       <label >Stock*</label>
                       <select name="stock"   onChange={getInputData} className="form-select ">
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                       </select>
                    </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3" >
                    <label>Color*</label>
                    <input type="text"  onChange={getInputData} name="color" className="form-control border border-primary" placeholder="Enter Color" />
                    {show && errorMassage.color? <p className="text-danger text-capitalize">{errorMassage.color}</p>:""}
                  </div>
                  <div className="col-md-6 mb-3" >
                    <label>Size*</label>
                    <input type="text" name="size"  onChange={getInputData} className="form-control border border-primary" placeholder="Enter Size" />
                    {show && errorMassage.size ? <p className="text-danger text-capitalize">{errorMassage.size}</p>:""}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3" >
                    <label>BasePrice*</label>
                    <input type="number" name="basePrice"  onChange={getInputData} className="form-control border border-primary" placeholder="Enter BasePrice" />
                    {show && errorMassage.basePrice? <p className="text-danger text-capitalize">{errorMassage.basePrice}</p>:""}
                  </div>
                  <div className="col-md-6 mb-3" >
                    <label>Discount*</label>
                    <input type="number" name="discount"  onChange={getInputData} className="form-control border border-primary" placeholder="Enter discount " />
                    {show && errorMassage.discount? <p className="text-danger text-capitalize">{errorMassage.discount}</p>:""}
                  </div>
                </div>
                <div className="mb-3">
                  <label > Description*</label>
                    <div ref={refdiv}></div>

                  {/* <textarea  name="description"  onChange={getInputData} placeholder="Enter the Description ....."  className="form-control border border-primary "  rows={4}> </textarea> */}
                  {show && errorMassage.description ? <p className="text-danger text-capitalize">{errorMassage.description}</p>:""}
                </div>
               
                <div className="col-md-6 mb-3">
                <label>Pic*</label>
                  <input type="file" name="pic" multiple  onChange={getInputData} className="form-control border border-primary" />
                  {show && errorMassage.pic ? <p className="text-danger text-capitalize">{errorMassage.pic}</p>:""}
                  </div>
                 <div className="col-md-6 mb-3">  
                   <label>Stock Quantity*</label>
                  <input type="number" name="quantity" onChange={getInputData} className="form-control border border-primary" placeholder="Stock Quantity"/>
                  {show && errorMassage.quantity ?<p className="text-danger text-capitalize">{errorMassage.quantity}</p>:""}
                  </div>
                 
  
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
