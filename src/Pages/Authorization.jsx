import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {  useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import {  loginApi, registerApi } from '../Service/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoginAuthContext } from '../Context/ContextShare'

function Authorization({ register }) {


  // secure the path
  const {setLoginStatus}=useContext(isLoginAuthContext)

  // navigate
  const navigate = useNavigate()
  // used to store user details
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  // regsiter
  const handleregister = async (e) => {
    e.preventDefault()
    const result = await registerApi(userDetails)
    // console.log(result)

    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info("please fill form completely")
    }
    else {
      if (result.status == 200) {
        toast.success("Registration Successfull")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        console.log(userDetails);
        
        navigate('/login')
      }
      else {
        toast.error("user Already Exist")
      }
    }
  }

  // console.log(userDetails);
  // login
  const handlelogin=async(e)=>{
    e.preventDefault()
    const {email,password}=userDetails
    

    if(!email || !password)
    {
      toast.info("please fill form completely")
    }
    else{
      const result= await loginApi({email,password})
      // console.log(result);
      
      if(result.status==200)
      {
        toast.success("Login Successfull")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)
      setLoginStatus(true)
      navigate('/')
      }
      else{
        toast.error("Invalid Email or Password")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }

  }

 
  return (
<>
  
      <div style={{ width: "100%", height: "100vh" }} className='d-flex align-items-center justify-content-center'>
        <div className="container w-75">
          <Link to={'/'} style={{ textDecoration: "none" }}><h4 className='text-warning' ><FontAwesomeIcon icon={faArrowLeft} />Back Home</h4></Link>
          <div className='bg-success p-3 p-md-5'>
            <Row>
              <Col md={6} className='d-flex align-items-center justify-content-center' >
                <img src="https://cdn-icons-png.flaticon.com/256/3293/3293466.png" alt="" width={"70%"} />
              </Col>
              <Col md={6} className='d-flex align-items-center justify-content-center p-3 p-md-5'>
                <form className='mt-3 mt-md-0 w-100 '>
                  <h3 className='text-light text-center'><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h3>
                  {register ? <h6 className='text-light text-center'>Sign up to your Account</h6> :
                    <h6 className='text-light text-center'>Sign in to your Account</h6>}
                  {register && <div className="mb-3 mt-3 mt-md-4">
                    <input type="text" className='form-control' placeholder='Username' value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
                  </div>}
                  <div className="mb-3 mt-3 mt-md-4">
                    <input type="text" placeholder='Email Id ' className='form-control'  value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <input type="text" placeholder='Password' className='form-control' value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    {register ? <div>
                      <button type='button' className='btn btn-warning w-100' onClick={handleregister}>Register</button>
                      <p className='mt-3'>Already a user? Click Here to <Link to={'/login'} style={{ color: 'white', textDecoration: "none" }}>login</Link></p>
                    </div> :
                      <div>
                        <button type='button' className='btn btn-warning w-100' onClick={handlelogin}  >Login</button>
                        <p className='mt-3'>New User? Click Here to <Link to={'/register'} style={{ color: 'white', textDecoration: "none" }}>Register</Link></p>
                      </div>}
                  </div>
  
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} theme="colored" position='top-right'  />
</>
  )
}

export default Authorization