import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HazardImage1 from '../Assets/Hazardhunt1.jpg';
import HazardImage2 from '../Assets/Hazardhunt2.webp';
import HazardImage3 from '../Assets/Hazardhunt3.webp';
import HazardImage4 from '../Assets/Hazardhunt4.webp';

const hazardCoordinates = [
  // Coordinates for the first image
  [
    { x: 1, y: 1 },{ x: 10, y: 10 },
    { x: 120, y: 150 },  
    { x: 350, y: 280 }, 
    { x: 450, y: 450 },
    { x: 120, y: 230 },  
    { x: 400, y: 320 },
  ],
  // Coordinates for the second image
  [
    { x: 1, y: 1 },{ x: 100, y: 10 },
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 300, y: 300 },
    { x: 400, y: 400 },
    { x: 50, y: 50 },
  ],
  // Coordinates for the third image
  [
    { x: 1, y: 1 },{ x: 100, y: 10 },
    { x: 50, y: 50 },
    { x: 150, y: 150 },
    { x: 250, y: 250 },
    { x: 350, y: 350 },
    { x: 450, y: 450 },
  ],
  // Coordinates for the fourth image
  [
    { x: 1, y: 1 },{ x: 100, y: 10 },
    { x: 75, y: 75 },
    { x: 175, y: 175 },
    { x: 275, y: 275 },
    { x: 375, y: 375 },
    { x: 475, y: 475 },
  ],
];

const images = [HazardImage1, HazardImage2, HazardImage3, HazardImage4];

const HazardHunt = () => {
  const [score, setScore] = useState(0);
  const [clickedSpots, setClickedSpots] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const navigate = useNavigate();

  // Load high score from local storage when the component mounts
  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the clicked spot is within the predefined hazard areas
    let isHazardous = false;
    const marginOfError = 50; // Increase margin of error for easier clicking

    for (const hazard of hazardCoordinates[currentImageIndex]) {
      const distance = Math.sqrt(
        Math.pow(hazard.x - x, 2) + Math.pow(hazard.y - y, 2)
      );
      if (distance < marginOfError) { // Check within the margin of error
        isHazardous = true;
        break;
      }
    }

    if (isHazardous) {
      // Check if the hazard has already been clicked
      if (!clickedSpots.some(spot => Math.abs(spot.x - x) < 50 && Math.abs(spot.y - y) < 50)) {
        setScore(score + 5); 
        setClickedSpots([...clickedSpots, { x, y }]);
      }
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setClickedSpots([]);
      setScore(0);
      // Update high score if current score is greater
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', score); // Store new high score in local storage
      }
    }
  };

  const handleShowAnswers = () => {
    setShowAnswers(true);
    setTimeout(() => {
      setShowAnswers(false);
    }, 1000);
  };

  const handleBack = () => {
    navigate('/games'); // Navigate back to the games page
  };

  return (
    <div className="hazard-hunt-container">
      <h1>Hazard Hunt Game</h1>
      <p className="score-text">Score: {score} | High Score: {highScore}</p>

      <div className="image-container">
        <img
          src={images[currentImageIndex]}
          alt="Hazardous Scene"
          onClick={handleImageClick}
          className="hazard-image"
        />
        {clickedSpots.map((spot, index) => (
          <div
            key={index}
            className="mark"
            style={{ left: `${spot.x}px`, top: `${spot.y}px` }}
          />
        ))}
        {showAnswers && (
          hazardCoordinates[currentImageIndex].map((hazard, index) => (
            <div
              key={index}
              className="answer-mark"
              style={{ left: `${hazard.x}px`, top: `${hazard.y}px` }}
            />
          ))
        )}
      </div>

      <div className="button-container">
        {score >= 10 && (
          <button onClick={handleShowAnswers} className="show-answers-button">Show Answers</button>
        )}
        {score > 25 && currentImageIndex < images.length - 1 && (
          <button onClick={handleNextImage} className="next-button">Next</button>
        )}
        <button onClick={handleBack} className="back-button">Back to Games</button>
      </div>

      <style>{`
        .hazard-hunt-container {
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .score-text {
          font-size: 20px; /* Reduced font size for score */
          font-weight: normal; /* Make it normal weight */
        }
        .image-container {
          position: relative;
          display: inline-block;
        }
        .hazard-image {
          width: 800px; 
          height: 500px;
          cursor: crosshair;
        }
        .mark {
          position: absolute;
          width: 60px;  
          height: 60px;
          border-radius: 50%;
          border: 3px solid rgba(255, 0, 0, 0.7);
          background-color: transparent;
        }
        .answer-mark {
          position: absolute;
          width: 60px;  
          height: 60px;
          border-radius: 50%;
          border: 3px solid rgba(0, 255, 0, 0.7);
          background-color: transparent;
        }
        .button-container {
          margin-top: 20px; /* Space between image and buttons */
        }
        .next-button, .show-answers-button, .back-button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          margin: 5px; /* Add some space between buttons */
          background-color: rgb(35, 106, 181); /* Button background color */
          color: white; /* Button text color */
          border: none; /* Remove border */
          border-radius: 5px; /* Rounded corners */
          transition: background-color 0.3s; /* Smooth transition */
        }
        .next-button:hover, .show-answers-button:hover, .back-button:hover {
          background-color: rgb(21, 33, 45); /* Darker shade on hover */
        }
      `}</style>
    </div>
  );
};
export default HazardHunt;