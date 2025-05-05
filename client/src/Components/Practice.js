import React, { useState } from "react";
import { FaWalking,FaRunning, FaPen, FaPhone, FaWater, FaMusic, FaLeaf, FaSmile, FaBook, FaGratipay, FaHeart, FaCookieBite, FaBed, FaTree, FaPaintBrush, FaDog, FaFistRaised, FaCoffee, FaHandsHelping, FaTv } from "react-icons/fa";

const activitiesWithIcons = [
  { activity: "Practice deep breathing", icon: <FaLeaf /> },
  { activity: "Write in a journal", icon: <FaPen /> },
  { activity: "Take a walk", icon: <FaWalking /> },
  { activity: "Call a friend or family member", icon: <FaPhone /> },
  { activity: "Drink a glass of water", icon: <FaWater /> },
  { activity: "Listen to music you love", icon: <FaMusic /> },
  { activity: "Stretch for 5 minutes", icon: <FaRunning /> },
  { activity: "Meditate for 10 minutes", icon: <FaSmile /> },
  { activity: "Do something creative", icon: <FaPaintBrush /> },
  { activity: "Take a break from social media", icon: <FaPhone /> },
  { activity: "Read a book", icon: <FaBook /> },
  { activity: "Practice gratitude", icon: <FaGratipay /> },
  { activity: "Do a quick workout", icon: <FaFistRaised /> },
  { activity: "Cook a healthy meal", icon: <FaCookieBite /> },
  { activity: "Write down three things you're grateful for", icon: <FaPen /> },
  { activity: "Get a good night's sleep", icon: <FaBed /> },
  { activity: "Watch a feel-good movie", icon: <FaTv /> },
  { activity: "Spend time in nature", icon: <FaTree /> },
  { activity: "Plan a self-care day", icon: <FaHeart /> },
  { activity: "Clean a small area in your home", icon: <FaHandsHelping /> },
  { activity: "Spend time with a pet", icon: <FaDog /> },
  { activity: "Try yoga or another calming exercise", icon: <FaRunning /> },
  { activity: "Limit caffeine or sugar for the day", icon: <FaCoffee /> },
  { activity: "Do a random act of kindness", icon: <FaGratipay /> },
  { activity: "Take a few moments to relax", icon: <FaSmile /> }
];

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const generateBingoCard = () => {
  const shuffledActivities = shuffleArray(activitiesWithIcons);
  return Array(5)
    .fill(null)
    .map((_, rowIndex) => shuffledActivities.slice(rowIndex * 5, rowIndex * 5 + 5));
};

const Practice = () => {
  const [bingoCard, setBingoCard] = useState(generateBingoCard());
  const [markedCells, setMarkedCells] = useState([]);
  const [hasWon, setHasWon] = useState(false);

  const toggleCellMark = (row, col) => {
    const cellKey = `${row}-${col}`;
    if (markedCells.includes(cellKey)) {
      setMarkedCells(markedCells.filter((key) => key !== cellKey));
    } else {
      setMarkedCells([...markedCells, cellKey]);
    }
  };

  const checkWinCondition = () => {
    // Check rows
    for (let row = 0; row < 5; row++) {
      if ([0, 1, 2, 3, 4].every((col) => markedCells.includes(`${row}-${col}`))) {
        return true;
      }
    }
    // Check columns
    for (let col = 0; col < 5; col++) {
      if ([0, 1, 2, 3, 4].every((row) => markedCells.includes(`${row}-${col}`))) {
        return true;
      }
    }
    // Check diagonals
    if ([0, 1, 2, 3, 4].every((i) => markedCells.includes(`${i}-${i}`))) {
      return true;
    }
    if ([0, 1, 2, 3, 4].every((i) => markedCells.includes(`${i}-${4 - i}`))) {
      return true;
    }
    return false;
  };

  const handleCellClick = (row, col) => {
    toggleCellMark(row, col);
    if (checkWinCondition()) {
      setHasWon(true);
    }
  };

  const resetGame = () => {
    setBingoCard(generateBingoCard());
    setMarkedCells([]);
    setHasWon(false);
  };

  return (
    <div className="bingo-game">
      <h1>Mental Health Bingo</h1>
      <p>Mark off the activities you complete! Complete a row, column, or diagonal to win.</p>

      {hasWon ? (
        <div className="win-message">
          <h2>Congratulations! You've won the Mental Health Bingo!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="bingo-card">
          {bingoCard.map((row, rowIndex) => (
            <div key={rowIndex} className="bingo-row">
              {row.map((activityObj, colIndex) => {
                const isMarked = markedCells.includes(`${rowIndex}-${colIndex}`);
                return (
                  <div
                    key={colIndex}
                    className={`bingo-cell ${isMarked ? "marked" : ""}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {activityObj.icon}
                    <p>{activityObj.activity}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .bingo-game {
          text-align: center;
          font-family: Arial, sans-serif;
        }
        h1 {
          font-size: 2em;
          color: #4CAF50;
        }
        .bingo-card {
          display: inline-block;
          margin-top: 20px;
        }
        .bingo-row {
          display: flex;
        }
        .bingo-cell {
          width: 120px;
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 5px;
          padding: 10px;
          background-color: #f1f1f1;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .bingo-cell:hover {
          background-color: #e0e0e0;
        }
        .bingo-cell p {
          margin-top: 10px;
          font-size: 14px;
        }
        .bingo-cell.marked {
          background-color: #4CAF50;
          color: white;
        }
        .win-message {
          margin-top: 20px;
          color: #4CAF50;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default Practice;
