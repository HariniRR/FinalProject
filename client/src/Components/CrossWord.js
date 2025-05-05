import React, { useState, useEffect } from "react";
import { FaUndo, FaArrowLeft } from "react-icons/fa"; // Importing React icons
import { useNavigate } from "react-router-dom";

const CrosswordGame = () => {
  const [letters] = useState(["R", "U", "U", "L", "R", "M", "U", "U"]);
  const [inputWords, setInputWords] = useState(["", ""]);
  const [submittedWords, setSubmittedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHighScore = localStorage.getItem("crosswordHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const wordList = [
    "RURAL", "MURR", "LURR", "RULE", "RUM", "RUMM", "URL", "LUM", "LUR", // Example valid words
  ];

  const handleWordInputChange = (index, value) => {
    const newInputWords = [...inputWords];
    newInputWords[index] = value.toUpperCase();
    setInputWords(newInputWords);
  };

  const handleSubmitWords = () => {
    let newWords = [];
    let newScore = score;

    inputWords.forEach((word) => {
      if (wordList.includes(word) && !submittedWords.includes(word)) {
        newWords.push(word);
        newScore += word.length * 10;
      }
    });

    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("crosswordHighScore", newScore);
    }

    setScore(newScore);
    setSubmittedWords([...submittedWords, ...newWords]);
    setInputWords(["", ""]);
  };

  const handleAddInputField = () => {
    setInputWords([...inputWords, ""]);
  };

  const handleResetGame = () => {
    setInputWords(["", ""]);
    setSubmittedWords([]);
    setScore(0);
  };

  return (
    <div className="game-container">
      <h1>Crossword Word Game</h1>
      <div className="score-section">
        <h3>Score: {score}</h3>
        <h3>High Score: {highScore}</h3>
      </div>
      <h2>Form new words from the given letters:</h2>
      <div className="letter-grid">
        {letters.map((letter, index) => (
          <div key={index} className="letter-tile">
            {letter}
          </div>
        ))}
      </div>

      <div className="word-input-section">
        {inputWords.map((word, index) => (
          <input
            key={index}
            type="text"
            value={word}
            onChange={(e) => handleWordInputChange(index, e.target.value)}
            placeholder="Enter a word"
            className="word-input"
          />
        ))}
        <button onClick={handleAddInputField} className="add-word-btn">
          + One More Word
        </button>
      </div>

      <button onClick={handleSubmitWords} className="submit-btn">
        Submit Words
      </button>

      <h2>Submitted Words:</h2>
      <ul>
        {submittedWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>

      <div className="button-section">
        <button className="reset-btn" onClick={handleResetGame}>
          <FaUndo style={{ marginRight: '5px' }}/> Reset
        </button>
        <button className="back-btn" onClick={() => navigate("/games")}>
          <FaArrowLeft style={{ marginRight: '5px' }}/> Back
        </button>
      </div>

      <style>{`
        .game-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .score-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .letter-grid {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .letter-tile {
          border: 1px solid #ccc;
          padding: 10px;
          margin: 5px;
          font-size: 24px;
          width: 40px;
          text-align: center;
          border-radius: 5px;
        }
        .word-input-section {
          margin-bottom: 20px;
        }
        .word-input {
          padding: 10px;
          margin: 5px 0;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }
        .add-word-btn {
          background-color:rgb(16, 63, 114);
          color: white;
          border: none;
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          margin-top: 10px;
        }
        .submit-btn {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          margin-bottom: 20px;
        }
       .submit-btn:hover {
           background-color: rgb(8, 14, 6);
        }
        .button-section {
          display: flex;
          justify-content: space-between;
        }
        .reset-btn, .back-btn {
          background-color:rgb(49, 144, 58);
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          display: flex;
          align-items: center;
        }
        .reset-btn:hover, .back-btn:hover {
          background-color:rgb(8, 14, 6);
        }
        h1, h2, h3 {
          font-family: 'Arial', sans-serif;
        }
        h2{
          font-size: 25px;
        }
        h3{
          font-size: 28px;
        }
        ul {
          list-style: none;
          padding-left: 0;
        }
        li {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default CrosswordGame;