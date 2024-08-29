import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import developer from '../assets/Developer.png'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { getHomeProjectsApi } from '../Service/allApi'
function Home() {
  // to store token
  const [token, setToken] = useState("")
  // to store home projects
  const [homeProjects,setHomeProjects]=useState([])

  // to get home projects
  const getHomeprojects = async () => {
    const result = await getHomeProjectsApi()
    setHomeProjects(result.data)

  }
  console.log(homeProjects);
  

  //  to sote token
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    getHomeprojects()
  }, [])

  return (
    <>
      <div className="container-fluid bg-success p-4 mb-4" style={{ width: "100%", height: "100%" }}>
        <Row>
          <Col md={6} className='d-flex align-items-center justify-content-center'>
            <div>
              <h1 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h1>
              <h6 className='mt-3'>One stop destination for all software Projects</h6>
              {!token ? <Link to={'/login'}> <button className='btn btn-outline-light mt-4'>Get Started <FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button></Link> :
                <Link to={'/dashboard'}><button className=' ms-2 btn btn-outline-light mt-4'>Manage Projects <FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button></Link>}
            </div>
          </Col>
          <Col md={6} className='d-flex align-items-center justify-content-center'>
            <img src={developer} alt="" width={"100%"} />
          </Col>
        </Row>
      </div>
      {/* explore project section */}
      <div className="container-fluid">
        <h1 className='text-center mt-5 my-3'>Explore Our Projects</h1>
        <div className="row mb-5">
         {homeProjects?.length>0?homeProjects?.map((item)=>(
          <div className="col-md-4 d-flex justify-content-center mt-4 mt-md-0 p-md-5 ">
          <ProjectCard  project={item}/>
        </div>
         )) :null }
        </div>
        <Link to={'/project'} className='text-danger'><h5 className='text-center my-5'>See More Projects</h5></Link>
      </div>
    </>
  )
}

export default Home