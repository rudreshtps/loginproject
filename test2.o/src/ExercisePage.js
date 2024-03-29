import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container,Row,Col, Card, ProgressBar} from "react-bootstrap";
import "./ExercisePage.css";
import Header from './Header'

function ExercisePage() {
  const [ChapterId, setChapterId] = useState("");
  const [nextChapterId, setnextChapterId] = useState("");
  const [score, setScore] = useState(0);
  const [course, setCourse] = useState('');
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [showAnswerButton, setShowAnswerButton] = useState(true);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);


  const TotalQuestions = jsonData ? jsonData.length : 0;

  sessionStorage.setItem("TotalQuestions", TotalQuestions);

  const progress =
    ((currentQuestionIndex + 1) / (jsonData ? jsonData.length : 1)) * 100;
    
    useEffect(() => {
      const storedChapterId = sessionStorage.getItem("currentChapter");
      const storedCourse = sessionStorage.getItem("course");
      const storedStudentId = sessionStorage.getItem("StudentId");
      const storedNextChapterId = sessionStorage.getItem("nextChapter");
      if ( storedChapterId &&  storedCourse &&  storedStudentId &&  storedNextChapterId ) {
        setChapterId(storedChapterId);
        setCourse(storedCourse);
        setStudentId(storedStudentId);
        setnextChapterId(storedNextChapterId);
      }

      const fetchData = async () => {
        try {
		  let url = `http://127.0.0.1:8000/exercise/${storedChapterId}/${storedStudentId}`;
          const response = await fetch(url);
          const data = await response.json();

          const endQuestionId = data[0].questionId>= data[1].length;
  
          if (endQuestionId ) {
            setCurrentQuestionIndex(0);
          } else {
            const questionIdNumber =parseInt(data[0].questionId);
            setCurrentQuestionIndex(questionIdNumber );
          }
  
          setJsonData(data[1]);
        } catch (error) {
          console.error('Error fetching JSON data:', error);
        }
      };
  
      fetchData();
    }, []);

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };

 const handleNextQuestion = () => {
      if (currentQuestionIndex === jsonData.length - 1) {
        setShowNextButton(false);
        setShowFinishButton(true);
      } else {
        setSelectedOption(null);
        setExplanation(null);
        const updatedOptions = jsonData[currentQuestionIndex].Option.map(option => ({
          ...option,
          backgroundColor: 'white'
        }));
        setJsonData(prevData => {
          const newData = [...prevData];
          newData[currentQuestionIndex].Option = updatedOptions;
          return newData;
        });
    
        setShowAnswerButton(true);
        setShowNextButton(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswerSubmitted(false); 
      }
    };
    

    const handleAnswerSelection = () => {
      const selectedOptionData = jsonData[currentQuestionIndex].Option.find(option => option.Opt === selectedOption);
      const isCorrectAnswer = selectedOptionData && selectedOptionData.Type === 'SNP_OPTA';
      let correctAnswer = jsonData[currentQuestionIndex].Option.find(option => option.Type === 'SNP_OPTA').Opt;
      let questionId;
  
      const updatedOptions = jsonData[currentQuestionIndex].Option.map(option => ({
        ...option,
        backgroundColor: option.Type === 'SNP_OPTA' ? 'green' : option.Opt === selectedOption ? 'red' : 'white'
      }));  
      setJsonData(prevData => {
        const newData = [...prevData];
        newData[currentQuestionIndex].Option = updatedOptions;
        return newData;
      });      
      if (!isCorrectAnswer && jsonData[currentQuestionIndex].Expl) {
        setExplanation(jsonData[currentQuestionIndex].Expl.map(explanation => explanation.SL).join('\n'));
      } else {
        setExplanation(null); 
      }  
      setShowAnswerButton(false);
      setShowNextButton(true);
      setAnswerSubmitted(true); 
      const Score = isCorrectAnswer ? 1 : 0;
      if (isCorrectAnswer) {
        setScore(prevScore => prevScore + 1);
      }
      sessionStorage.setItem("Score", String(score + Score));
      sessionStorage.setItem("correct_answer", jsonData[currentQuestionIndex].Option.find(option => option.Type === 'SNP_OPTA').Opt);
      sessionStorage.setItem("entered_answer", selectedOption);

		questionId = currentQuestionIndex + 1;
		
        console.log('questionId :', questionId);
        console.log('correct_answer :', correctAnswer);
        console.log('entered_answer', selectedOption);
        console.log('score :', score);
        console.log('course :', sessionStorage.getItem("course"));
        console.log('conceptId ;', sessionStorage.getItem("currentChapter"));
        console.log('studentId :', studentId);

        const postJsonData = {
          questionId : questionId,
          correct_answer : correctAnswer,
          entered_answer : selectedOption,
          course : course,
          score :Score,
          conceptId : ChapterId,
          studentId : studentId
        }
        console.log('sending json data', postJsonData)
       console.log("=========================")     
        fetch('http://127.0.0.1:8000/exercise/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify(postJsonData)
          }).then((response) => {
              if (response.ok) {
                  console.log('Data sent successfully');
              } else {
                  console.log('Failed to send Data. Status:', response.status);
              }
          }).catch((err) => {
              console.log('Error sending Data:', err);
          });
    };
      const handleFinish = () => {
        alert('Quiz finished!');
        const url = `http://127.0.0.1:8000/exercise/finish/${course}/${nextChapterId}/${studentId}`;
        console.log(url)
        axios.post(url)
        .then(response => {
          if (response && response.ok) {
            console.log('CurrentChapter selection sent to backend:', nextChapterId);

            navigate('/ChapterSummaryPage');
          } else {
            console.error('Error sending course selection:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error sending course selection:', error);
        });
        navigate("/ChapterSummaryPage");
      };

  return (
    <div>
      <Header />
      <Container className="container px-1">
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={8} md={12}>
            <Card className="rounded-xl mt-5 border border-white rounded">
              <Card.Header className="exerciseHeader">
                <h3 className="pb-4">Exercise : {}</h3>
                <ProgressBar
                  className=" border border-3 rounded-pill "
                  animated
                  now={progress}
                  variant="secondary"
                />
                <div className="ps-2">
                  {jsonData && (
                    <div>
                      <p>
                        {" "}
                        Questions: {currentQuestionIndex + 1} of{" "}
                        {jsonData.length}
                      </p>
                    </div>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <div>
                  {jsonData ? (
                    <div>
                      <h1 className="pb-2">Question</h1>
                      <div className="pb-3 fs-5"><b>{jsonData[currentQuestionIndex].Qn}</b> </div>
                      {jsonData[currentQuestionIndex].Option && jsonData[currentQuestionIndex].Option.map((option, index) => (
                        <div key={index} className="form-check pt-2">
                          <input
                            type="radio"
                            id={`option${index}`}
                            name="options"
                            value={option.Opt}
                            checked={selectedOption === option.Opt}
                            onChange={handleOptionChange}
                            className="form-check-input"
                            disabled={answerSubmitted} // Disabling the radio option if answer has been submitted
                          />
                          <label
                            htmlFor={`option${index}`}
                            className={`form-check-label ${selectedOption === option.Opt ? 'selectedOption' : ''}`}
                            style={{ backgroundColor: option.backgroundColor }}
                          >
                            {option.Opt}
                          </label>
                        </div>
                      ))}
                      {explanation && (
                        <div>
                          <h3>Explanation:</h3>
                          <p>{explanation}</p>
                        </div>
                      )}
                      <Card.Footer className="d-flex justify-content-end mt-5">
                        {selectedOption !== null && showAnswerButton && (
                          <button onClick={handleAnswerSelection} className="btn btn-outline-success mr-2"> Answer</button>
                        )}
                        {showNextButton && (
                          <button onClick={handleNextQuestion} className="btn btn-outline-primary">Next</button>
                        )}
                        {showFinishButton && (
                          <button onClick={handleFinish} className="btn btn-outline-primary">Finish</button>
                        )}
                      </Card.Footer>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ExercisePage;



