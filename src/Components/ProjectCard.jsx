import React, { useState } from 'react'
import {  Card, Col, Modal, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { serverUrl } from '../Service/serverUrl';
function ProjectCard({project}) {
  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='w-100' >
      <Card style={{ width: '100%', cursor: "pointer" }} className='shadow border-0' onClick={handleShow}>
        <Card.Img variant="top" src={`${serverUrl}/Uploads/${project?.projectImage}`} />
        <Card.Body>
          <Card.Title className='text-center'>{project?.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src={`${serverUrl}/Uploads/${project?.projectImage}`} alt="no image" style={{width:"100%"}} />
            </Col>
            <Col md={6}>
            <h5 className='mt-3 mt-md-0'>Description</h5>
            <p style={{textAlign:"justify"}}>{project?.overview}</p>
            <h5 className='mt-4'>Technologies</h5>
            <p>{project?.language}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
       <Link to={project?.github} target='_blank'> <FontAwesomeIcon icon={faGithub} className='fa-2x text-info' /></Link>
       <Link to={project?.website} target='_blank'> <FontAwesomeIcon icon={faLink} className='fa-2x text-info' /></Link>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProjectCard