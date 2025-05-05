import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Patternpuzzle = () => {
  const navigate = useNavigate();
  const gridSize = 4;
  const totalCells = gridSize * gridSize;
  const defaultTimeLimit = 30;

  const [patterns, setPatterns] = useState([]);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [userSelection, setUserSelection] = useState([]);
  const [timeLeft, setTimeLeft] = useState(defaultTimeLimit);
  const [gameActive, setGameActive] = useState(false);
  const [showPattern, setShowPattern] = useState(true);
  const [message, setMessage] = useState("");

  const generatePatterns = () => {
    let newPatterns = [];
    const numPatterns = 10 + Math.floor(Math.random() * 6); 

    for (let i = 0; i < numPatterns; i++) {
      let patternSize = 2 + Math.floor(Math.random() * 3);
      let patternSet = new Set();

      while (patternSet.size < patternSize) {
        patternSet.add(Math.floor(Math.random() * totalCells));
      }

      newPatterns.push([...patternSet]);
    }

    setPatterns(newPatterns);
    setUserSelection([]);
    setMessage("");
    setGameActive(true);
    setTimeLeft(defaultTimeLimit);
    setShowPattern(true);
    setCurrentPatternIndex(0);

    setTimeout(() => setShowPattern(false), 1500);
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setGameActive(false);
      setMessage("⏳ Time's up! Try Again!");
    }
  }, [gameActive, timeLeft]);

  const handleCellClick = (index) => {
    if (!gameActive || showPattern || userSelection.includes(index)) return;

    const newSelection = [...userSelection, index];
    setUserSelection(newSelection);

    if (newSelection.length === patterns[currentPatternIndex].length) {
      checkPattern(newSelection);
    }
  };

  const checkPattern = (selection) => {
    const correctPattern = patterns[currentPatternIndex];
    const isCorrect =
      selection.sort().join(",") === correctPattern.sort().join(",");

    setMessage(isCorrect ? "✅ Correct!" : "❌ Incorrect! Keep Trying!");
    setGameActive(false);

    setTimeout(() => {
      if (currentPatternIndex < patterns.length - 1) {
        setCurrentPatternIndex(currentPatternIndex + 1);
        setUserSelection([]);
        setMessage("");
        setGameActive(true);
        setShowPattern(true);
        setTimeout(() => setShowPattern(false), 1500);
      } else {
        setMessage("🎉 Game Over! You Completed All Patterns!");
      }
    }, 1500);
  };

  return (
    <>
      <h3 style={{ textAlign: "center", fontFamily: "'Gravitas One', serif", fontSize: "30px", fontWeight: "bold", color: "#fe1c12 ", marginTop: "20px" }}>
        Pattern Puzzle
      </h3>
      <Card className="game-container">
        <div className="game-info">
          <p className="timer">⏳ Time Left: {timeLeft} sec</p>
          <Button onClick={generatePatterns} disabled={gameActive} className="start-button">
            <span>Start Game</span>
          </Button>
        </div>

        <div className="grid">
          {Array.from({ length: totalCells }).map((_, index) => (
            <div
              key={index}
              className={`cell ${
                showPattern && patterns[currentPatternIndex]?.includes(index)
                  ? "highlight"
                  : ""
              } ${userSelection.includes(index) ? "selected" : ""}`}
              onClick={() => handleCellClick(index)}
            ></div>
          ))}
        </div>

        <p>{message}</p>
      </Card>

      <Button className="back-button" onClick={() => navigate("/games")}>
        <FaArrowLeft className="icon" /> Back
      </Button>

      <style jsx>{`
        body {
          background-color: #f0f8ff; /* Set background color for the entire page */
          background: linear-gradient(135deg, #a8e0ff, #f0f8ff); /* Optional: Gradient background */
          margin: 0; /* Remove default margin */
          height: 100vh; /* Full height */
        }
        .game-container {
          width: 600px;
          margin: auto;
          padding: 20px;
          border: 5px solid black;
          text-align: center;
          background-color: white; /* Set background color for the game container */
        }
        .game-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
        }
        .timer {
          font-size: 20px;
          font-weight: bold;
          color:  #3000d3 ;
          margin-left: 35px;
        }
        .start-button {
          background-color: darkblue;
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          margin-right: 35px;
        }
        .start-button span {
          font-weight: bold;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(${gridSize}, 100px);
          gap: 5px;
          margin: 20px auto;
          justify-content: center;
        }
        .cell {
          width: 100px;
          height: 100px;
          background-color: lightgray;
          border: 2px solid black;
          cursor: pointer;
          transition: background 0.3s;
        }
        .highlight {
          background-color: #0655fd; 
        }
        .selected {
          background-color: #fd2806; 
        }
        .back-button {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background-color: white;
          color: black;
          border: 4px solid red;          
          padding: 10px 15px;
          border-radius: 5px;
          font-weight: bold;
        }
        .icon {
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

export default Patternpuzzle;