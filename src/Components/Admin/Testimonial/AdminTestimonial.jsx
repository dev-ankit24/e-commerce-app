import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";

import {getTestimonial, deleteTestimonial} from '../../../Store/ActionCreators/TestimonialActionCreators'
import { useDispatch, useSelector } from "react-redux";
export default function AdminTestimonial() {
  let [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 190 },
    { field: "pic", headerName: "Pic", width: 75 , renderCell:({row})=><a href={`${row.pic}`} target="_blank" rel="noreferrer">
      <img src={`${row.pic}`} height={60} width={50} className="rounded" alt=""/>
  </a>},
    { field: "message", headerName: "Message", width: 360 },

    { field: "active", headerName: "Active", width: 100 , renderCell:({row})=> <p className={row.active?"text-success":"text-danger"}>{row.active? "Yes":"No"}</p>},

    { field: "edit", headerName: "Edit", width: 50 , renderCell:({row})=><Link to={`/admin/testimonial/update/${row.id}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link>},

    { field: "delete", headerName: "Delete", width: 100 , renderCell:({row})=> <button className="btn btn-danger" onClick={()=>deleteData(row.id)}><i className="fa fa-trash"></i></button>}
  ];
  
  let TestimonialStateData = useSelector((state)=>state.TestimonialStateData)
  let dispatch=useDispatch()

  // Detele data table
  async function deleteData(id) {
    if (window.confirm("You Are Sure to Delete That Item : ")) {
     dispatch(deleteTestimonial({id:id}))
      getAPIdata();
    }
  }

function getAPIdata() {
    dispatch(getTestimonial())
    if(TestimonialStateData.length)
    setData(TestimonialStateData);
    else 
    setData([])
  }
  useEffect(() => {
    getAPIdata();
  }, [TestimonialStateData.length]);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">
              Testimonial{" "}
              <Link to="/admin/testimonial/create">
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
                      <td><Link to={`/admin/testimonial/update/${item.id}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link></td>
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
