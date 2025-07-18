import React, { useRef, useState, useEffect } from "react";
import CustomerNavbar from "./CustomerNavbar";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import CustomerFooter from "./CustomerFooter";
import "./ContactUs.css";

const ContactUs = () => {
  const form = useRef();
  const [userEmail, setUserEmail] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_b4403g7",
        "template_khyaxcq",
        form.current,
        "7qj-SV4j5yvaLeaPr"
      )
      .then(
        () => {
          setIsSubmitting(false);
          setShowSuccessOverlay(true);
          form.current.reset();

          setTimeout(() => {
            setShowSuccessOverlay(false);
          }, 3000); // auto-hide after 3 seconds
        },
        (error) => {
          setIsSubmitting(false);
          alert("❌ Failed to send query. Please try again later.");
          console.error("EmailJS Error:", error.text);
        }
      );
  };

  return (
    <>
      <CustomerNavbar />
      <Container className="mt-5 position-relative">
        {/* ✅ Centered Success Overlay */}
        {showSuccessOverlay && (
          <div
            className="success-overlay"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              color: "#fff",
              padding: "1.5rem 2.5rem",
              borderRadius: "12px",
              zIndex: 9999,
              textAlign: "center",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }}
          >
            <h4>
              <span style={{ color: "red" }}>Abhi</span>
              <span style={{ color: "blue" }}>Nik</span>
            </h4>
            <p className="mt-2 text-success">✅ Mail sent successfully!</p>
          </div>
        )}

        <h2 className="text-center fw-bold mb-3">
          Contact <span style={{ color: "red" }}>Abhi</span>
          <span style={{ color: "blue" }}>Nik</span>
        </h2>
        <p className="text-center text-muted mb-5">
          We're here to help. Reach out anytime!
        </p>

        <Row className="g-4 justify-content-center">
          {/* Left Card */}
          <Col md={6} className="d-flex justify-content-center" style={{ padding: 0 }}>
            <div
              className={`card-wrapper ${hoveredCard === "left" ? "hover-left" : ""}`}
              onMouseEnter={() => setHoveredCard("left")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="shadow border-0 h-100">
                <Card.Body>
                  <h4 className="text-center mb-4">Company Information</h4>
                  <p>
                    <strong>About AbhiNik:</strong> AbhiNik is committed to
                    providing top-notch lift maintenance and support services.
                    We prioritize safety, reliability, and customer satisfaction
                    above all.
                  </p>
                  <p>
                    <strong>📍 Address:</strong> 123, Abhinik Towers, Mumbai,
                    India
                  </p>
                  <p>
                    <strong>📞 Phone:</strong> +91 79990 57712
                  </p>
                  <p>
                    <strong>📧 Email:</strong> abhinik.elevator@gmail.com
                  </p>
                  <p>
                    <strong>🕑 Working Hours:</strong> Mon - Sat, 10am - 6pm
                  </p>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Right Card - Form */}
          <Col md={6} className="d-flex justify-content-center" style={{ padding: 0 }}>
            <div
              className={`card-wrapper ${hoveredCard === "right" ? "hover-right" : ""}`}
              onMouseEnter={() => setHoveredCard("right")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="shadow border-0 h-100">
                <Card.Body>
                  <h4 className="text-center mb-4">Mail Us Your Query</h4>
                  <Form ref={form} onSubmit={sendEmail}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your name"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLiftAddress">
                      <Form.Label>Lift Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="lift_address"
                        required
                        placeholder="Enter lift location"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="message"
                        required
                        placeholder="Your query..."
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Your Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={userEmail}
                        readOnly
                        required
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Spinner
                              animation="border"
                              size="sm"
                              className="me-2"
                            />
                            Sending...
                          </>
                        ) : (
                          "Submit Query"
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        {/* WhatsApp Section */}
        <hr className="mt-5" />
        <div className="text-center mt-4">
          <h5>Contact Us on WhatsApp</h5>
          <a
            href="https://wa.me/917999057712"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success mt-2"
          >
            <FaWhatsapp size={20} className="me-2" />
            Chat on WhatsApp
          </a>
        </div>
      </Container>
      <CustomerFooter />
    </>
  );
};

export default ContactUs;
