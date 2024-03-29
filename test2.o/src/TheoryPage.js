import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./TheoryPage.css";
import Header from './Header'

function TheoryPage() {
  const [ChapterName, setChapterName] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/ExercisePage");
  };

  const handlePrevious = () => {
    navigate("/Demo");
  };

  useEffect(() => {
    const storedChapterName = sessionStorage.getItem("ChapterName");

    if ((storedChapterName)) {
      setChapterName(storedChapterName);
    }
  }, []);

  return (
    <div>
      <Header />
      <Container className="container px-1">
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={8} md={12}>
            <Card className="rounded-xl mt-5 border border-white rounded">
              <Card.Header className="theoryHeader bg-info pb-3 border border-info border-2">
                <h3>Theory : {ChapterName}</h3>
              </Card.Header>
              <iframe
                src="https://www.youtube.com/embed/7S_tz1z_5bA"
                height="470"
                title="YouTube video player"
              />
              <Card.Footer className="d-flex justify-content-between ">
                <Button
                  variant="outline-info"
                  className="border border-secondary"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Button
                  variant="outline-info"
                  className="border border-secondary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TheoryPage;
