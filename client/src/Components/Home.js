import React, { useState } from "react";
import PropTypes from "prop-types"; 
import Background from "../Assets/Background.webp";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers, FaBookOpen, FaBrain, FaLightbulb, FaBalanceScale, FaQuestionCircle, FaGamepad } from "react-icons/fa";

const features = [
  { id: 1, title: "Safety & Security", icon: <FaShieldAlt size={70} />, description: "Access vital safety tools and resources." },
  { id: 2, title: "Community Support", icon: <FaUsers size={70}/>, description: "Connect with a strong, caring network." },
  { id: 3, title: "Education & Awareness", icon: <FaBookOpen size={70} />, description: "Stay informed about your rights and safety." },
  { id: 4, title: "Mental Well-being", icon: <FaBrain size={70}/>, description: "Receive emotional and psychological support." },
  { id: 5, title: "Self-Empowerment", icon: <FaLightbulb size={70}/>, description: "Encouraging self-reliance and confidence through skills and resources." },
  { id: 6, title: "Legal Aid & Rights", icon: <FaBalanceScale size={70}/>, description: "Get guidance on legal protections and rights." },
  { id: 7, title: "Interactive Learning", icon: <FaQuestionCircle size={70} />, description: "Engage in quizzes to test and expand your knowledge." },  
  { id: 8, title: "Engaging Games", icon: <FaGamepad size={70}/>, description: "Explore games designed to promote awareness and learning." }
];

const FeatureCard = ({ feature }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div 
      className="feature-card" 
      onMouseEnter={() => setFlipped(true)} 
      onMouseLeave={() => setFlipped(false)}
      tabIndex={0} // Make it focusable
      role="button"
      aria-label={`Feature: ${feature.title}`}
    >
      <motion.div 
        className="card-inner" 
        animate={{ rotateY: flipped ? 180 : 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="card-front">
          <div className="icon">{feature.icon}</div>
        </div>
        <div className="card-back">
          <h4>{feature.title}</h4>
          <p>{feature.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

FeatureCard.propTypes = {
  feature: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const Home = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <motion.h1 
          className="hero-title" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Empower, Support & Protect
        </motion.h1>
        <motion.p 
          className="hero-subtitle" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.2 }}
        >
          Building a Safer Future for Women & Children
        </motion.p>
        
        <motion.button 
          className="scroll-down-btn" 
          onClick={() => scrollToSection("features-section")} 
          whileHover={{ scale: 1.1, backgroundColor: "#fff2e0" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to features section"
        >
          Learn More
        </motion.button>
      </header>

      {/* Digital Empowerment Section with Animations */}
      <motion.section 
        className="digital-empowerment-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="section-title" 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Digital Empowerment
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Digital empowerment is essential for women and children, enhancing their access to information, education, and opportunities. By fostering digital literacy and safe online environments, we can promote equality and help them navigate the digital landscape confidently.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          This empowerment enables them to participate fully in society, access resources to improve their quality of life, and advocate for their rights. Investing in digital skills training creates a more inclusive future where everyone can thrive.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          When women and children are digitally empowered, they can drive social change, contribute to economic growth, and connect with support networks. Ultimately, digital empowerment is a vital step toward achieving gender equality in the digital age.
        </motion.p>
      </motion.section>

      <section id="features-section" className="features-section">
        <h2 className="section-title" style={{color:"#222"}}>Our Core Values</h2>
        <div className="feature-grid mt-4">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

      <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Empower, Support & Protect. All rights reserved.</p>
      </footer>
      <style jsx>{`
  /* General Page Background */
  .home-container {
          background: linear-gradient(to bottom, #f8f9fa, #e3e3e3);
          min-height: 100vh;
        }

        /* Hero Section with Background Image */
        .hero-section {
          text-align: center;
          padding: 100px 20px;
          min-height: 100vh;
          background: url(${Background}) no-repeat center center/cover;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        /* Overlay for better readability */
        .hero-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }

        /* Hero Content */
        .hero-title,
        .hero-subtitle,
        .scroll-down-btn {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: bold;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .scroll-down-btn {
          background: #6ca2b1;
          color: rgb(14, 1, 1);
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .scroll-down-btn:hover {
          background: #b8342d;
        }


  /* Features Section */
        .features-section {
          text-align: center;
          padding: 40px 20px;
          color: white;
          width: 80%; /* Set width to 80% */
          margin: 0 auto; /* Center the section */
        }

        /* Feature Grid */
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* 4 columns */
          gap: 50px;
          justify-items: center; /* Center items in each grid cell */
          margin-top: 20px; /* Space above the grid */
        }

        /* Flipping Card */
        .feature-card {
          width: 200px;
          height: 200px;
          perspective: 1000px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Inner Flip Effect */
        .card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }

        /* Front & Back */
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%; 
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          padding: 30px;
          text-align: center;
        }

        /* Front Side (Icons Only) */
        .card-front {
          background: rgba(151, 3, 77, 0.9);
          color: white;
        }

        /* Back Side */
        .card-back {
          background: rgba(255, 255, 255, 0.95);
          color: #333;
          transform: rotateY(180deg);
        }

        /* Icon Styling */
        .icon {
          font-size: 45px;
        }


  /* Footer */
    .footer {
          background-color: #222;
          color: #ffffff;
          text-align: center;
          padding: 15px;
          position: relative;
          bottom: 0;
          width: 100%;
        }

  /* Digital Empowerment Section */
  .digital-empowerment-section {
    padding: 50px 20px;
    background: linear-gradient(135deg, #ffccbc, #d1c4e9);
    color: #3e2723;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    margin: 20px;
    position: relative;
    overflow: hidden;
  }

  .digital-empowerment-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }

  .digital-empowerment-section .section-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #d32f2f;
    font-weight: bold;
    text-transform: uppercase;
    z-index: 2;
  }

  .digital-empowerment-section p {
    margin-bottom: 15px;
    line-height: 1.8;
    font-size: 1.1rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 20px;
    z-index: 2;
  }

  /* Call to Action Button */
  .digital-empowerment-section .cta-button {
    background-color: #d32f2f;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    margin-top: 25px;
    transition: background-color 0.3s, transform 0.2s;
    z-index: 2;
  }

  .digital-empowerment-section .cta-button:hover {
    background-color: #b71c1c;
    transform: scale(1.05);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .digital-empowerment-section {
      padding: 30px 10px;
    }

    .digital-empowerment-section .section-title {
      font-size: 2rem;
    }

    .digital-empowerment-section p {
      font-size: 1rem;
    }

    /* Adjust feature grid for smaller screens */
    .feature-grid {
      grid-template-columns: repeat(2, 1fr); /* 2 columns on smaller screens */
    }

    .features-section {
      width: calc(100% - 100px); /* Adjust width for smaller screens */
      margin-left: 50px; /* Set left margin */
      margin-right: 50px; /* Set right margin */
    }
  }
`}</style>

    </div>
  );
};

export default Home;