import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import SideBar from "../SideBar";

import {getNewsletter, deleteNewsletter} from '../../../Store/ActionCreators/NewsletterActionCreators'
import { useDispatch, useSelector } from "react-redux";
export default function AdminNewsletter() {
  let [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "active", headerName: "Active", width: 100 , renderCell:({row})=><p className={row.active?"text-success":"text-danger"}>{row.active?"Yes":"No"}</p>},
    { field: "delete", headerName: "Delete", width: 100 , renderCell:({row})=><button className="btn btn-danger" onClick={()=>deleteData(row.id)}><i className="fa fa-trash"></i></button>}
  ];
  
  let NewsletterStateData = useSelector((state)=>state.NewsletterStateData)
  let dispatch=useDispatch()

  // Detele data table
  async function deleteData(id) {
    if (window.confirm("You Are Sure to Delete That Item : ")) {
     dispatch(deleteNewsletter({id:id}))
      getAPIdata();
    }
  }

function getAPIdata() {
    dispatch(getNewsletter())
    if(NewsletterStateData.length)
    setData(NewsletterStateData);
    else 
    setData([])
  }
  useEffect(() => {
    getAPIdata();
  }, [NewsletterStateData.length]);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">
              MainCategory{" "}
              <Link to="/admin/maincategory/create">
                {" "}
                <i className="fa fa-plus text-light float-end"></i>{" "}
              </Link>
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
