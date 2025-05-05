import React, { useState } from "react";
import axios from "axios";
import User from "../Assets/User.jpg";
import Feedback from "../Assets/Feedback.jpg";
import Contact from "../Assets/Contact.jpg";
import { FaTrash, FaBackward, FaFileAlt, FaUser, FaEnvelope, FaComment} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Admin = () => {
  const [view, setView] = useState("home");
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [contactResponses, setContactResponses] = useState([]); 
  const [activeCard, setActiveCard] = useState(null);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/users/");
      const filteredUsers = response.data.filter(
        (user) => user.name.toLowerCase() !== "admin" && user.email !== "admin@gmail.com"
      );
      setUsers(filteredUsers);
      setView("users");
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch user data.");
    }
  };

  // Fetch Feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/feedbacks/");
      setFeedbacks(response.data);
      setView("feedbacks");
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      alert("Failed to fetch feedback data.");
    }
  };

  // Fetch Contact Responses
  const fetchContactResponses = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/contacts/");
      setContactResponses(response.data); // Set the contact responses
      setView("contact"); // Change view to contact
    } catch (error) {
      console.error("Error fetching contact responses:", error);
      alert("Failed to fetch contact responses.");
    }
  };

  // Delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`http://localhost:7000/api/feedbacks/delete/${id}`);
        setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      } catch (error) {
        console.error("Error deleting feedback:", error);
        alert("Failed to delete feedback.");
      }
    }
  };

  const deleteContactResponse = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this contact response?")
    ) {
      try {
        await axios.delete(`http://localhost:7000/api/contacts/delete/${id}`);
        setContactResponses(
          contactResponses.filter((response) => response._id !== id)
        );
      } catch (error) {
        console.error("Error deleting contact response:", error);
        alert("Failed to delete contact response.");
      }
    }
  };

  // Generate PDF Report
  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Registered Members Report", 105, 15, { align: "center" });

    // Define table headers
    const tableColumn = ["S.No.", "Name", "Email", "Role"];
    const tableRows = [];

    // Count Users by Role
    let totalUsers = users.length;
    let userCount = users.filter((user) => user.role === "User").length;
    let counsellorCount = users.filter(
      (user) => user.role === "Counsellor"
    ).length;

    // Populate Table Rows
    users.forEach((user, index) => {
      const userData = [index + 1, user.name, user.email, user.role];
      tableRows.push(userData);
    });

    // Generate Table with Proper Styling
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: "grid",
      headStyles: { fillColor: [33, 97, 140], textColor: 255, fontSize: 12 },
      bodyStyles: { fontSize: 10 },
      alternateRowStyles: { fillColor: [220, 220, 220] },
      margin: { top: 10 },
    });

    // Add Summary Row at the Bottom with Correct Alignment
    let finalY = doc.lastAutoTable.finalY + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Grand Total: ${totalUsers}, 40, finalY`);
    doc.text(`Enrolled Users: ${userCount}, 100, finalY, { align: "center" }`);
    doc.text(`Enrolled Counsellors: ${counsellorCount}, 130, finalY`);

    doc.save("User _Report.pdf");
  };

  return (
    <div className="admin-container">
      {view === "home" && (
        <>
          <h2 className="admin-title">Welcome, Admin</h2>
          <p className="admin-description">
            Manage users and review feedback efficiently from the dashboard. You can view the user list and feedbacks with just a click.
          </p>

          <div className="cards-container mt-5">
            <div
              className={`dashboard-card ${
                activeCard === "users" ? "active" : ""
              }`}
              onClick={() => {
                fetchUsers();
                setActiveCard("users");
              }}
            >
              <img src={User} alt="User  Icon" className="card-image" />
              <h3>Registered Members</h3>
              <p className="card-description">
                View the list of registered members with ease. Generate detailed reports for better insights.
              </p>
              <button className="card-button">View Members</button>
            </div>

            <div
              className={`dashboard-card ${
                activeCard === "feedbacks" ? "active" : ""
              }`}
              onClick={() => {
                fetchFeedbacks();
                setActiveCard("feedbacks");
              }}
            >
              <img src={Feedback} alt="Feedback Icon" className="card-image" />
              <h3>User Reviews</h3>
              <p className="card-description">
                Check feedback from users. Analyze user responses to improve services and engagement.
              </p>
              <button className="card-button">Browse Feedback</button>
            </div>

            <div
              className={`dashboard-card ${
                activeCard === "contact" ? "active" : ""
              }`}
              onClick={() => {
                fetchContactResponses();
                setActiveCard("contact");
              }}
            >
              <img src={Contact} alt="Contact Icon" className="card-image" />
              <h3>Contact Responses</h3>
              <p className="card-description">
                View responses from users who contacted support. Manage
                inquiries effectively.
              </p>
              <button className="card-button">View Responses</button>
            </div>
          </div>
        </>
      )}

      {view === "users" && (
        <div className="table-container">
          <h3>Enrolled Members Summary</h3>
          <table className="custom-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="button-container">
            <button className="report-button ml-20" onClick={generateReport}>
              <FaFileAlt /> Generate Report
            </button>
            <button
              className="backbtn"
              onClick={() => setView("home")}
            >
              <FaBackward /> Back
            </button>
          </div>
        </div>
      )}

      {view === "feedbacks" && (
        <div className="feedback-container">
          <h3> User Response Summary</h3>
          <div className="feedback-border mt-4">
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <div className="feedback-card" key={index}>
                  <h5 className="feedback-author">{feedback.username}</h5>
                  <p className="feedback-content">{feedback.feedback}</p>
                  <FaTrash
                    className="delete-icon"
                    onClick={() => deleteFeedback(feedback._id)}
                    title="Delete Feedback"
                  />
                </div>
              ))
            ) : (
              <p className="no-data">No feedback available.</p>
            )}
          </div>
          <button className="backbutton" onClick={() => setView("home")}>
            <FaBackward /> Back
          </button>
        </div>
      )}

      {view === "contact" && (
        <div className="contact-container">
          <h3>Contact Response Summary</h3>
          <div className="contact-responses mt-4">
            {contactResponses.length > 0 ? (
              contactResponses.map((response, index) => (
                <div className="contact-response-card" key={index}>
                  <h5 className="response-author">
                    <FaUser /> {response.name}
                  </h5>
                  <p className="response-email">
                    <FaEnvelope /> {response.email}
                  </p>
                  <p className="response-message">
                    <FaComment /> {response.message}
                  </p>
                  <div className="icon-container">
                    <FaTrash
                      className="delete-icon"
                      onClick={() => deleteContactResponse(response._id)}
                      title="Delete Feedback"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No contact responses available.</p>
            )}
          </div>
          <button className="backbutton" onClick={() => setView("home")}>
            <FaBackward /> Back
          </button>
        </div>
      )}

      <style jsx>{`
        .admin-container {
          padding: 20px;
          text-align: center;
        }
        .admin-title {
          font-size: 30px;
          font-weight: bold;
          color: #333;
        }
        .admin-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 25px;
        }
        .cards-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          width: 100%;
        }
        .dashboard-card {
          width: 30%;
          height: 400px;
          padding: 20px;
          border-radius: 30px;
          cursor: pointer;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #000000, #434343);
          color: white;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
          margin: 0 10px;
        }
        .dashboard-card:hover {
          transform: scale(1.05);
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
        }
        .dashboard-card.active {
          background-color: #28a745;
        }
        .card-image {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }
        .card-description {
          font-size: 17px;
          margin: 10px 0;
        }
        .card-button {
          background: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .card-button:hover {
          background: #0056b3;
          transform: translateY(-2px);
        }
        .table-container,
        .feedback-container,
        .contact-container {
          text-align: left;
          margin: auto;
          width: 80%;
        }
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        .custom-table th,
        .custom-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .custom-table th {
          background-color: #007bff;
          color: white;
        }
        .custom-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .custom-table tr:hover {
          background-color: #d1e7fd;
        }
        .no-data {
          text-align: center;
          font-style: italic;
        }
        .feedback-container {
          border-radius: 10px;
          padding: 15px;
        }
        .feedback-border {
          border: 2px solid #007bff;
          border-radius: 8px;
          padding: 10px;
          transition: background 0.3s ease;
        }
        .feedback-border:hover {
          background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
        }
        .feedback-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          margin-bottom: 10px;
          position: relative;
        }
        .feedback-author {
          color: #007bff;
          font-weight: bold;
        }
        .feedback-content {
          margin-top: 5px;
          font-size: 17px;
        }
        .delete-icon {
          position: absolute;
          right: 10px;
          bottom: 10px;
          color: red;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .delete-icon:hover {
          color: darkred;
        }
        .backbtn {
          display: block;
          margin: 20px auto;
          background: #f2420e;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 20px;
          transition: background 0.3s ease;
        }
        .backbutton {
          display: block;
          margin: 20px auto;
          background: #f2420e;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .backbtn:hover,
        .backbutton:hover {
          background: #f2150e;
        }
        .report-button {
          display: block;
          margin: 20px auto;
          background: #28a745;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .report-button:hover {
          background: #218838;
        }
        .button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }
        .ml-20 {
          margin-left: 20px;
        }
        .mt-20 {
          margin-top: 20px;
        }

        .contact-responses {
          margin-top: 20px;
        }
        // .contact-response-card {
        //   background: white;
        //   border: 2px solid ;
        //   padding: 15px;
        //   border-radius: 8px;
        //   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        //   margin-bottom: 10px;
        // }
        .contact-response-card {
          position: relative;
          padding: 15px;
          border: 3px solid #e74c3c;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        .icon-container {
          position: absolute;
          bottom: 10px;
          right: 10px;
          cursor: pointer;
        }
        .response-author {
          color: #1a5276;
          font-weight: bold;
          font-size: 25px;
        }
        .response-email {
          font-size: 20px;
        }
        .response-message {
          margin-top: 5px;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default Admin;