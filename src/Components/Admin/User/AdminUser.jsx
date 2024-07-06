import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import SideBar from "../SideBar";

export default function AdminUserList() {
  let [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "username", headerName: "UserName", width: 100 },
    { field: "role", headerName: "Role", width: 100 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "delete", headerName: "Delete", width: 100 , renderCell:({row})=><button className="btn btn-danger" onClick={()=>deleteData(row.id)}><i className="fa fa-trash"></i></button>}
  ];
  


  // Detele data table
 async function deleteData(id) {
    if (window.confirm("You Are Sure to Delete That Item : ")) {
      let response = await fetch ("/user/"+id,{
        method:"DELETE",
        headers:{
          "content-type":"application/json"
        }
      })
      response = await response.json()
      getAPIdata();
    }
  }
  
async function getAPIdata() {
  let response= await fetch("/user",{
    method:"GET",
    headers:{
      "content-type":"application/json"
    }
  })
  response = await response.json()
    if(response)
    setData(response);
    else 
    setData([])

  }
  useEffect(() => {
    getAPIdata();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">
              User List{" "}
              
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
