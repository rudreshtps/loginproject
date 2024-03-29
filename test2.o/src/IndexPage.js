import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from './Header'; // Assuming you have a Header component
import "./IndexPage.css"; // Assuming you have a CSS file for styling

function IndexPage() {
 const [data, setData] = useState({}); // Initialize data as an object
 const navigate = useNavigate();
 const [progressId, setProgressId] = useState(null);
 const [studentId, setStudentId] = useState('');
 const [course, setCourse] = useState('');

 useEffect(() => {
    const storedStudentId = sessionStorage.getItem('StudentId');
    const storedCourse = sessionStorage.getItem('course');

    if (storedStudentId && storedCourse) {
      setStudentId(storedStudentId);
      setCourse(storedCourse);
      console.log('StudentID :', storedStudentId);
      console.log('Course :', storedCourse);
    }

    const fetchData = async () => {
      try {
        let url = `http://127.0.0.1:8000/course/${sessionStorage.getItem('course')}/${sessionStorage.getItem('StudentId')}`;
        console.log(url);        
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData); // Set the data as an object
        console.log(jsonData);
        setProgressId(jsonData.progress_id); // Directly access progress_id
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
    fetchData();
 }, []);

 const handleCertificate = () => {
    navigate('/CertificatePage');
 }

 const handleStartRevision = (chapterId) => {
  
  navigate('/TheoryPage');
  // Your logic for handling start/revision
  console.log("CurrentChapter:", chapterId);
  sessionStorage.setItem( 'currentChapter', chapterId );

  // Find the index of the current chapter
  const currentChapterIndex = allChapters.findIndex(chapter => chapter.Concept === chapterId);
  // Determine if there is a next chapter
  if (currentChapterIndex < allChapters.length - 1) {
      // Get the next chapter's Concept
      const nextChapterId = allChapters[currentChapterIndex + 1].Concept;
      console.log("NextChapter:", nextChapterId);
      sessionStorage.setItem( 'nextChapter', nextChapterId );

  } else {
      console.log("Completed");
  }
};


 // Flatten chapters into a single array for easier processing
 const allChapters = data.Sections?.flatMap(section => section.Chapters) || [];

 // Determine the index of the current chapter
 const currentChapterIndex = allChapters.findIndex(chapter => chapter.Concept === progressId);

 return (
    <div className="main">
      <Header />
      <Container className="container px-1">
        <Row className="justify-content-center mt-5 pb-5">
          <Col xs={12} sm={8} md={12}>
            <Card className="rounded-xl mt-5 border border-white rounded">
              <Card.Body className="CardBody">
                {data.SyllabusName && (
                 <div>
                    <Card.Header className="syllabusName pb-3 container d-flex justify-content-center">
                      <h2 className="mb-2">Syllabus Name: {data.SyllabusName}</h2>
                    </Card.Header>
                    <h4 className="d-flex justify-content-center mb-3 pb-2 mt-3 border-bottom">{data.Subject}</h4>
                    {data.Sections.map((section, sIndex) => (
                      <div key={sIndex}>
                        <h5 className="mt-4">{section.Name}</h5>
                        <ul className="list-group list rounded">
                          {section.Chapters.map((chapter, cIndex) => {
                            const chapterIndex = allChapters.findIndex(c => c.Concept === chapter.Concept);
                            const isCurrentChapter = chapterIndex === currentChapterIndex;
                            const isBeforeCurrentChapter = chapterIndex < currentChapterIndex;

                            // Determine which button to display and its class
                            let buttonText = null;
                            let buttonClass = null;
                            if (progressId === "New User" && chapterIndex === 0) {
                              buttonText = "Start";
                              buttonClass = "btn-outline-success";
                            } else if (progressId === "Certified User") {
                              buttonText = "Revision";
                              buttonClass = "btn-outline-secondary";
                            } else if (isCurrentChapter) {
                              buttonText = "Start";
                              buttonClass = "btn-outline-success";
                            } else if (isBeforeCurrentChapter) {
                              buttonText = "Revision";
                              buttonClass = "btn-outline-secondary";
                            }

                            return (
                              <li key={cIndex} className="list-group-item mb-1 ms-3 d-flex justify-content-between align-items-center lists">
                                <span>{chapter.Name}</span>
                                {buttonText && (
                                 <button className={`btn ${buttonClass} btn-sm px-3`} onClick={() => handleStartRevision(chapter.Concept, chapter.Concept)}>
                                 {buttonText}
                                 </button>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                 </div>
                )}
                {progressId === "Certified User" && (
                 <div className="container d-flex justify-content-center mt-4">
                    <button className="btn btn-success" onClick={handleCertificate}>Certificate</button>
                 </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
 );
}

export default IndexPage;
