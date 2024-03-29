import React, { useEffect, useState } from 'react';
import logo from './Img/logo.png';

const CertificatePage = () => {

    const currentDate = new Date().toLocaleDateString();

    function downloadCertificate() {
    window.print();
  }
     
    useEffect(() => {
      const storedName = sessionStorage.getItem('Name');
      const storedStudentId = sessionStorage.getItem('StudentId');
      const storedCourse = sessionStorage.getItem('course');
    }, []);



 return (
    <div className="container mt-5 pt-5">
      <div className="card shadow-lg">
        <div className="card-body">
        <div className='d-flex justify-content-between'>
            <img src={logo}  alt="Logo" height={40} width={100}/>
            <p className="text-start ">StudentId : <span className='text-primary'>{sessionStorage.getItem('StudentId')}</span></p>
        </div>
          <h1 className="text-center mb-4">Certificate of Completion</h1>
          <p className="text-center">This is to certify that</p>
          <h3 className="text-center mb-4">{sessionStorage.getItem('Name')}</h3>
          <p className="text-center">has successfully completed the course</p>
          <h4 className="text-center mb-4 text-success-emphasis">{sessionStorage.getItem('course')}</h4>
          <p className="text-center ">on <span className='text-primary'>{currentDate}</span></p>
          <div className="text-end mt-5">
            {/* <img src="[Image URL]" alt="Signature" style={{width: '200px'}} /> */}
            <p>Signature</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
            <button className="btn btn-outline-primary" onClick={downloadCertificate}>Download Certificate</button>
          </div>
    </div>
 );
};

export default CertificatePage;
