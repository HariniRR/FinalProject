import React, { useEffect, useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { FaTrash, FaSignOutAlt, FaClipboardList } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import Counsellors from "../Assets/Counsellor.jpg";

const Counsellor = () => {
  const [bookings, setBookings] = useState([]);
  const [view, setView] = useState("home");
  const [counsellorName, setCounsellorName] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); 

  useEffect(() => {
    if (view === "booking" && counsellorName) {
      fetchBookings();
    }
  }, [view, counsellorName]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/bookings/getAllBookings"
      );
      const filteredBookings = response.data.filter(
        (booking) => booking.counsellorName === counsellorName
      );
      setBookings(filteredBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Failed to fetch bookings.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(
          `http://localhost:7000/api/bookings/deleteBooking/${id}`
        );
        fetchBookings();
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Failed to delete booking.");
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/signin");
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (counsellorName.trim() === "") {
      setError("Please enter your name.");
    } else {
      setError("");
      setShowModal(false);
      setView("home");
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNameSubmit}>
            <Form.Group controlId="counsellorName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                value={counsellorName}
                onChange={(e) => setCounsellorName(e.target.value)}
                placeholder="Enter your name"
              />
              {error && <p className="text-danger">{error}</p>}
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div
        className="content"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <Button
          variant="danger"
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
            alignItems: "center",
          }}
          className="logout-button"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
        >
          {isHovered && <FaSignOutAlt style={{ marginRight: "5px" }} />}{" "}
          {/* Show icon only on hover */}
          Logout
        </Button>
        {view === "home" && (
          <div className="home-view mt-1">
            <h1>Welcome, {counsellorName}!</h1>
            <p className="description">
              Our platform provides a comprehensive suite of tools designed to
              enhance your counseling experience. You can manage appointments,
              access resources, and connect with clients seamlessly. As a
              counselor, you have the ability to view your scheduled
              appointments, manage client information, and ensure that you are
              providing the best support possible.
            </p>
            <Button variant="primary" onClick={() => setView("booking")}>
              View Appointments
            </Button>
            <div className="overview mt-5">
              <div className="image-container">
                <img
                  src={Counsellors}
                  alt="Platform Overview"
                  className="overview-image"
                />
                <div className="overlay">
                  <h2>Platform Overview</h2>
                  <p className="animated-text">
                    {" "}
                    Digital Empowerment: Building Safety, Support, and Legal
                    Awareness for Women and Children is a comprehensive platform
                    designed to enhance safety, legal knowledge, and mental
                    well-being. It offers interactive quizzes, games, a
                    community forum, and counseling services to support and
                    empower users. The system provides legal rights awareness,
                    emergency helplines, and rehabilitation pathways, fostering
                    a secure and informed society.{" "}
                    <br />
                    Sign up or sign in as a user to explore the full website and access all features!
                  </p>
                  <Button
                    variant="info"
                    onClick={() => navigate("/landing")}
                    className="overview-button mt-3"
                  >
                    Visit Full Website
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "booking" && (
          <div className="table-container">
            <h2>Your Appointment List <FaClipboardList /></h2>
            <Table striped bordered hover className="custom-table mt-4">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={booking._id}>
                      <td>{index + 1}</td>
                      <td>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td>{booking.contact}</td>
                      <td>{booking.time}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(booking._id)}
                        >
                          <FaTrash /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No bookings found for {counsellorName}.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Button onClick={() => setView("home")}  className="btn-back mt-4">
               Back to Home
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        .content {
          margin: 20px;
        }
        .home-view {
          text-align: center;
          margin-top: 20px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .home-view h1 {
          font-size: 2.5rem;
          color: #007bff;
          margin-bottom: 20px;
        }
        .description {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: #555;
          line-height: 1.7;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .overview {
          margin-top: 30px;
        }
        .overview-card {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .image-container {
          position: relative;
        }
        .overview-image {
          width: 800px;
          height: 500px;
          border-radius: 30px;
          transition: transform 0.5s ease;
        }
        .image-container:hover .overview-image {
          transform: scale(1.05);
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.7s ease; /* Increased duration */
          padding: 20px;
          text-align: center;
        }
        .image-container:hover .overlay {
          opacity: 1;
        }
        .animated-text {
          margin-bottom: 10px;
          opacity: 0; /* Start hidden */
          transform: translateY(20px); /* Start slightly below */
          transition: opacity 0.7s ease, transform 0.7s ease; /* Increased duration */
        }
        .image-container:hover .animated-text {
          opacity: 1; /* Fade in */
          transform: translateY(0); /* Move to original position */
        }
        .table-container {
          width: 90%;
          margin: auto;
        }
        .custom-table {
          width: 90%;
          margin: auto;
          border: 2px solid #007bff;
        }
        .custom-table th {
          background-color: #007bff;
          color: white;
        }
        .custom-table td {
          vertical-align: middle;
        }
        .btn-back{
            backforund-color: #3122db;
            border-radius: 17px;
            margin-top: 30px;
            margin-left: 600px; 
        }
        .btn-primary {
          background-color: #007bff;
          border: none;
          border-radius: 20px;
        }
        .btn-primary:hover {
          background-color: #0056b3;
          border-radius: 5px;
        }
        @media (max-width: 768px) {
          .nav-links {
            flex-direction: column;
            gap: 10px;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Counsellor;