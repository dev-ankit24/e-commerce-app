import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import SideBar from "../SideBar";

import {getContactUs, deleteContactUs, updateContactUs} from '../../../Store/ActionCreators/ContactUsActionCreators'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function AdminContactUs() {
  let [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "email", headerName: "Email", width: 210 },
    { field: "phone", headerName: "Phone", width: 105 },
    { field: "date", headerName: "Date", width: 85 , renderCell:({row})=><span>{ new Date(row.date).toLocaleDateString()}</span>},
    { field: "subject", headerName: "Subject", width: 130 },
    { field: "message", headerName: "Message", width: 130 },
    { field: "active", headerName: "Active", width: 50 , renderCell:({row})=>< p  className={row.active?"text-success":"text-danger"}>{row.active?"Yes":"No"}</p>},
    { field: "view", headerName: "View", width: 50 , renderCell:({row})=><Link to={`/admin/contact/show/${row.id}` } className=" btn btn-success" > <i className="fa fa-eye "></i></Link>},
    { field: "delete", headerName: "Delete", width: 100 , renderCell:({row})=>{
      if(!row.active)
        return <button className="btn btn-danger" onClick={()=>deleteData(row.id)}><i className="fa fa-trash"></i></button>
    }}
  ];
  
  let ContactUsStateData = useSelector((state)=>state.ContactUsStateData)
  let dispatch=useDispatch()

  // Detele data table
 async function deleteData(id) {
    if (window.confirm("You Are Sure to Delete That Item : ")) {
     dispatch(deleteContactUs({id:id}))
      getAPIdata();
    }
  }


function getAPIdata() {
    dispatch(getContactUs())
    if(ContactUsStateData.length)
    setData(ContactUsStateData);
    else 
    setData([])

  }
  useEffect(() => {
    getAPIdata();
  }, [ContactUsStateData.length]);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">
              ContactUs{" "}
              
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
