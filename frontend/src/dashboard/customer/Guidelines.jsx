import React, { useState, useEffect } from "react";
import CustomerNavbar from "./CustomerNavbar";
import { Container, Row, Col, Card, Button, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import CustomerFooter from "./CustomerFooter";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const cardData = [
  {
    title: "🔥 Fire Emergency",
    dos: ["Use stairs", "Call emergency services", "Inform others"],
    donts: ["Don't use the lift", "Don't panic", "Don't ignore alarms"],
  },
  {
    title: "⚡ Electricity Failure",
    dos: ["Stay calm", "Use emergency button", "Wait for help"],
    donts: ["Don't force doors", "Don't shout continuously", "Don't panic"],
  },
  {
    title: "🌍 Earthquake",
    dos: ["Stay inside", "Hold handrails", "Call help after shaking stops"],
    donts: ["Don't exit mid-quake", "Don't jump", "Don't press all buttons"],
  },
  {
    title: "🚪 Lift Stuck",
    dos: ["Press alarm", "Call support", "Conserve phone battery"],
    donts: ["Don't pry doors", "Don't climb out", "Don't panic"],
  },
  {
    title: "💧 Water Leakage",
    dos: ["Alert building staff", "Avoid using the lift", "Mark area"],
    donts: ["Don't step in water", "Don't operate buttons", "Don't ignore"],
  },
];

const quizData = [
  {
    question: "What should you do if the lift stops during an earthquake?",
    options: ["Exit immediately", "Jump up and down", "Stay inside and hold on"],
    correct: 2,
  },
  {
    question: "In case of fire, what should you avoid?",
    options: ["Call fire service", "Use elevator", "Help others"],
    correct: 1,
  },
  {
    question: "If lift stops due to power cut, you should:",
    options: ["Scream loudly", "Press emergency button", "Open doors"],
    correct: 1,
  },
  {
    question: "During water leakage in lift shaft:",
    options: ["Use the lift quickly", "Avoid the area and report", "Ignore it"],
    correct: 1,
  },
  {
    question: "What's the right action if the lift gets stuck?",
    options: ["Break the glass", "Jump", "Stay calm and call for help"],
    correct: 2,
  },
  {
    question: "If smoke is seen inside lift, you should:",
    options: ["Continue using it", "Step out and report immediately", "Ignore it"],
    correct: 1,
  },
  {
    question: "What to do before using a lift during rain?",
    options: ["Dry your feet", "Ignore and walk in", "Jump in quickly"],
    correct: 0,
  },
  {
    question: "Lift door is half open and not moving. What should you do?",
    options: ["Enter carefully", "Push it forcefully", "Stay out and call maintenance"],
    correct: 2,
  },
  {
    question: "Emergency button in lift is meant for:",
    options: ["Turning on fan", "Changing music", "Calling help in emergency"],
    correct: 2,
  },
  {
    question: "When using lift during minor tremors, you should:",
    options: ["Exit and take stairs", "Ride fast", "Jump inside"],
    correct: 0,
  },
];

function Guidelines() {
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [score, setScore] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (qIndex, optionIndex) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const calculateScore = () => {
    const correct = answers.filter((ans, i) => ans === quizData[i].correct);
    setScore(correct.length);

    const wrongs = quizData
      .map((q, i) => ({
        question: q.question,
        selected: answers[i],
        correct: q.correct,
        options: q.options,
      }))
      .filter((q) => q.selected !== null && q.selected !== q.correct);

    setWrongAnswers(wrongs);
  };

  return (
    <>
      <CustomerNavbar />
      <div style={{ background: "#f4f6f8", padding: "2rem 0" }} className="text-center">
        <h1 className="animate__animated animate__fadeInDown" style={{ color: "black" }}>
          Emergency Lift Safety Guide – <span style={{ color: "red", fontWeight: "bold" }}>Abhi</span>
          <span style={{ color: "blue", fontWeight: "bold" }}>Nik</span>
        </h1>
      </div>

      <Container className="mb-5 p-3 mt-3" style={{ background: "#f0f1f3", borderRadius: "10px" }}>
        <p className="text-center" style={{ fontSize: "17px" }}>
          This interactive guide helps you understand proper lift usage during emergencies through short cards and a quick quiz.
        </p>
      </Container>

      <Container className="mb-5">
        <Row className="g-4">
          {cardData.map((card, idx) => (
            <Col
              key={idx}
              xs={12}
              sm={6}
              md={4}
              className="animate__animated animate__fadeInUp"
              style={{ animationDelay: `${idx * 0.2}s`, animationFillMode: "forwards" }}
            >
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front d-flex justify-content-center align-items-center bg-white shadow p-4 rounded">
                    <h5 className="text-center">{card.title}</h5>
                  </div>
                  <div className="flip-card-back bg-white shadow p-3 rounded">
                    <h6 style={{ color: "#14532d" }}>✅ Do's</h6>
                    <ul className="do-list">
                      {card.dos.map((item, i) => (
                        <li key={i}>
                          <FaCheckCircle className="icon" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <h6 className="mt-3" style={{ color: "#7f1d1d" }}>❌ Don'ts</h6>
                    <ul className="dont-list">
                      {card.donts.map((item, i) => (
                        <li key={i}>
                          <FaTimesCircle className="icon" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {!showQuiz && (
        <Container className="text-center mb-5">
          <h4 className="mb-3">Want to test your knowledge of lift safety scenarios?</h4>
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={() => setShowQuiz(true)} className="w-50">
              Start Quiz
            </Button>
          </div>
        </Container>
      )}

      {showQuiz && (
        <Container className="mb-5">
          <h3 className="text-center mb-4" style={{ color: "#2c3e50" }}>
            Quick Safety Quiz
          </h3>
          {quizData.map((q, index) => (
            <Card key={index} className="mb-4 shadow-sm quiz-card">
              <Card.Body>
                <strong>
                  {index + 1}. {q.question}
                </strong>
                <ButtonGroup className="d-flex mt-3 flex-column flex-md-row">
                  {q.options.map((opt, optIdx) => (
                    <ToggleButton
                      key={optIdx}
                      id={`q-${index}-opt-${optIdx}`}
                      type="radio"
                      variant={answers[index] === optIdx ? "outline-success" : "outline-secondary"}
                      name={`q-${index}`}
                      value={optIdx}
                      checked={answers[index] === optIdx}
                      onChange={() => handleSelect(index, optIdx)}
                      className="mb-2 mb-md-0 me-md-2 quiz-toggle-btn"
                    >
                      {opt}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Card.Body>
            </Card>
          ))}
          <div className="text-center">
            <Button
              variant="primary"
              onClick={calculateScore}
              style={{ width: "50%" }}
              className="quiz-submit-btn"
            >
              Submit
            </Button>
          </div>
        </Container>
      )}

      {score !== null && (
        <Container className="text-center mb-5 animate__animated animate__fadeInUp">
          <h4 style={{ color: "#2c3e50" }}>
            You scored {score} out of {quizData.length}
          </h4>
          {score < 5 ? (
            <p style={{ color: "#c0392b" }}>Keep learning — your safety matters!</p>
          ) : (
            <p style={{ color: "#27ae60" }}>Great job! You’re well informed.</p>
          )}

          {wrongAnswers.length > 0 && (
            <div className="mt-4 text-start">
              <h5 className="text-danger mb-3">Review Incorrect Answers:</h5>
              {wrongAnswers.map((item, i) => (
                <Card key={i} className="mb-3">
                  <Card.Body>
                    <strong>{i + 1}. {item.question}</strong>
                    <p className="mt-2">
                      <span style={{ color: "red" }}>
                        Your answer: {item.options[item.selected]}
                      </span>
                      <br />
                      <span style={{ color: "green" }}>
                        Correct answer: {item.options[item.correct]}
                      </span>
                    </p>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Container>
      )}

      <footer className="text-center mt-5 mb-3 text-muted" style={{ fontSize: "14px" }}>
        An informed user is a safe user — let’s make elevators safer, one scenario at a time.
      </footer>

      <style>{`
  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 300px;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .flip-card-back {
    transform: rotateY(180deg);
    overflow-y: auto; /* ✅ changed to allow internal scrolling */
    max-height: 300px; /* ✅ ensures consistent size */
  }

  .do-list,
  .dont-list {
    list-style: none;
    padding-left: 0;
    padding: 10px 15px;
    margin: 0;
    border-radius: 8px;
    font-size: 13px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
  }

  .do-list {
    background-color: #d1fae5;
    color: #065f46;
  }

  .dont-list {
    background-color: #fee2e2;
    color: #991b1b;
  }

  .do-list li,
  .dont-list li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 0;
  }

  .icon {
    flex-shrink: 0;
  }

  .quiz-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .quiz-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .quiz-submit-btn {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: white;
    transition: background-color 0.3s ease;
  }

  .quiz-submit-btn:hover {
    background-color: #198754;
    border-color: #198754;
    color: white;
  }

  .quiz-toggle-btn {
    font-size: 14px;
    padding: 8px 12px;
  }
`}</style>

      <CustomerFooter />
    </>
  );
}

export default Guidelines;
