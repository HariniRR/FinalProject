import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Card,
} from "react-bootstrap";

function Profile() {
  const defaultProfile = {
    fullName: "",
    nickname: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    profession: "",
    interests: "",
    bio: "",
    profilePicture: "https://via.placeholder.com/150",
  };

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });
  
  const [newPicture, setNewPicture] = useState(null);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfilePicture = () => {
    if (newPicture) {
      setProfile({ ...profile, profilePicture: newPicture });
      setNewPicture(null);
    }
  };

  return (
    <Container fluid className="py-3" style={{ backgroundColor: "black", width: "90rem" }}>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg p-4">
            <Row>
              <Col md={4} className="text-center mt-5">
                {/* <h3 className="mb-4">Profile</h3> */}
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    margin: "auto",
                    position: "relative",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid #000",
                    background: "#f5f5f5",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("profilePicInput").click()}
                >
                  <Image
                    src={newPicture || profile.profilePicture}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <Form.Control
                  type="file"
                  id="profilePicInput"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
                {newPicture && (
                  <Button variant="primary" className="mt-3" onClick={updateProfilePicture}>
                    Update Picture
                  </Button>
                )}
              </Col>

              <Col md={8}>
                <h4 className="mb-4">Profile Settings</h4>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formFullName">
                      <Form.Label style={{ fontWeight: "bold" }}>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        style={{ border: "1px solid #000" }}
                        value={profile.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formNickname">
                      <Form.Label style={{ fontWeight: "bold" }}>Nickname</Form.Label>
                      <Form.Control
                        type="text"
                        style={{ border: "1px solid #000" }}
                        value={profile.nickname}
                        onChange={(e) => handleInputChange("nickname", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        style={{ border: "1px solid #000" }}
                        value={profile.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formContact">
                      <Form.Label style={{ fontWeight: "bold" }}>Contact</Form.Label>
                      <Form.Control
                        type="text"
                        style={{ border: "1px solid #000" }}
                        value={profile.contact}
                        onChange={(e) => handleInputChange("contact", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formGender">
                      <Form.Label style={{ fontWeight: "bold" }}>Gender</Form.Label>
                      <Form.Select
                        style={{ border: "1px solid #000" }}
                        value={profile.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formDOB">
                      <Form.Label style={{ fontWeight: "bold" }}>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        style={{ border: "1px solid #000" }}
                        value={profile.dob}
                        onChange={(e) => handleInputChange("dob", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formProfession">
                      <Form.Label style={{ fontWeight: "bold" }}>Profession</Form.Label>
                      <Form.Select
                        style={{ border: "1px solid #000" }}
                        value={profile.profession}
                        onChange={(e) => handleInputChange("profession", e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="School">School</option>
                        <option value="College">College</option>
                        <option value="Work">Work</option>
                        <option value="None">None</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formInterests">
                      <Form.Label style={{ fontWeight: "bold" }}>Interests</Form.Label>
                      <Form.Control
                        type="text"
                        style={{ border: "1px solid #000" }}
                        value={profile.interests}
                        onChange={(e) => handleInputChange("interests", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "bold" }}>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ border: "1px solid #000" }}
                    value={profile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                  />
                </Form.Group>  
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;