import React, { useState } from 'react'
import FormValidation from './Validators/FormValidation'
import { Link, useNavigate } from 'react-router-dom'
export default function Login(){
  let [data,setData]=useState({
    username:"",
    password:""
  })
  let [errorMassage, setErrorMassage]=useState({
    username:"UserName Field is Mendatory",
    password:"Password Field is Mendatory"
  })
  let navigate = useNavigate()
  let [show ,setShow]= useState(false)

  function getInputData(e){
    var {name,value}=e.target
    setErrorMassage((old)=>{
        return{
            ...old,
            [name]:FormValidation(e)
        }
    })
    setData((old)=>{
        return{
            ...old,
            [name]:value
        }
    })
  }
async function postData(e){
    e.preventDefault()
        let error=Object.values(errorMassage).find((x)=>x!=="")
        if(!error){
            // console.log(item)
            let response = await fetch("/user",{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            })
            response = await response.json()
            
            // Find Data  and Store Data Local  Stroage
            let item = response.find((x)=>x.username===data.username && x.password===data.password)
            if(item){
                localStorage.setItem("login",true)
                localStorage.setItem("name",item.name)
                localStorage.setItem("userid",item.id)
                localStorage.setItem("role",item.role)
                if(item.role==="Admin")
                    navigate("/admin")
                else
                    navigate("/profile")

            }               
            else{
                setShow(true)
                setErrorMassage((old)=>{
                    return{
                        ...old, 
                        username:" Invalid Username or Password or not Match try again"
                    }
                })
            }  
        }
        else
        setShow(true)

     
    
  }
  return (
    <>
    <div className="container-fluid my-3">
        <div className="row">
            <div className="col-md-6 col-sm-8 col-10 m-auto">
                <h5 className='bg-primary text-center p-2 text-light'>Login Your Account</h5>
                <form onSubmit={postData} >
                    <div className="row">
                        <div className="col-md-6 my-2">
                            <input type="text" name='username' onChange={getInputData} className={`form-control border border-primary ${show && errorMassage.username?"border-2 border-danger":" border-2 border-primary"}`} placeholder='User Name'  />
                            {show && errorMassage.username?<p className='text-danger'>{errorMassage.username}</p>:""}
                        </div>
                        <div className="col-md-6 my-2">
                            <input type="password" name='password' onChange={getInputData} className={`form-control border border-primary ${show && errorMassage.password?"border-2 border-danger":" border-2 border-primary"}`} placeholder='Password '  />
                            { show && errorMassage.password ? <p className='text-danger'>{errorMassage.password}</p>:""}
                        </div>
                       
                    </div>
                    <div className='mb-2'>
                    <button type="submit" className='btn bg-primary w-100 text-light'>Login</button>
                    </div>

                </form>
                <div className='d-flex justify-content-between'>
                    <Link to='#'>Forget Password </Link>
                    <Link to='/signup'>Doen't  Have an Account?Create </Link>
                </div>
            </div>
        </div>
    </div>
    </>

)
}
