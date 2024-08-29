import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Collapse, ToastContainer } from 'react-bootstrap'
import { serverUrl } from '../Service/serverUrl';
import { toast } from 'react-toastify';
import { updateProfileApi } from '../Service/allApi';

function Profile() {
  const [open, setOpen] = useState(false);
  // to store profile details
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profile: ""
  })
  const [existingImage, setExistingImage] = useState("")
 
  // to view image
  const [image, setImage] = useState("")
// update status
const [updateStatus,setUpdateStatus] = useState({})
  const handleFile = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] })
  }

  useEffect(() => {
    if (userDetails.profile) {
      setImage(URL.createObjectURL(userDetails.profile))
    }
  }, [userDetails.profile])
  console.log(image);
  
  // handle update
  const handleUpdate = async () => {
    const { username, email, password, github, linkedin, profile } = userDetails

    if (!github || !linkedin) {
      toast.info("please fill form completely")
    }
    else {
      const reqBody=new FormData()
      reqBody.append('username',username)
      reqBody.append('email',email)
      reqBody.append('password',password)
      reqBody.append('github',github)
      reqBody.append('linkedin',linkedin)
      {image?reqBody.append('profile',profile):reqBody.append("profile",existingImage)}
        
        const token = sessionStorage.getItem("token")
        if(token)
        {
          if(image)
          {
            const reqHeader = {
              "Content-Type": "multipart/form-data",
             
              "Authorization": `Bearer ${token}`
            }
            const result=await updateProfileApi(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              
              toast.success("profile Updated successfully")
              sessionStorage.setItem("existingUser",JSON.stringify(result.data))
              setUpdateStatus(result.data)
            }
            else{
            toast.error("something went wrong")
            }
            
          }
          else{
            const reqHeader = {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${token}`
            }
            const result=await updateProfileApi(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              toast.success("profile Updated successfully")
              sessionStorage.setItem("existingUser",JSON.stringify(result.data))
              setUpdateStatus(result.data)
            }
            else{
            toast.error("something went wrong")
            }
            
          }
        }
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({...userDetails,username:user.username,email: user.email, password: user.password, github: user.github, linkedin: user.linkedin})
      setExistingImage(user.profile)    
    }
  },[updateStatus])



  return (
    <>
      <div className="shadow p-3 mb-5" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <div className="d-flex mt-3">
          <h4>Profile</h4>
          <div className='ms-auto'>
            <button className='btn btn-outline-primary  ' onClick={() => setOpen(!open)}>{open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</button>
          </div>
        </div>


        <Collapse in={open}>
          <div>
            <div className="d-flex align-items-center justify-content-center mt-3">
              <label htmlFor='profileimg'>
                <input type="file" id='profileimg' style={{ display: "none" }} onChange={(e) => handleFile(e)}  />
                <div className='d-flex align-items-center justify-content-center'>
                  {existingImage == "" ?
                    <img src={image ? image :"https://cdn-icons-png.flaticon.com/512/9385/9385270.png"} alt="nouuuu image" width={"150px"} height={"150px"} style={{ borderRadius: "50%", cursor: "pointer" }} /> :
                    <img src={image ? image : `${serverUrl}/Uploads/${existingImage}`} alt="no image" width={"150px"} height={"150px"} style={{ borderRadius: "50%", cursor: "pointer" }} />
                  }
                </div>
              </label>
            </div>
            <div className="mb-3 mt-3">
              <input type="text" placeholder='Github' className='form-control' value={userDetails.github} onChange={(e) => setUserDetails({ ...userDetails, github: e.target.value })} />
            </div>
            <div className="mb-3">
              <input type="text" placeholder='LinkedIn' className='form-control' value={userDetails.linkedin} onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })} />
            </div>
            <div className="mb-3">
              <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </Collapse>
      </div>
      <ToastContainer autoClose={3000} theme="colored" position='top-right' />
    </>
  )
}

export default Profile