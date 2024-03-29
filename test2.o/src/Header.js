import './CoursePage.css';
import logo from './Img/logo.png';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeAlt, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';



function Course() {
    const [userName, setUserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPicture, setuserPicture] = useState('');
    const [StudentId, setuserStudentId] = useState('');

    useEffect(() => {
      const storedName = sessionStorage.getItem('Name');
      const storedEmail = sessionStorage.getItem('Email');
      const storedPicture = sessionStorage.getItem('Picture');
      const storedStudentId = sessionStorage.getItem('StudentId');

      if (storedName &&  storedPicture &&  storedEmail &&  storedStudentId) {
          setUserName(storedName);
          setuserEmail(storedEmail);
          setuserPicture(storedPicture);
          setuserStudentId(storedStudentId);
      }
    }, []);
  

  return (
    <div>
        <header className="fixed-top d-flex justify-content-between align-items-center py-6 px-8 p-2 bg-light border-bottom border-dark-subtle">
        <img src={logo}  alt="Logo" height={40} width={100}/>
        <nav className="ms-auto ">
          <Dropdown className="d-flex justify-content-center" >
              <Dropdown.Toggle variant="outline-secondary rounded-pill" id="dropdown-basic" title={userName}>
              <img src={userPicture} height={20} className='me-1 rounded-circle' alt='UserProfile' />
              </Dropdown.Toggle>
              <Dropdown.Menu className='px-2 pt-5 me-5 bg-light'>
                <div className="text-center">
                <Dropdown.Item ><img src={userPicture} height={100}alt='' className='mx-5 rounded-circle'/></Dropdown.Item>
                <Dropdown.Item className='fs-5 fw-bold'>{userName}</Dropdown.Item>
                <Dropdown.Item className=''>{userEmail}</Dropdown.Item>
                <Dropdown.Item className='pb-4'>{StudentId}</Dropdown.Item>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item href="/CoursePage" className='bg-secondary rounded-pill mb-2 text-white' title='Home'><FontAwesomeIcon icon={faHomeAlt} variant="outline-light" className="me-1 mt-2" />Home</Dropdown.Item>
                <Dropdown.Item href="/" className='bg-secondary outline-white rounded-pill mb-2 text-white' title='Logout'><FontAwesomeIcon icon={faSignOut} className="me-1"/>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </nav> 
        </header>
    </div>
  );
}

export default Course;


