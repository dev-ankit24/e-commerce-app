import React, { useEffect, useState } from 'react'
import Product from './Partials/Product';

import { getProduct } from '../Store/ActionCreators/ProductActionCreators';
import { getMaincategory } from '../Store/ActionCreators/MainCategoryActionCreators';
import {getSubcategory} from '../Store/ActionCreators/SubCategoryActionCreators';
import {getBrand} from '../Store/ActionCreators/BrandActionCreators';
import { useDispatch, useSelector } from 'react-redux';


export default function Shop() {
  let [product,setProduct]=useState([])

  let [mc,setMc]=useState("")
  let [sc,setSc]=useState("")
  let [br,setBr]=useState("")
  let [flag,setFlag] = useState(false)
  let [search , setSearch] =  useState("")
  let [min, setMin] =useState(0)
  let [max, setMax]=useState(1000)

  let dispatch =  useDispatch()
  let ProductStateData = useSelector((state)=>state.ProductStateData)
  let MaincategoryStateData = useSelector((state)=>state.MaincategoryStateData)
  let SubcategoryStateData = useSelector((state)=>state.SubcategoryStateData)
  let BrandStateData = useSelector((state)=>state.BrandStateData)

  // product filter 
  function filterData(mc,sc,br , min = -1, max = -1){
     let data=[]
     // Select Single Category fitter Product
     if(mc==="" && sc==="" && br==="")
      data=ProductStateData
    else if(mc!=="" && sc==="" && br==="")
      data=ProductStateData.filter((x)=>x.maincategory===mc)
    else if(mc ==="" && sc !== "" && br==="")
      data=ProductStateData.filter((x)=>x.subcategory=== sc)
    else if (mc===""&& sc===""&& br !=="")
      data=ProductStateData.filter((x)=>x.brand === br)

    // Select maincategory && Subcategory filter Product
    else if(mc!=="" && sc!=="" && br ==="" )
      data=ProductStateData.filter((x)=>x.maincategory ===mc && x.subcategory===sc)
    else if (mc==="" && sc!=="" && br!=="")
      data=ProductStateData.filter((x)=>x.subcategory===sc && x.brand===br)
    else if (mc!==""&& sc==="" && br!=="" )
      data= ProductStateData.filter((x)=>x.maincategory ===mc && x.brand===br)

    // Select Maincategory && Subcategory && Brand filter Product
     else 
        data= ProductStateData.filter((x)=>x.maincategory === mc && x.subcategory ===sc && x.brand ===br)
           
    // Price Filter by Mc, Sc,Br,min,max
    if(min === -1 || max === -1)
    setProduct(data)
    else
     setProduct(data.filter((x)=>x.finalPrice>=min && x.finalPrice<=max))
  }

  function filterProduct(mc,sc,br){
    setMc(mc)
    setSc(sc)
    setBr(br)
    filterData(mc,sc,br)
  }

  // Sort Low to High or high to Low
   function sortFilter(option){
    // console.log(flag, option);
     if(option === "1")
      setProduct(product.sort((x, y)=>y.id.localeCompare(x.id)))
    else if(option === "2")
      setProduct(product.sort((x, y)=>x.finalPrice - y.finalPrice))
   else 
    setProduct(product.sort((x, y)=>y.finalPrice - x.finalPrice))
      setFlag(!flag)
   }

   // Search Product by Serach 
   function postSearch(e){
    e.preventDefault()
    let src=search.toLowerCase()
    setProduct(ProductStateData.filter((x)=>x.name.toLowerCase().includes(src)|| x.maincategory.toLowerCase()===src ||
     x.subcategory.toLowerCase()===src || x.brand.toLowerCase()===src || x.description?.toLowerCase().includes(src)))
   }

   // Apply Price Filter By Using Filter
   function postFiterPrice(){
   
    filterData(mc,sc,br,min,max)
   }

  useEffect(()=>{
    (()=>{
     dispatch(getProduct())
     if(ProductStateData.length)
      setProduct(ProductStateData)
    })()
  },[ProductStateData.length])
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
    <div className="container-fluid">
      <div className="row">
        {/* Maincategory */}
        <div className="col-md-2">
          <div className="list-group mb-3">
           <button className="list-group-item list-group-item-action active" aria-current="true">Maincategory</button>
           <button  className="list-group-item list-group-item-action" onClick={()=>filterProduct("",sc,br)}>All</button>
           {
             MaincategoryStateData.length && MaincategoryStateData.map((item,index)=>{
                 return <button key={index} className="list-group-item list-group-item-action" onClick={()=>filterProduct(item.name,sc,br)}>{item.name}</button>
           
             })
           }
          </div>
            {/* Subcategory  Data  */}
          <div className="list-group mb-3">
           <button className="list-group-item list-group-item-action active" aria-current="true">Subcategory</button>
           <button  className="list-group-item list-group-item-action" onClick={()=>filterProduct(mc,"",br)}>All</button>
           {
             SubcategoryStateData.length && SubcategoryStateData.map((item,index)=>{
                 return <button key={index}  className="list-group-item list-group-item-action" onClick={()=>filterProduct(mc,item.name,br)}>{item.name}</button>
           
             })
           }
          </div>
          {/* Brand data */}
          <div className="list-group mb-3">
           <button className="list-group-item list-group-item-action active" aria-current="true">Brand</button>
           <button  className="list-group-item list-group-item-action" onClick={()=>filterProduct(mc,sc,"")}>All</button>
           {
             BrandStateData.length && BrandStateData.map((item,index)=>{
                 return <button key={index}  className="list-group-item list-group-item-action" onClick={()=>filterProduct(mc,sc,item.name)}>{item.name}</button>
           
             })
           }
          </div>

        </div>
        {/* Search Product Feature */}
        <div className="col-md 10">
           <div className="row">
            <div className="col-md-6">
              <form onSubmit={postSearch}>
              <div className="btn-group w-100">
                <input type="search" name='search' onChange={(e)=>setSearch(e.target.value)} placeholder='Search Product By Name, Category, Brand etc....' className='form-control border border-2 border-primary' />
                <button type="submit" className='btn btn-primary'><i className='fa fa-search'></i></button>
              </div>
              </form>
            </div>
        
            {/* High to Low Filter */}
            <div className="col-md-3 ">
              <select name="sort" onChange={(e)=>sortFilter(e.target.value)} className='form-select border border-2 border-primary'>
                <option value="1">Letest</option>
                <option value="2">Price : L To H</option>
                <option value="3">Price : H To L</option>
              </select>
            </div>
                {/* Price Filter  */}
               <div className="col-md-3 ">
                <div >
                  <h5 className='bg-primary text-center text-light p-2'>Price Filter </h5>
                  <label >Min</label>
                  <input type="number" name="min"  value={min} onChange={(e)=>setMin(e.target.value)} placeholder='Enter Minimum Price'  className='form-control border-2 border-primary' />
                </div>
                <div className="mb-1">
                  <label >Max</label>
                  <input type="number" name="max" value={max} onChange={(e)=>setMax(e.target.value)} placeholder='Enter Maximum Price'  className='form-control border-2 border-primary' />
                </div>
                <div>
                  <button className='btn btn-primary w-100' onClick={postFiterPrice}>Apply Filter</button>
                </div>
              </div>
           </div>
  
            <Product title={`Maincategory=${mc?mc:"All"} SubCategory=${sc?sc:"All"}  Brand=${br?br:"All"}`} data={product}/>
            
        </div>
      </div>
    </div>
  )
}


