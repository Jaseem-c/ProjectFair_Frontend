import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, ToastContainer } from 'react-bootstrap'
import { serverUrl } from '../Service/serverUrl';
import { toast } from 'react-toastify';
import { editUserProjectApi } from '../Service/allApi';
import { updateResponseContext } from '../Context/ContextShare';


function EditProject({project}) {

  //  automatic edit
  const {setUpdateResponse}=useContext(updateResponseContext)

  console.log(project);
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleCancel() }
  const handleShow = () => setShow(true);

  const [projectDetails,setProjectDetails]=useState({
    title:project?.title,
    language:project?.language,
    github: project?.github,
    website: project?.website,
    overview: project?.overview,
    projectImg: project?.projectImg
})

// console.log(projectDetails);
// to change the value of key
const [key, setKey] = useState(false)
  // used to store image preview
  const [image, setImage] = useState("")

const handleFile = (e) => {
  // console.log(e.target.files[0]);
  setProjectDetails({...projectDetails, projectImg: e.target.files[0] })
}

useEffect(() => {
  if (projectDetails.projectImg) {
    setImage(URL.createObjectURL(projectDetails.projectImg))
  }
}, [projectDetails.projectImg])


  // to handle cancel button
  const handleCancel = () => {
    setProjectDetails({
      title: project?.title,
      language:project?.language,
      github: project?.github,
      website: project?.website,
      overview: project?.overview,
      projectImg: ""
    })
    setImage("")
    // on click on every cancel
    if (key == false) {
      setKey(true)
    }
    else {
      setKey(false)
    }
  }
  // to handle update
  const handleUpdate =async () => {
    const {title,language,github,website,overview,projectImg} = projectDetails
    if(!title || !language || !github ||!website || !overview)
    {
      toast.info("please fill form completely")
    }
    else{
      const reqBody = new FormData()
      reqBody.append('title', title)
      reqBody.append('language', language)
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      image?reqBody.append("projectImg", projectImg):reqBody.append("projectImg",project?.projectImage)

      // use token
      const token = sessionStorage.getItem("token")
      // console.log(token);
       if (token) {
        if(image)
        {
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            // to verify token
            "Authorization": `Bearer ${token}`
          }
          const result=await editUserProjectApi(project?._id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
           
            toast.success("edited successfully")
            handleClose()
            setUpdateResponse(result.data)
          }
          else{
            toast.error("something went wrond")
          }
          
        }
        else{
          const reqHeader = {
            "Content-Type": "application/json",
             // to verify token
            "Authorization": `Bearer ${token}`
          }
          const result=await editUserProjectApi(project?._id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
           
            toast.success("edited successfully")
            handleClose()
            setUpdateResponse(result.data)
          }
          else{
            toast.error("something went wrond")
          }

        }
      }


    }
  }
  return (
    <>
       <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} className='text-info' style={{cursor:"pointer"}}/>

<Modal show={show} onHide={handleClose} size='lg' centered>
     <Modal.Header closeButton >
       <Modal.Title className='text-success'>Edit Project</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <div className="row w-100">
         <div className="col-md-6 d-flex align-items-center justify-content-center "> 
           <label htmlFor='projectimg'>
             <input type="file" id='projectimg' style={{display:"none"}}  key={key} onChange={(e) => handleFile(e)}/>
             <img src={image?image:`${serverUrl}/Uploads/${project?.projectImage}`} alt="no image" width={"100%"}style={{cursor:"pointer"}} />
           </label>
         </div>
         <div className="col-md-6">
           <div className="mb-3 mt-3 mt-md-0">
             <input type="text" placeholder='Title'  className='form-control' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
           </div>
           <div className="mb-3">
           <input type="text" placeholder='Language' className='form-control' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
           </div>
           <div className="mb-3">
           <input type="text" placeholder='Github' className='form-control' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
           </div>
           <div className="mb-3">
           <input type="text" placeholder='Website' className='form-control' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
           </div>
           <div className="mb-3">
           <textarea  id="" placeholder='Overview' rows={4} className='form-control' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
           </div>
         </div>
       </div>
     </Modal.Body>
     <Modal.Footer>
       <Button variant="warning" onClick={handleCancel}>
         Cancel
       </Button>
       <Button variant="success" onClick={handleUpdate}>
         update
       </Button>
     </Modal.Footer>
   </Modal>
   <ToastContainer autoClose={3000} theme="colored" position='top-right' />
    </>
  )
}

export default EditProject