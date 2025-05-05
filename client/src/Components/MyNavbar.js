import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaHome, FaUsers, FaBalanceScale, FaFolderOpen } from 'react-icons/fa';
import { MdTask } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function MyNavbar() {
  // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      axios.post("http://localhost:7000/api/users/logout", {}, { withCredentials: true })
        .then(response => {
          if (response.status === 200) {
            // localStorage.removeItem('isAuthenticated'); 
            navigate('/landing'); 
          }
        })
        .catch(error => {
          console.error("Error during logout:", error);
        });
    }
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "active" : "";  
  };

  return (
    <Navbar
      expand="lg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#1f1f1f',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        padding: '10px 20px',
      }}
    >
      <Container fluid>
        <Navbar.Brand
          onClick={() => navigate('/home')}
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#61dafb',
            cursor: 'pointer',
          }}
        >
          Digital Empowerment
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" style={{ borderColor: '#61dafb' }} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              className={getNavLinkClass('/home')}
              style={{ color: 'white', fontSize: '1.1rem', margin: '0 15px' }}
              onClick={() => navigate('/home')}
            >
              <FaHome style={{ marginRight: '5px' }} /> Home
            </Nav.Link>
            <Nav.Link
              className={getNavLinkClass('/empower')}
              style={{ color: 'white', fontSize: '1.1rem', margin: '0 15px' }}
              onClick={() => navigate('/empower')}
            >
              <FaUsers style={{ marginRight: '5px' }} /> Empower & Connect
            </Nav.Link>
            <Nav.Link
              className={getNavLinkClass('/legalrights')}
              style={{ color: 'white', fontSize: '1.1rem', margin: '0 15px' }}
              onClick={() => navigate('/legalrights')}
            >
              <FaBalanceScale style={{ marginRight: '5px' }} /> Legal Aid
            </Nav.Link>
            <Nav.Link
              className={getNavLinkClass('/resources')}
              style={{ color: 'white', fontSize: '1.1rem', margin: '0 15px' }}
              onClick={() => navigate('/resources')}
            >
              <FaFolderOpen style ={{ marginRight: '5px' }} /> Resources
            </Nav.Link>

            <NavDropdown title={
                <span
                  className={`nav-dropdown-title ${hoveredDropdown === "activities" ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredDropdown("activities")}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <MdTask style={{ marginRight: '5px' }} /> Activities
                </span>
              }
              id="activities-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={() => navigate('/quiz')}>Quiz</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/games')}>Games</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={
                <span
                  className={`nav-dropdown-title ${hoveredDropdown === "settings" ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredDropdown("settings")}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <IoSettings style={{ marginRight: '5px' }} /> Settings
                </span>
              }
              id="profile-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx>{`
        .nav-link {
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #61dafb !important;
        }
        .nav-link.active {
          font-weight: bold;
          border-bottom: 2px solid #61dafb;
        }
        .nav-dropdown-title {
          color: white;
          transition: color 0.3s ease;
        }
        .nav-dropdown-title.hovered {
          color: #61dafb;
        }
      `}</style>
    </Navbar>
  );
}

export default MyNavbar;