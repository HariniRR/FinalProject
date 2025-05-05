import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Modal, NavLink, Alert, Form, InputGroup } from 'react-bootstrap';
import { FaCheckCircle, FaCommentDots, FaShareSquare, FaShare, FaTrash, FaHeart } from 'react-icons/fa';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import axios from 'axios';

import counsellor1 from "../Assets/counsellor1.jpg";
import counsellor2 from "../Assets/counsellor2.jpg";
import counsellor3 from "../Assets/counsellor3.jpg";
import counsellor4 from "../Assets/counsellor4.jpg";
import counsellor5 from "../Assets/counsellor5.jpg";
import counsellor6 from "../Assets/counsellor6.jpg";
import counsellor7 from "../Assets/counsellor7.jpg";
import counsellor8 from "../Assets/counsellor8.jpg";
import counsellor9 from "../Assets/counsellor9.avif";
import counsellor10 from "../Assets/counsellor10.jpg";
import counsellor11 from "../Assets/counsellor11.webp";
import counsellor12 from "../Assets/counsellor12.jpg";

import safetyVideo1 from "../Assets/Safety1.mp4";
import safetyVideo2 from "../Assets/Safety2.mp4";
import mentalWellBeingVideo1 from "../Assets/Mental1.mp4";
import mentalWellBeingVideo2 from "../Assets/Mental2.mp4";
import legalRightsVideo1 from "../Assets/Rights1.mp4";
import legalRightsVideo2 from "../Assets/video.mp4";

const counsellors = [
  { id: 1, name: "Cerina", img: counsellor1, contact: "6234567890", specialization: "General Counseling for Mental Well-being", time: "10:00 AM - 12:00 PM" },
  { id: 2, name: "Dakshi", img: counsellor2, contact: "9357924680", specialization: "Trauma Recovery & PTSD Counseling", time: "12:00 PM - 02:00 PM" },
  { id: 3, name: "Rishika", img: counsellor3, contact: "7381331873", specialization: "Child Psychology & Cognitive Development", time: "02:00 PM - 04:00 PM" },
  { id: 4, name: "Sharmila", img: counsellor4, contact: "6468013579", specialization: "Women’s Safety & Abuse Recovery", time: "04:00 PM - 06:00 PM" },
  { id: 5, name: "Olivia", img: counsellor5, contact: "8378990012", specialization: "Stress Management & Emotional Support", time: "06:00 PM - 08:00 PM" },
  { id: 6, name: "Roshni", img: counsellor6, contact: "9303533556", specialization: "Family Therapy & Parenting Support", time: "08:00 AM - 10:00 AM" },
  { id: 7, name: "Atharvaa", img: counsellor7, contact: "9085244688", specialization: "Legal Counseling & Women's Rights Awareness", time: "10:00 AM - 12:00 PM" },
  { id: 8, name: "Anirudh", img: counsellor8, contact: "7315006437", specialization: "Behavioral Therapy & Social Skills Training", time: "12:00 PM - 02:00 PM" },
  { id: 9, name: "Rithika", img: counsellor9, contact: "6320104578", specialization: "Self-Empowerment & Confidence Building", time: "02:00 PM - 04:00 PM" },
  { id: 10, name: "Zara", img: counsellor10, contact: "7812340073", specialization: "Addiction Recovery & Mental Health Support", time: "04:00 PM - 06:00 PM" },
  { id: 11, name: "Sahana", img: counsellor11, contact: "8120546790", specialization: "Relationship Counseling & Women’s Mental Health", time: "06:00 PM - 08:00 PM" },
  { id: 12, name: "Henry", img: counsellor12, contact: "8393907381", specialization: "General Counseling for Mental Well-being", time: "08:00 AM - 10:00 AM" },
];


const Empower = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [contact, setContact] = useState("");
  const [activeSection, setActiveSection] = useState("video");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState({});
  const [feedback, setFeedback] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const defaultPost = {
      _id: "default-post",
      author: "Admin",
      content: "Welcome to the Community! This module is designed to provide support, resources and a space for meaningful discussions. You can share your thoughts, post updates, like others' posts and engage through comments. Connect, support and grow together!.",
      likes: 0,
      comments: [],
      showComments: false,
    };
    fetchPosts().then(existingPosts => {
      setPosts([defaultPost, ...existingPosts]); 
    });
  }, []);

  const handleBook = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setName("");
    setEmail("");
    setTime("");
    setContact("");
  };

  const handleSubmit = async () => {
    if (!name || !email || !time || !contact) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const bookingData = {
        name,
        email,
        time,
        contact,
        counsellorName: selectedCounsellor.name,
        counsellorContact: selectedCounsellor.contact,
      };

      await axios.post("http://localhost:7000/api/bookings/createBooking", bookingData);
      setShowSuccessAlert(true);
      handleClose();
      setTimeout(() => { setShowSuccessAlert(false); }, 3000);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again later.");
    }
  };

  const handleAlertClose = () => {
    setShowSuccessAlert(false);
    setName("");
    setEmail("");
    setTime("");
    setContact("");
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/posts/");
      return response.data; 
    } catch (error) {
      console.error("Error fetching posts:", error);
      return []; 
    }
  };

  const addPost = async () => {
    if (content.trim() === "") return;
    
    const newEntry = {
      author: author || "Anonymous",
      content,
    };
  
    try {
      const response = await axios.post("http://localhost:7000/api/posts/", newEntry);
      
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setAuthor("");
      setContent("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const likePost = async (id) => {
    try {
      await axios.put(`http://localhost:7000/api/posts/like/likePost/${id}`);
      setPosts(posts.map(post => 
        post._id === id ? { ...post, likes: post.likes + 1 } : post
      ));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const toggleComments = (id) => {
    setPosts(
      posts.map((post) =>
        post._id === id ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  const addComment = async (id) => {
    if (!comments[id]?.trim()) return;
    try {
      const response = await axios.put(`http://localhost:7000/api/posts/comment/addComment/${id}`, {
        comment: comments[id],
      });
      
      setComments({ ...comments, [id]: "" });
      
      const updatedPost = response.data.post;
      setPosts((prevPosts) => 
        prevPosts.map((post) => 
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deletePost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    
    if (!confirmDelete) {
      return; 
    }
  
    try {
      await axios.delete(`http://localhost:7000/api/posts/deletePost/${id}`);
      
      setPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
      
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error.response ? error.response.data : error.message);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/feedbacks/submit', {
        username: username,
        feedback: feedback,
      });
      console.log('Feedback submitted:', response.data);
      window.alert('Thank you for your feedback!');
      setUsername('');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="landing">
      <div className="navLinks">
        <NavLink
          to="/"
          onClick={() => setActiveSection("video")}
          className={`navLink ${
            activeSection === "video" ? "activeNavLink" : ""
          }`}
        >
          Video Hub
        </NavLink>
        <NavLink
          to="/"
          onClick={() => setActiveSection("counselling")}
 className={`navLink ${
            activeSection === "counselling" ? "activeNavLink" : ""
          }`}
        >
          Counselling Center
        </NavLink>
        <NavLink
          to="/"
          onClick={() => setActiveSection("community")}
          className={`navLink ${
            activeSection === "community" ? "activeNavLink" : ""
          }`}
        >
          Community
        </NavLink>
        {showSuccessAlert && (
  <div className="alert-container">
    <Alert
      variant="success"
      style={{ maxWidth: "400px", margin: "0 auto" }} 
    >
      <Alert.Heading>
        <FaCheckCircle
          style={{ color: "green", marginRight: "10px" }}
        />
        Successfully Booked!
      </Alert.Heading>
      <p>Your booking has been confirmed!</p>
    </Alert>
  </div>
  )}</div>
      {activeSection === "video" && (
        <>
          <h1 className="header">Video Hub</h1>
          <div className="videoSection">
            <h2 className="subHeader">Safety</h2>
            <Row className="videoRow">
              <Col md={6} className="p-1">
                <video controls className="video">
                  <source src={safetyVideo1} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Col>
              <Col md={6} className="p-1">
                <video controls className="video">
                  <source src={safetyVideo2} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Col>
            </Row>
          </div>
          <div className="videoSection">
            <h2 className="subHeader">Mental Well-Being</h2>
            <Row className="videoRow">
              <Col md={6} className="p-1">
                <video controls className="video">
                  <source src={mentalWellBeingVideo1} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Col>
              <Col md={6} className="p-1">
                <video controls className="video">
                  <source src={mentalWellBeingVideo2} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Col>
            </Row>
          </div>
          <div className="videoSection">
            <h2 className="subHeader">Legal Rights</h2>
            <Row className="videoRow">
              <Col md={6} className="p-1">
                <video controls className="video">
                  <source src={legalRightsVideo1} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Col>
              <Col md={6} className="p-1">
                <video controls className="video">
                  <source src={legalRightsVideo2} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Col>
            </Row>
          </div>
        </>
      )}

      {activeSection === "counselling" && (
        <>
          <h1 className="header">Counselling Center</h1>
          <Row>
            {counsellors.map((counsellor) => (
              <Col md={3} key={counsellor.id}>
                <Card className="card-cc">
                  <Card.Img
                    variant="top"
                    src={counsellor.img}
                    className="cardImage"
                  />
                  <Card.Body>
                    <Card.Title className="cardTitle">
                      {counsellor.name}
                    </Card.Title>
                    <Card.Text className="cardText">
                      {counsellor.specialization}
                    </Card.Text>
                    <Card.Text className="cardTime">
                        Availability Window:{counsellor.time}
                    </Card.Text>                   
                    <Button
                      onClick={() => handleBook(counsellor)}
                      className="bookButton"
                    >
                      <IoMdCheckmarkCircle /> Book
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#007bff", color: "white" }}
        >
          <Modal.Title>Book a Session</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white" }}>
          <div className="modalBody">
            <label>
              Enter Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input"
              />
            </label>
            <label>
              Enter Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </label>
            <label>
              Enter Time:
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="input"
              />
            </label>
            <label>
              Enter Contact:
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="input"
              />
            </label>
            <p>Selected Counsellor: {selectedCounsellor?.name}</p>
            <p>Counsellor Contact: {selectedCounsellor?.contact}</p>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#007bff", color: "white" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>

      {activeSection === "community" && (
        <>
          <h1 className="header">Community</h1>

          <div className="community-container">
            <div className="post-creation-feedback">
              <Card className="post-box">
                <Card.Body>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <Form.Control
                    className="mt-2"
                    as="textarea"
                    rows={4}
                    placeholder="Share something with the community..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <Button className="mt-3 post-btn" onClick={addPost}>
                    Post <FaShareSquare />
                  </Button>
                </Card.Body>
              </Card>

              {/* Feedback Form */}
              <Card className="feedback-box mt-4">
                <Card.Body>
                  <h5>Feedback</h5>
                  <Form onSubmit={handleFeedbackSubmit}>
                    <Form.Group className="mt-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mt-2">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Share your feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </Form.Group>
                    <Button type="submit" className="mt-3" variant="success">
                      Submit Feedback
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>

           <div className="post-list">
        {posts.map((post) => (
          <Card key={post._id} className="post-card" style={{ marginBottom: "20px" }}>
            <Card.Body>
              <Card.Title>{post.author}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
              <div className="interaction-buttons">
                {post._id !== "default-post" && (
                  <>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => likePost(post._id)}
                    >
                      <FaHeart /> {post.likes} Likes
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => toggleComments(post._id)}
                    >
                      <FaCommentDots /> {post.comments.length} Comments
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deletePost(post._id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </>
                )}
              </div>
              {post.showComments && (
                <div className="comments-section">
                  {post.comments.map((comment, index) => (
                    <p key={index} className="comment">
                      {comment}
                    </p>
                  ))}
                  <InputGroup className="mt-3">
                    <Form.Control
                      placeholder="Write a comment..."
                      value={comments[post._id] || ""}
                      onChange={(e) =>
                        setComments({ ...comments, [post._id]: e.target.value })
                      }
                    />
                    <Button
                      variant="primary"
                      onClick={() => addComment(post._id)}
                    >
                      &nbsp;
                      <FaShare />
                    </Button>
                  </InputGroup>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
          </div>
        </>
      )}

      <style jsx>{`
        .landing {
          padding: 20px;
          align-items: center;
          margin-top: 20px;
        }
        .navLinks {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
          background: #2e18d7;
          color: white;
          padding: 15px;
          width: 100%;
        }
        .subHeader {
          margin-top: 20px;
          margin-bottom: 10px;
          color: #007bff;
          font-size: 20px;
        }
        .videoSection {
          margin-bottom: 30px;
        }
        .videoRow {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .video {
          width: 100%;
          border-radius: 10px;
          max-width: 90%;
          height: auto;
        }
        .card-cc {
          margin-bottom: 20px;
          border: 1px solid #007bff;
          border-radius: 5px;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          cursor: pointer;
        }
        .card-cc:hover {
          transform: scale(1.05);
          border: 4px double blue;
        }
        .cardImage {
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }
        .cardTitle {
          font-weight: bold;
        }
        .cardText {
          font-size: 25px;
          color: gray;
        }
        .bookButton {
          background-color: #007bff;
          border-color: white;
          transition: background-color 0.3s, transform 0.2s;
        }
        .bookButton:hover {
          background-color: black;
        }
        .navLink {
          font-size: 18px;
          margin-left: 15px;
          cursor: pointer;
          color: #670bd6;
        }
        .activeNavLink {
          font-weight: bold;
          color: #0056b3;
        }
        .modalBody {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .community-container {
          display: flex;
          gap: 20px;
          margin: auto;
          padding: 20px;
        }
        .post-creation-feedback {
          flex: 0 0 40%; 
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .post-box:hover,
        .feedback-box:hover {
          border: 2px solid blue;
        }
        .post-list {
          flex: 0 0 50%; /* Right section: 50% */
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .post-box,
        .feedback-box {
          margin-bottom: 20px;
        }
        .post-btn {
          width: 100%;
          margin-top: 10px;
          background-color: #007bff;
          border: none;
          color: white;
        }
        .interaction-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .comments-section {
          margin-top: 10 px;
          border-top: 1px solid #dee2e6;
          padding-top: 10px;
        }
        .comment {
          margin: 5px 0;
        }
.alert-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: 850px;
    max-width: 90vw; 
    height: auto;
    padding: 25px 40px; 
    background-color: #fff3cd; 
    color: #856404; /* Dark text */
    border: 2px solid #ffeeba;
    border-radius: 20px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    text-align: center;
    animation: popUp 0.3s ease-in-out;
}

.alert-container .alert {
    width: 100%;
    background-color: #d4edda; 
    border-radius: 15px;
    padding: 15px 20px; 
}

.alert-container .alert-heading {
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}

.alert-container .alert-heading svg {
    font-size: 1.8rem;
    margin-right: 8px;
}

.alert-container p {
    font-size: 1.4rem;
    margin-top: 5px; 
}

/* Smooth pop-up effect */
@keyframes popUp {
    from {
        opacity: 0;
        transform: translate(-50%, -55%);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}
      `}</style>
    </div>
  );
};

export default Empower;