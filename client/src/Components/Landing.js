import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import LandingImage from "../Assets/Landing.jpg";
import Contact from "../Assets/Contact.jpg";
import { FaBalanceScale, FaUser, FaUsers, FaUserPlus, FaQuestionCircle, FaGamepad, FaLifeRing, FaLock, FaEnvelope, FaPhone,  FaSignInAlt } from "react-icons/fa";

const features = [
  { icon: <FaBalanceScale />, title: "Legal Education", description: "Empowering women and children with knowledge about their rights." },
  { icon: <FaUser Md />, title: "Counseling Support", description: "Providing professional mental health and safety guidance." },
  { icon: <FaUsers />, title: "Community Engagement", description: "A space for support, discussions, and shared experiences." },
  { icon: <FaQuestionCircle />, title: "Interactive Quiz", description: "Interactive quizzes to enhance awareness about rights & safety." },
  { icon: <FaGamepad />, title: "Gamified Learning", description: "Engaging games promoting mental well-being and legal awareness." },
  { icon: <FaLifeRing />, title: "Resource Hub", description: "Access helplines and materials on rights, safety and mental well-being" },
  { icon: <FaLock />, title: "Ease of Use & Security", description: "Secure signup and sign-in features with profile management" }
];

const elements = [
  { title: "SignUp", icon: <FaUserPlus size={40} />, description: "Create your account quickly and securely to access all features and services.", bgColor: "#f51722", path: "/signup" },
  { title: "Games", icon: <FaGamepad size={40} />, description: "Enjoy interactive and engaging games designed to enhance your learning experience.", bgColor: "#0078D7", path: "/games" },
  { title: "SignIn", icon: <FaSignInAlt size={40} />, description: "Access your personalized dashboard securely with your registered credentials.", bgColor: "#32CD32", path: "/signin" },
];

const Landing = () => {
  const navigate = useNavigate();

  const coreFeaturesRef = useRef(null);

  const scrollToKeyFeatures = () => {
    coreFeaturesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [formData, setFormData] = useState({ name: "", email: "", message: "", termsAccepted: false });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
        alert("Please accept the Terms of Service.");
        return;
    }

    try {
        const response = await fetch('http://localhost:7000/api/contacts/submit', {
            method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify(formData),});

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        alert(data.message); 
        setFormData({ name: "", email: "", message: "", termsAccepted: false });
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again later.');
    }
};

  return (
    <>
      <div className="home-container">
        <Row className="align-items-center">
          <Col md={6}>
            <motion.h1
              className="title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              Digital Empowerment
            </motion.h1>

            <motion.p
              className="content-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              This platform offers innovative digital solutions to promote the safety, support and legal awareness of women and children. Through interactive quizzes, engaging games, counseling support and community interaction, it provides essential resources to educate and empower users. Our goal is to foster a secure and supportive environment where individuals can access guidance, legal aid and mental well-being resources.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button className="explore-button" onClick={scrollToKeyFeatures}>
                Explore
              </Button>
            </motion.div>
          </Col>

          {/* Right Section: Image */}
          <Col md={6} className="image-container">
            <motion.img
              src={LandingImage}
              alt="Digital empowerment"
              className="home-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </Col>
        </Row>
      </div>

      <div className="key-container">
        <h3 className="key-title">Top Key Features</h3>
        <Row className="justify-content-center">
          {features.map((feature, index) => (
            <Col xs={12} md={4} lg={3} key={index} className="mb-4">
              <Card className="feature-card mt-3">
                <Card.Body>
                  <div className="icon">{feature.icon}</div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

        <div className="core-container" ref={coreFeaturesRef}>
          <h1 style={{ color: "black", fontFamily: "'Lilita One', sans-serif", fontWeight: "bolder" }}>Explore Our Core Elements</h1>
          <Row className="justify-content-center">
            {elements.map((element, index) => (
              <Col key={index} md={4} sm={12} className="d-flex justify-content-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="motion-card"
                  onClick={() => navigate(element.path)} 
                  style={{ cursor: "pointer" }}
                >
                  <Card style={{ backgroundColor: element.bgColor }} className="text-center core-card">
                    <Card.Body>
                      <div className="coreicon">{element.icon}</div>
                      <Card.Title className="title">{element.title}</Card.Title>
                      <Card.Text>{element.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="contact-container">
          <div className="left-section">
            <h2 className="mt-5" style={{ backgroundColor: "#f12c0d", color: "#fff", padding: "10px", display: "inline-block" }}>
              DON'T BE SHY
            </h2>
            <p className="contacttag mt-3">
              Feel free to connect! Open to collaborating on initiatives that empower women and children through digital safety, legal awareness and support. 
            </p>
            <div className="contact-info mt-4">
              <FaEnvelope className="contact-icon" />
              <div>
                <p className="topic">Mail me</p>
                <p className="content">contact@digitalempowerment.com</p>
              </div>
            </div>
            <div className="contact-info mt-4">
              <FaPhone className="contact-icon" />
              <div>
                <p className="topic">Call me</p>
                <p className="content">+1 333 454 55 44</p>
              </div>
            </div>
          </div>

          <div className="right-section">
            <h1 className="contact-title">
              <span className="highlight" style={{ fontFamily: "'Gravitas One', serif" }} >GET IN TOUCH</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <input className="mt-5"
                type="text"
                name="name"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input className="mt-3"
                type="email"
                name="email"
                placeholder="Enter a valid email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea className="mt-3"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <div className="terms">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                <label htmlFor="termsAccepted">I accept the Terms of Service</label>
              </div>
              <button type="submit" className="mt-4">SUBMIT</button>
            </form>
          </div>
        </div>

        {/* Styled-JSX for CSS */}
        <style jsx>{`
          /* Home Page Styling */
          .home-container {
            padding: 50px;
            background: linear-gradient(135deg,rgb(211, 42, 135), #7b1fa2, #ba68c8);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
          }

          /* Left Section: Title */
          .title {
            font-size: 40px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: left;
            margin-left: 50px;
          }

          /* Content Text */
          .content-text {
            font-family: "Lora", serif;
            font-size: 20px;
            max-width: 600px;
            text-align: left;
            line-height: 1.6;
            margin-left: 50px;
          }

          /* Button */
          .explore-button {
            margin-top: 20px;
            padding: 10px 25px;
            font-size: 25px;
            background-color:  #d35400 ;
            font-family: "Playfair Display", serif;
            border: none;
            transition: 0.3s;
            margin-left: 50px;
          }

          .explore-button:hover {
            background-color:#b30000;
            border: 2px solid black;
          }

          /* Right Section: Image */
          .image-container {
            text-align: right;
          }

          .home-image {
            max-width: 100%;
            height: auto;
            margin-left: 300px;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .home-container {
              text-align: center;
            }
            .image-container {
              text-align: center;
              margin-top: 20px;
            }
          }

          .key-container {
            background: #370ef2;
            padding: 60px 0;
            text-align: center;
          }

          .key-title {
            font-weight: bold;
            font-size: 2.7rem;
            color: #f4f6f7;
          }

          .feature-card {
            background-color: #FFA500;
            border: none;
            border-radius: 15px;
            padding: 20px;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }

          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: white;
          }

          .core-container {
            text-align: center;
            padding: 50px 20px;
            background-color: #bdc3c7   ;
            color: white;
          }
          .motion-card {
            width: 100%;
            max-width: 300px;
            margin: 15px;
          }
          .core-card {
            padding: 20px;
            border-radius: 10px;
            color: white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease-in-out;
          }
         .core-card:hover {
           border: 5px solid white;
          //  box-shadow: 0 0 15px #f71919; 
          }
          .title{
            font-family: "Anton", sans-serif;
          }
          .coreicon {
            margin-bottom: 15px;
          }
          .contact-container {
            display: flex;
            width: 100%;
            height: 100vh;
            color: white;
          }

          .left-section {
            flex: 0.5;
            background: url(${Contact}) no-repeat center center/cover;
            display: flex;
            flex-direction: column;
            justify-content: left;
            align-items: left;
            text-align: left;
            padding: 50px;
            color: #17202a;
            margin-left: 40px;
          }

          .contacttag {
            font-weight: 550;
            color: #180d0c;
            background-color: rgba(240, 150, 180, 0.5);
            font-family: "Abel", sans-serif;
          }
            
          .contact-info {
            display: flex;
            align-items: center;
            margin-top: 20px;
            font-weight: bold;
          }

          .contact-icon {
            font-size: 50px;
            color: #7d3c98;
            margin-right: 7px;
          }

          .topic {
            color: #5a18c4;
            font-size: 30px;
          }

          .content {
            color: #a93226;
            font-size: 20px;
            transition: transform 0.3s ease-in-out;
          }

          .content:hover {
            transform: scale(1.2);
            color: black;
            font-width: bolder;
          }

          .right-section {
            flex: 1;
            background: black;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 70px;
          }

          form {
            width: 100%;
            max-width: 600px;
            display: flex;
            flex-direction: column;
          }

          input,
          textarea {
            background: black;
            border: 3px solid white;
            padding: 12px;
            margin-bottom: 10px;
            color: white;
            font-size: 16px;
            width: 100%;
            transition: all 0.3s ease-in-out;
          }

          input:hover,
          textarea:hover {
            border-color: yellow;
            box-shadow: 0 0 10px yellow;
          }

          .terms {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }

          .terms input {
            margin-right: 8px;
            width: 20px;
            height: 18px;
            margin-bottom: 4px;
          }

          .terms label {
            font-size: 16px;
            cursor: pointer;
          }

          button {
            background: yellow;
            border: none;
            padding: 12px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            width: 150px;
            transition: background 0.3s ease-in-out;
          }

          button:hover {
            background: #e6b800;
            box-shadow: 0 0 10px yellow;
          }
          @media (max-width: 768px) {
            .contact-container {
              flex-direction: column;
              text-align: center;
            }
            .left-section,
            .right-section {
              width: 100%;
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
    </>
  );
};

export default Landing;