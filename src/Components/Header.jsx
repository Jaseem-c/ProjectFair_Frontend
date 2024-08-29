import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { isLoginAuthContext } from '../Context/ContextShare'

function Header() {
  const navigate=useNavigate('')
  const [token,setToken]=useState("")

  // to secure path

  const {setLoginStatus}=useContext(isLoginAuthContext)

  const logout=()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setLoginStatus(false)
    navigate('/')
  }

useEffect(()=>{
  if(sessionStorage.getItem("token"))
  {
    setToken(sessionStorage.getItem("token"))
  }
},[])

  return (
   <>
   <Navbar  className="bg-success">
      <Container>
        <Navbar.Brand href="#home" className='text-light fs-4 ' as={Link} to={'/'}><FontAwesomeIcon icon={faStackOverflow} className='me-2 fs-1' />Project Fair</Navbar.Brand>
       {token?<button className='btn btn-warning' onClick={logout}><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>:null}
      </Container>
    </Navbar>
   </>
  )
}

export default Header