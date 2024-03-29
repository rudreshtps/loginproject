import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./ChapterSummaryPage.css";
import Header from './Header'

function ChapterSummaryPage() {
  const [ChapterName, setChapterName] = useState("");
  const [score, setScore] = useState("");
  const [TotalQn, setTotalQn] = useState("");

  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/IndexPage");
  };

  useEffect(() => {
    const storedChapterName = sessionStorage.getItem("ChapterName");
    const storeScore = sessionStorage.getItem("Score");
    const storeTotalQn = sessionStorage.getItem("TotalQuestions")
    // Set user's data to state
    if (storedChapterName &&  storeScore &&  storeTotalQn) {
      setChapterName(storedChapterName)
      setScore(storeScore)
      setTotalQn(storeTotalQn)
    }
  }, []);

  return (
    <div>
      <Header />
      <Container className="container px-1">
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={8} md={12}>
            <Card className="rounded-xl mt-5 border border-white rounded pt-5">
              <Card.Header className="ChapterHeader pb-3 pt-4 d-flex justify-content-center bg-success">
                <h3>Summary : {ChapterName} </h3>
              </Card.Header>
              <Card.Body className="d-flex justify-content-center mt-5 pt-5 mb-5 pb-5">
                <pre>
                  You have given <b>{score}</b> correct answer out of <b>{TotalQn}</b>
                  <br />
                  <br />
                  <h5 className="text-center"> Score is {score}</h5>
                </pre>
              </Card.Body>
              <Card.Footer className="ChapterFooter d-flex justify-content-center ">
                <Button variant="outline-success" onClick={handleDone}>
                  Done
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChapterSummaryPage;
