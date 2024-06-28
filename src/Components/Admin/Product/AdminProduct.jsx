import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";

import {getProduct, deleteProduct} from '../../../Store/ActionCreators/ProductActionCreators'
import { useDispatch, useSelector } from "react-redux";
export default function AdminProduct() {
  let [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "maincategory", headerName: "Maincategory", width:100 },
    { field: "subcategory", headerName: "Subcategory", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    { field: "color", headerName: "Color", width: 70 },
    { field: "size", headerName: "Size", width: 50 },
    { field: "basePrice", headerName: "BasePrice", width: 100 ,renderCell:({row})=><span>&#8377;{row.basePrice} /-</span>},
    { field: "discount", headerName: "Discount", width: 100,renderCell:({row})=><span>{row.discount}% Off</span> },
    { field: "finalPrice", headerName: "FinalPrice", width: 100, renderCell:({row})=><span>&#8377;{row.finalPrice}</span> },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 ,renderCell:({row})=><span>{row.stock?"In Stock":"Out OF Stock"}</span> },
    

  //   { field: "pic", headerName: "Pic", width: 300 , renderCell:({row})=>< a href={`${row.pic}`} target="_blank" rel="noreferrer">
  //     <img src={`${row.pic}`} height={60} width={50} className="rounded" alt=""/>
  // </a>},

    { 
      field: "pic", headerName: "Pic", width: 300 , renderCell:({row})=>row.pic?.map((item,index)=>{
        return <a key={index} href={`${item}`} target="_blank" rel="noreferrer">
        <img src={`${item}`} height={60} width={50} className="rounded" alt=""/>
    </a>
      })
    },

    { field: "active", headerName: "Active", width: 100 , renderCell:({row})=> <p className={row.active?"text-success":"text-danger"}>{row.active? "Yes":"No"}</p>},

    { field: "edit", headerName: "Edit", width: 100 , renderCell:({row})=><Link to={`/admin/product/update/${row.id}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link>},
    
    { field: "delete", headerName: "Delete", width: 100 , renderCell:({row})=> <button className="btn btn-danger" onClick={()=>deleteData(row.id)}><i className="fa fa-trash"></i></button>}
  ];
  
  let ProductStateData = useSelector((state)=>state.ProductStateData)
  let dispatch=useDispatch()

  // Detele data table
  async function deleteData(id) {
    if (window.confirm("You Are Sure to Delete That Item : ")) {
     dispatch(deleteProduct({id:id}))
      getAPIdata();
    }
  }

function getAPIdata() {
    dispatch(getProduct())
    if(ProductStateData.length)
    setData(ProductStateData);
    else 
    setData([])
  }
  useEffect(() => {
    getAPIdata();
  },[ProductStateData.length]);
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
              <Link to="/admin/product/create">
                {" "}
                <i className="fa fa-plus text-light float-end"></i>{" "}
              </Link>
            </h5>
            <div className="table-responsive">
              {/* <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td className={item.active?"text-success":"text-danger"}>{item.active?"Yes":"No"}</td>
                      <td><Link to={`/admin/Product/update/${item.id}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link></td>
                      <td><button className="btn btn-danger" onClick={()=>deleteData(item.id)}><i className="fa fa-trash"></i></button></td>
                    </tr>
                    
                  );
                })}
              </tbody>
            </table> */}

              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10,20,50,100]}
                  checkboxSelection={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
