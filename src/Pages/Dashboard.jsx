import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProject from '../Components/MyProject'
import Profile from '../Components/Profile'
import { json } from 'react-router-dom'
function Dashboard() {
// store username
const [user,setUser]=useState("")

useEffect(()=>{
  if(sessionStorage.getItem("existingUser"))
  {
    setUser(JSON.parse(sessionStorage.getItem("existingUser")).username)
  }
},[])

console.log(user);

  return (
    <>
    <Header/>
    <div className="container-fluid">
      <h3 className='my-3  ms-md-3'>Welcome <span className='text-warning'>{user?user:"User"}</span></h3>
      <div className="row">
        <div className="col-md-8 px-md-5">
          <MyProject/>
        </div>
        <div className="col-md-4 px-md-5">
          <Profile/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard