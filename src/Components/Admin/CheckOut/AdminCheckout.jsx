import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import SideBar from "../SideBar";
import { Link } from "react-router-dom";
// import {getCheckout, deleteCheckout} from '../../../Store/ActionCreators/CheckoutActionCreators'

export default function AdminCheckout() {
  let [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "user", headerName: "User", width: 90 },
    { field: "oderStatus", headerName: "OrderStatus", width: 160},
    { field: "paymentStatus", headerName: "Payment Status", width: 125 },
    { field: "paymentMode", headerName: "Payment Mode", width: 110 },
    { field: "subtotal", headerName: "SubTotal", width: 80 ,renderCell:({row})=><span>&#8377;{row.subtotal}</span>},
    { field: "shipping", headerName: "Shipping", width: 80,renderCell:({row})=><span>&#8377;{row.shipping}</span> },
    { field: "total", headerName: "Total", width: 105,renderCell:({row})=><span>&#8377;{row.total}</span> },
    { field: "date", headerName: "Date", width: 85 , renderCell:({row})=><span>{ new Date(row.date).toLocaleDateString()}</span>},
    { field: "view", headerName: "View", width: 50 , renderCell:({row})=><Link to={`/admin/checkout/show/${row.id}` } className=" btn btn-success" > <i className="fa fa-eye "></i></Link>},
 
  ];
  
{ //  use for Redux
  // let CheckoutStateData = useSelector((state)=>state.CheckoutStateData)
  // let dispatch=useDispatch()
// function getAPIdata() {
//     dispatch(getCheckout())
//     if(CheckoutStateData.length)
//     setData(CheckoutStateData);
//     else 
//     setData([])
//   }
//   useEffect(() => {
//     getAPIdata();
//   }, [CheckoutStateData.length]);
}

async function getAPIData(){
  let response= await fetch("/checkout",{
    method:"GET",
    headers:{
      "content-type":"application/json"
    }
  })
  response = await response.json()
  if(response.length)
    setData(response)
  else
  setData([])
}
useEffect(()=>{
  (()=>{
  getAPIData()
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
            <h5 className=" text-light p-2 text-center" style={{backgroundColor:"gray"}}>
              CheckOut List 
              
            </h5>
            <div className="table-responsive">

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
