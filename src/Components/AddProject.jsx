import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../Service/allApi';
import { addResponseContext } from '../Context/ContextShare';
function AddProject() {
// to access context
const {setAddResponse}=useContext(addResponseContext)



  const [show, setShow] = useState(false);
  //  states to store project details
  const [projectdDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImg: ""
  })

  const handleClose = () => {
    handleCancel()
    setShow(false);
  }
  const handleShow = () => setShow(true);


  //  function to handle file(image) submission
  // used to store image preview
  const [image, setImage] = useState("")
  // to change the value of key
  const [key, setKey] = useState(false)
  

  const handleFile = (e) => {
    // console.log(e.target.files[0]);
    setProjectDetails({ ...projectdDetails, projectImg: e.target.files[0] })
  }
  console.log(projectdDetails);


  // useffect to show image when uploading
  useEffect(() => {
    if (projectdDetails.projectImg) {
      setImage(URL.createObjectURL(projectdDetails.projectImg))
    }
  }, [projectdDetails.projectImg])

  // to handle cancel button
  const handleCancel = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
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
  // to add project details
  const handleAdd = async () => {
    // console.log(projectdDetails);
    const { title, language, github, website, overview, projectImg } = projectdDetails
    if (!title || !language || !github || !website || !overview || !projectImg) {
      toast.info("Please fill form completely")
    }
    else {
      // formData class is used to send request with uploaded content
      // 1)create object
      const reqBody = new FormData();
      // append()- to add data to object
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      reqBody.append("projectImg", projectImg);

      // use token
      const token = sessionStorage.getItem("token")
      // console.log(token);

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          // to verify token
          "Authorization": `Bearer ${token}`
        }

        const result = await addProjectApi(reqBody, reqHeader) // uploaded content must be shared in the format of form-data (cannot send projectdetails)
        console.log(result);
        if (result.status == 200) {
          setAddResponse(result.data)
          toast.success("Project Added Successfully")
         handleClose()
        }
        else {
          toast.error("Failed to add project")
          handleClose()

        }

      }

    }
  }

  return (
    <>
      <button className='btn btn-success mb-3 mb-md-0' onClick={handleShow}>Add Project</button>

      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton >
          <Modal.Title className='text-success'>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row w-100">
            <div className="col-md-6 d-flex align-items-center justify-content-center ">
              <label htmlFor='projectimg'>
                <input type="file" id='projectimg' style={{ display: "none" }} key={key} onChange={(e) => handleFile(e)} />
                <img src={image ? image : "https://cdn-icons-png.freepik.com/256/6631/6631821.png?semt=ais_hybrid"} alt="no image" width={"100%"} style={{ cursor: "pointer" }} />
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3 mt-md-0">
                <input type="text" placeholder='Title' className='form-control' value={projectdDetails.title} onChange={(e) => setProjectDetails({ ...projectdDetails, title: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Language' className='form-control' value={projectdDetails.language} onChange={(e) => setProjectDetails({ ...projectdDetails, language: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Github' className='form-control' value={projectdDetails.github} onChange={(e) => setProjectDetails({ ...projectdDetails, github: e.target.value })} />
              </div>
              <div className="mb-3">
                <input type="text" placeholder='Website' className='form-control' value={projectdDetails.website} onChange={(e) => setProjectDetails({ ...projectdDetails, website: e.target.value })} />
              </div>
              <div className="mb-3">
                <textarea id="" placeholder='Overview' rows={4} className='form-control' value={projectdDetails.overview} onChange={(e) => setProjectDetails({ ...projectdDetails, overview: e.target.value })} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme="colored" position='top-right' />
    </>
  )
}

export default AddProject