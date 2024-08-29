import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
     <div className='container-fluid bg-success'>
        <div className="row w-100 p-5 ">
          <div className="col-md-4">
            <h4 className='text-light mb-4'><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h4>
            <p className='' style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis iste perferendis cupiditate molestias repellendus inventore pariatur beatae officia necessitatibus enim! Assumenda amet deleniti atque tempore architecto porro dolorum repudiandae facilis?</p>
          </div>
          <div className="col-md-2 d-md-flex justify-content-center">
            <div>
              <h4 className='mb-4 text-light' >Links</h4>
              <div>
               <Link to={'/'} > <p style={{color:"black"}}>Home</p></Link>
               <Link to={'/project'}> <p style={{color:"black"}}>Projects</p></Link>
                <Link to={'/dashboard'}><p style={{color:"black"}}>DashBoard</p></Link>
              </div>
            </div>
          </div>
          <div className="col-md-2 d-md-flex justify-content-center">
            <div>
              <h4 className='mb-4 text-light'>Guides</h4>
              <div>
                <p>React</p>
                <p>React Bootstrap</p>
                <p>Bootswatch</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-md-flex justify-content-center">
            <div>
              <h4 className='text-light'>Contact Us</h4>
              <div className="d-flex mt-4">
                <input type="text" className='form-control me-4' placeholder='Email Id' />
                <button className='btn btn-warning'>Subscribe</button>
              </div>
              <div className="d-flex justify-content-between mt-4 text-light">
                <FontAwesomeIcon icon={faInstagram} className='fa-2x' />
                <FontAwesomeIcon icon={faTwitter} className='fa-2x' />
                <FontAwesomeIcon icon={faFacebook} className='fa-2x' />
                <FontAwesomeIcon icon={faLinkedin} className='fa-2x' />
                <FontAwesomeIcon icon={faWhatsapp} className='fa-2x' />
              </div>
            </div>
          </div>
        </div>
     </div>
    </>
  )
}

export default Footer