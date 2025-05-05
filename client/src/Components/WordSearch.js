import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Puzzle = () => {
  const allWords = ["RIGHTS", "SAFETY", "EQUALITY", "PROTECTION", "FREEDOM", "LAWS", "RESPECT", "SECURITY", "JUSTICE", "EMPOWER", "SURVIVOR", "CARE", "TRUST", "SUPPORT", "DIGNITY", "AWARENESS", "EMERGENCY", "GUIDANCE", "ACCESS", "EDUCATION", "PARTICIPATION", "PROGRESS", "SUSTAINABILITY", "HEALTH", "WELLBEING", "COMMUNITY", "RESOURCES", "FAMILY", "CHILDREN", "WOMEN", "WELFARE", "GENDER", "LEGAL"];
  const gridSize = { rows: 12, cols: 24 };
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wordsFound, setWordsFound] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [currentSelection, setCurrentSelection] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    resetGame();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setModalMessage("Time Out!");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        resetGame();
      }, 3000);
    }
  }, [timeLeft]);

  const startTimer = () => {
    setTimeLeft(180); 
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1; 
      });
    }, 1000);
    return () => clearInterval(timer);
  };

  const resetGame = () => {
    const selectedWords = getRandomWords(allWords, 10);
    setWordList(selectedWords);
    generateGrid(selectedWords);
    setScore(0);
    setWordsFound([]);
    startTimer();
  };

  const getRandomWords = (words, count) => {
    const shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const generateGrid = (words) => {
    const emptyGrid = Array(gridSize.rows)
      .fill(null)
      .map(() => Array(gridSize.cols).fill(""));
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newGrid = embedWordsInGrid(emptyGrid, words);

    newGrid = newGrid.map((row) =>
      row.map((cell) =>
        cell === "" ? letters[Math.floor(Math.random() * letters.length)] : cell
      )
    );
    setGrid(newGrid);
  };

  const embedWordsInGrid = (grid, words) => {
    const directions = [
      { x: 1, y: 0 }, // Right
      { x: 0, y: 1 }, // Down
      { x: 1, y: 1 }, // Diagonal Down-Right
      { x: -1, y: 1 }, // Diagonal Down-Left
    ];

    words.forEach((word) => {
      let placed = false;
      while (!placed) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const startX = Math.floor(Math.random() * gridSize.cols);
        const startY = Math.floor(Math.random() * gridSize.rows);

        if (canPlaceWord(grid, word, startX, startY, direction)) {
          for (let i = 0; i < word.length; i++) {
            grid[startY + i * direction.y][startX + i * direction.x] = word[i];
          }
          placed = true;
        }
      }
    });
    return grid;
  };

  const canPlaceWord = (grid, word, x, y, direction) => {
    for (let i = 0; i < word.length; i++) {
      const newX = x + i * direction.x;
      const newY = y + i * direction.y;
      if (
        newX < 0 ||
        newY < 0 ||
        newX >= gridSize.cols ||
        newY >= gridSize.rows ||
        grid[newY][newX] !== ""
      ) {
        return false;
      }
    }
    return true;
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsSelecting(true);
    setSelectionStart({ rowIndex, colIndex });
    setCurrentSelection([{ rowIndex, colIndex }]);
  };

  const handleMouseOver = (rowIndex, colIndex) => {
    if (isSelecting && selectionStart) {
      const newSelection = getHighlightedCells(selectionStart, { rowIndex, colIndex });
      setCurrentSelection(newSelection);
    }
  };

  const handleMouseUp = (rowIndex, colIndex) => {
    if (isSelecting) {
      const selectedWord = getSelectedWord(selectionStart, { rowIndex, colIndex });
      if (wordList.includes(selectedWord) && !wordsFound.includes(selectedWord)) {
        setWordsFound([...wordsFound, selectedWord]);
        const newScore = score + selectedWord.length * 10;
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("highScore", newScore);
        }

        if (wordsFound.length + 1 === wordList.length) {
          setModalMessage("Congratulations!");
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            resetGame();
          }, 3000);
        }
      }
      setIsSelecting(false);
      setSelectionStart(null);
      setCurrentSelection([]);
    }
  };

  const getSelectedWord = (start, end) => {
    const { rowIndex: startX, colIndex: startY } = start;
    const { rowIndex: endX, colIndex: endY } = end;
    let word = "";

    if (startX === endX) {
      const minCol = Math.min(startY, endY);
      const maxCol = Math.max(startY, endY);
      for (let i = minCol; i <= maxCol; i++) {
        word += grid[startX][i];
      }
    } else if (startY === endY) {
      const minRow = Math.min(startX, endX);
      const maxRow = Math.max(startX, endX);
      for (let i = minRow; i <= maxRow; i++) {
        word += grid[i][startY];
      }
    } else if (Math.abs(endX - startX) === Math.abs(endY - startY)) {
      const steps = Math.abs(endX - startX);
      for (let i = 0; i <= steps; i++) {
        const row = startX + i * Math.sign(endX - startX);
        const col = startY + i * Math.sign(endY - startY);
        word += grid[row][col];
      }
    }
    return word;
  };

  const getHighlightedCells = (start, end) => {
    const highlighted = [];
    const { rowIndex: startX, colIndex: startY } = start;
    const { rowIndex: endX, colIndex: endY } = end;

    if (startX === endX) {
      const minCol = Math.min(startY, endY);
      const maxCol = Math.max(startY, endY);
      for (let i = minCol; i <= maxCol; i++) {
        highlighted.push({ rowIndex: startX, colIndex: i });
      }
    } else if (startY === endY) {
      const minRow = Math.min(startX, endX);
      const maxRow = Math.max(startX, endX);
      for (let i = minRow; i <= maxRow; i++) {
        highlighted.push({ rowIndex: i, colIndex: startY });
      }
    } else if (Math.abs(endX - startX) === Math.abs(endY - startY)) {
      const steps = Math.abs(endX - startX);
      for (let i = 0; i <= steps; i++) {
        const row = startX + i * Math.sign(endX - startX);
        const col = startY + i * Math.sign (endY - startY);
        highlighted.push({ rowIndex: row, colIndex: col });
      }
    }
    return highlighted;
  };

  return (
    <div className="word-search-container">
      <div className="header">
        <h1>Word Search Puzzle</h1>
      </div>
      <div className="score-board">
        <h3>
          <span className="score">Score: {score}</span>
          <span className="timer">Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
          <span className="high-score">High Score: {highScore}</span>
        </h3>
      </div>
      <div className="content">
        <div className="word-list">
          <h2>Words to Find</h2>
          <ul>
            {wordList.map((word, index) => (
              <li key={index} className={wordsFound.includes(word) ? "found" : ""}>
                {word}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid-container">
          <table>
            <tbody>
              {grid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((letter, colIndex) => (
                    <td
                      key={colIndex}
                      onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                      onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                      onMouseUp={() => handleMouseUp(rowIndex, colIndex)}
                      className={`grid-cell ${
                        currentSelection.some(cell => cell.rowIndex === rowIndex && cell.colIndex === colIndex) ? "highlighted" : ""
                      }`}
                    >
                      {letter}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/games")}>
          <FaArrowLeft style={{ marginRight: "5px" }} />
          Back
        </button>
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalMessage}</h2>
            <p>{modalMessage === "Time Out!" ? "You ran out of time!" : "You found all the words!"}</p>
          </div>
        </div>
      )}
       <style jsx>{`
        .word-search-container {
          padding: 20px;
          font-family: "Gravitas One", serif;
        }
        .header {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          font-family: "Press Start 2P", cursive;
          font-weight: 700;
          color: #212121; 
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); 
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        h1 {
          text-align: center;
          padding: 20px;
        }
        .score-board {
          text-align: center;
          margin-bottom: 20px;
        }
        h3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0 20px;
        }
        .score {
          text-align: left;
          flex: 1;
          margin-left: 50px;
        }
        .timer {
          text-align: center;
          flex: 1;
        }
        .high-score {
          text-align: right;
          flex: 1;
          margin-right: 50px;
        }
        .content {
          display: flex;
        }
        .word-list {
          margin-right: 20px;
          background-color: #ecf0f1;
          padding: 15px;
          border-radius: 5px;
          box-shadow: 0  2px 5px rgba(0, 0, 0, 0.1);
        }
        .word-list h2 {
          margin-bottom: 10px;
        }
        .word-list ul {
          list-style-type: none;
          padding: 0;
        }
        .word-list li {
          font-size: 18px;
        }
        .word-list li.found {
          text-decoration: line-through;
        }
        .grid-container {
          margin-left: 35px;
          user-select: none;
        }
        table {
          border-collapse: collapse;
        }
        .grid-cell {
          width: 50px;
          height: 35px;
          text-align: center;
          border: 1px solid black;
          cursor: pointer;
        }
        .grid-cell.highlighted {
          background-color: yellow;
        }
        .back-button-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .back-button {
          background-color: rgb(49, 144, 58);
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 1300px;
        }
        .back-button:hover {
          background-color: rgb(8, 14, 6);
        }
        .modal {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
        .modal-content {
          width: 400px;
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .modal-content h2 {
          margin: 0;
        }
        .modal-content p {
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default Puzzle;