import './CoursePage.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


function Course() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [studentId, setStudentId] = useState('');
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem('Name');
    const storedEmail = sessionStorage.getItem('Email');
    const storedPicture = sessionStorage.getItem('Picture');
    const storedStudentId = sessionStorage.getItem('StudentId');


  

    if (storedName && storedEmail && storedPicture && storedStudentId) {
      setUserName(storedName);
      setUserEmail(storedEmail);
      setUserPicture(storedPicture);
      setStudentId(storedStudentId);
    }

    // Fetch course data from backend
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/course/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCourseSelection = (courseName) => {
    sessionStorage.setItem('course', courseName);
    navigate('/IndexPage');
    // const url = `http://your-backend-api.com/course-selection/${studentId}`;
    // axios.post(url, { course: courseName })
    //   .then(response => {
    //     console.log('Course selection sent to backend:', courseName);
    //   })
    //   .catch(error => {
    //     console.error('Error sending course selection:', error);
    //   });

  };

  return (
    <div>
    <Header />
      <div className="container mt-5 pt-1 mb-5">
        <h1 className="headingTag text-center mt-5  mb-5 p-2">Choose a Course</h1>
        <div className="row">
          {courses.map(course => (
            <div key={course.courseId} className="col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
              <div  style={{ textDecoration: 'none' }} onClick={() => handleCourseSelection(course.courseName)}>
                <div className="cardContent card">
                  <img
                    src={course.path}
                    className="card-img-top"
                    alt={course.courseName}
                    height={200}
                  />
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title text-center">{course.courseName}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Course;
