import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import SideBar from "../SideBar";

import {getSubcategory, deleteSubcategory} from '../../../Store/ActionCreators/SubCategoryActionCreators'
import { useDispatch, useSelector } from "react-redux";
export default function AdminSubCategory() {
  let [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "active", headerName: "Active", width: 100 , renderCell:({row})=><p className={row.active?"text-success":"text-danger"}>{row.active?"Yes":"No"}</p>},
    { field: "edit", headerName: "Edit", width: 100 , renderCell:({row})=><Link to={`/admin/subcategory/update/${row.id}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link>},
    { field: "delete", headerName: "Delete", width: 100 , renderCell:({row})=><button className="btn btn-danger" onClick={()=>deleteData(row.id)}><i className="fa fa-trash"></i></button>}
  ];
  
  let SubcategoryStateData = useSelector((state)=>state.SubcategoryStateData)
  let dispatch=useDispatch()

  // Detele data table
   function deleteData(id) {
    if (window.confirm("You Are Sure to Delete That Item : ")) {
     dispatch(deleteSubcategory({id:id}))
      getAPIdata();
    }
  }

function getAPIdata() {
    dispatch(getSubcategory())
    if(SubcategoryStateData.length)
    setData(SubcategoryStateData);
    else 
    setData([])
  }
  useEffect(() => {
    getAPIdata();
  }, [SubcategoryStateData.length]);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">
              SubCategory{" "}
              <Link to="/admin/subcategory/create">
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
                      <td><Link to={`/admin/subcategory/update/${item.id}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link></td>
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
