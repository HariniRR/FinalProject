import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthForm.css";

function AuthForm({ mode, onSignIn }) {
    const [isLogin, setIsLogin] = useState(mode === "signin");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const [showBackButton, setShowBackButton] = useState(false);
    const navigate = useNavigate();

    // Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/api/users/signup", { name, email, password, role });
            if (response.status === 201) {
                window.alert("Signup Successful");
                setShowBackButton(true); 
                setName("");
                setEmail("");
                setPassword("");
                setRole("User"); 
                navigate("/signin"); 
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 400) {
                window.alert("All fields are required or email already exists");
            } else {
                window.alert("Something went wrong");
            }
            setShowBackButton(true); 
        }
    };

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/api/users/signin", { email, password }, { withCredentials: true });

            if (response.data.success) {
                window.alert("Login Successful");
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userRole", response.data.role);  
  
                onSignIn(); 
                const userRole = response.data.role;
                if (userRole === "Admin") {
                    navigate("/admin");
                } else if (userRole === "Counsellor") {
                    navigate("/counsellor");
                } else {
                    navigate("/mynavbar");
                }
            } else {
                window.alert("Invalid credentials");
            }
        } catch (err) {
            if (err.response?.status === 401) {
                window.alert("Password doesn't match");
            } else if (err.response?.status === 404) {
                window.alert("No Records found");
            } else {
                window.alert("Something went wrong");
            }
            setShowBackButton(true); 
        }
    };

    return (
        <div className="auth-page">
            <div className="container">
                <div className="form-container">
                    <div className="form-toggle">
                        <button className={isLogin ? "active" : ""} onClick={() => { setIsLogin(true); navigate("/signin"); }}>
                            SignIn
                        </button>
                        <button className={!isLogin ? "active" : ""} onClick={() => { setIsLogin(false); navigate("/signup"); }}>
                            SignUp
                        </button>
                    </div>

                    {isLogin ? (
                        <div className="form">
                            <h2>SignIn</h2>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleLogin}>SignIn</button>
                            <p>Don't have an account? <span className="link" onClick={() => { setIsLogin(false); navigate("/signup"); }}>Signup</span></p>
                        </div>
                    ) : (
                        <div className="form">
                            <h2>SignUp</h2>
                            <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            
                            <div className="role-selection">
                                <span className="role-label"> Role:</span>
                                <label className="radio-label">
                                <input type="radio" value="User" checked={role === "User"} onChange={() => setRole("User")} /> User
                                </label>
                                <label className="radio-label">
                                <input type="radio" value="Counsellor" checked={role === "Counsellor"} onChange={() => setRole("Counsellor")} /> Counsellor
                                </label>
                            </div>

                            <button onClick={handleSignup}>SignUp</button>
                            <p>Already have an account? <span className="link" onClick={() => { setIsLogin(true); navigate("/signin"); }}>Signin</span></p>
                        </div>
                    )}
                </div>
            </div>
            {showBackButton && (
                <button className="back-button" onClick={() => navigate("/landing")}>Back</button>
            )}
        </div>
    );
}

export default AuthForm;