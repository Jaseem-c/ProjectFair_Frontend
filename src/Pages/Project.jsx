import React, {  useEffect, useState } from 'react'
import Header from '../Components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { getAllProjectsApi } from '../Service/allApi'
function Project() {
 
  // search key
  const [searchKey, setSearchKey] = useState('')
  // to store token
  const [istoken, setIsToken] = useState("")
  // to store all projects
  const [allProject, setAllProject] = useState([])
  const allProjects = async () => {
    const result = await getAllProjectsApi(searchKey)
    setAllProject(result.data)

  }
  // console.log(allProject);

  useEffect(()=>{
    allProjects(searchKey)
  },[searchKey])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(sessionStorage.getItem("token"))
    }
    
  }, [])
  return (
    <>
      <Header />
      <div className="container-fluid my-5">
        <h2 className='text-center my-4'>All Projects</h2>

        {istoken ?
          <div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4 d-flex align-items-center">
                <input type="text" className='form-control' placeholder='Technologies' onChange={(e)=>setSearchKey(e.target.value)} /><FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: "-25px", color: "lightgray" }} />
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row my-4 px-md-5">
              {allProject.length > 0 ? allProject.map((item) => (
                <div className="col-md-4 mt-4 mt-md-0 p-md-5">
                  <ProjectCard project={item}/>
                </div>
              )) : <h2 className='text-danger text-center'>No Project To Show</h2>}
            </div>
          </div>
          :
          <div className='row w-100 mt-5'>
            <div className="col-md-4"></div>
            <div className="col-md-4 d-flex align-items-center justify-content-center flex-column">
              <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" width={"65%"} />
              <h4 className='mt-5 text-center'>Please <Link to={'/login'} className='text-danger'>Login</Link> to Explore More Projects</h4>
            </div>
            <div className="col-md-4"></div>
          </div>}

      </div>
    </>
  )
}

export default Project