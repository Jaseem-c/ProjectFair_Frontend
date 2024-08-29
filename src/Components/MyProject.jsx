import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../Components/AddProject'
import EditProject from '../Components/EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { deleteUserProjectApi, getUserProjectsApi } from '../Service/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, updateResponseContext } from '../Context/ContextShare'
import { ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'

function MyProject() {
  // to store user projects
  const [userProjects, setUserProjects] = useState([])
  // to access addcontext
  const { addResponse } = useContext(addResponseContext)
  // to access update context
  const {updateResponse}=useContext(updateResponseContext)
  // to remove div automaticaly when deleting 
  const [deleteStatus,setDeleteStatus]=useState(false)


  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      // to verify token
      "Authorization": `Bearer ${token}`
    }
    // add response context
    const result = await getUserProjectsApi(reqHeader)
    setUserProjects(result.data)
  }

  // delete project
  const handleDelete=async(id)=>{
     const result= await deleteUserProjectApi(id)
     if(result.status==200)
     {
      toast.success("Project Deleted Successfully")
      setDeleteStatus(true)
     }
     else{
      toast.error("Failed to delete project")
     }
  }

  useEffect(() => {
    getUserProjects()
  }, [addResponse,deleteStatus,updateResponse])
  return (
    <>
      <div className='shadow p-3 p-md-5 mb-4'>
        <div className="d-flex  mt-4">
          <h4 className='text-success me-auto'>My Project</h4>
          <AddProject />
        </div>
        {userProjects.length > 0 ? userProjects.map((item) => (
          <div className='p-3 mt-md-4 mt-3 rounded d-flex align-items-center' style={{ backgroundColor: "rgb(242,242,242)" }} key={item?._id}>
            <h5>{item?.title}</h5>
            <div className='d-flex ms-auto align-items-center'>
              <EditProject project={item} />
              <Link to={item?.website} target='_blank'> <FontAwesomeIcon icon={faGlobe} className='ms-3 text-warning' style={{ cursor: "pointer" }} /></Link>
              <Link to={item?.github} target='_blank'> <FontAwesomeIcon icon={faGithub} className='ms-3 text-success' style={{ cursor: "pointer" }} /></Link>
              <FontAwesomeIcon onClick={()=>handleDelete(item._id)}  icon={faTrash} className='ms-3 text-danger' style={{ cursor: "pointer" }} />
            </div>
          </div>
        )) : <h4 className='text-danger'>No Projects yet added</h4>
        }
      </div>
      <ToastContainer autoClose={3000} theme="colored" position='top-right' />
    </>
  )
}

export default MyProject