import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileTable from './Partials/ProfileTable'


function Profile() {
    let [user, setUser] = useState({}) 
    let navigate = useNavigate()
    useEffect(()=>{
        ( async ()=>{
            let response= await fetch("/user",{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            })
            response= await response.json()
            let item = response.find((x)=>x.id===localStorage.getItem("userid"))
            if(item)
                setUser(item)
            else
            navigate("/login")
        })()
    },[])

    return (
             <>
             
             <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {
                            user.pic?
                            <img src={user.pic} alt="user-image" height={400} width="100%"  /> :
                            <img src="/img/anuj.jpg" alt="user-image" width="100%" height={400} style={{borderRadius:"10%"}} srcset="" />
                        }
                    </div>
                    <div className="col-md-6">
                        <ProfileTable title={"Buyer Profile"} user={user}/>
                    </div>
                </div>
             </div>
             </>
    )
}

export default Profile