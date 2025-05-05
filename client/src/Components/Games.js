import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WordSearch from "../Assets/Wordsearch.jpg";
import Rights from "../Assets/Rights.jpg";
import Hazardhunt from "../Assets/Hazardhunt.jpg";
import Mindmaze from "../Assets/Mindmaze.jpg";
import Canvas from "../Assets/Canvas.jpg";
import Patternpuzzle from "../Assets/Patternpuzzle.jpg";

const gamesData = [
  {
    name: "Word Search Puzzle",
    instructions: "Find and select the hidden words related to rights, safety, and well-being in the grid. Click and drag to highlight words in any direction before time runs out.",
    image: WordSearch,
    route: "/WordSearch",
  },
   {
    name: "Crossword Puzzle",
    instructions: "Solve crosswords related to legal rights and safety.",
    image: Crossword,
    route: "/Crossword",
  },
 
  // {
  //   name: "Escape the Danger",
  //   instructions: "Navigate through the maze and find the exit while avoiding hazards.",
  //   image: Escape,
  //   route: "/EscapeFromDanger",
  // },
 
  {
    name: "Practicing Mental Well-being ",
    instructions: "Identify the correct actions for maintaining your mental health .",
    image: practice,
    route: "/Practice",
  },
  {
    name: "Who's Right?",
    instructions: "Read the given scenario carefully and analyze the situation. Select the correct legal rights that apply to the scenario and earn points for each correct answer.",
    image: Rights,
    route: "/WhosRightGame",
  },
  {
    name: "Hazard Hunt",
    instructions: "Identify potential risks and unsafe situations. Click on the hazards hidden in the scenario to learn about the dangers and how to prevent them.",
    image: Hazardhunt,
    route: "/HazardHunt",
  },
  {
    name: "Mental Health Bingo",
    instructions: "Click Play Now to begin the game. Flip the cards to reveal self-care activities and find matching pairs. Match all pairs before time runs out to win.",
    image: Mindmaze,
    route: "/MentalBingo",
  },
  {
    name: "Pattern Puzzle",
    instructions: "Click Start Game to begin. Watch and memorize the highlighted pattern before it disappears, then click the same cells to match it within the time limit.",
    image: Patternpuzzle,
    route: "/patternpuzzle",
  },
  {
    name: "Canvas",
    instructions: "Use your mouse to draw with  different brush color and size, fill your artwork with vibrant colors, use the clear button to erase  and the save button to download your artwork.",
    image: Canvas,
    route: "/Canvas",
  },
];

const Games = () => {
  const navigate = useNavigate();

  return (
    <div className="game-container">
      <h2 className="header">Games</h2>
      <div className="games-list">
        {gamesData.map((game, index) => (
          <Card className="game-card" key={index}>
            <div className="card-container">
              {/* Left Side - Game Image */}
              <div className="game-image">
                <img src={game.image} alt={game.name} />
              </div>

              {/* Middle - Game Details */}
              <div className="game-info">
                <h5 className="game-title">{game.name}</h5>
                <p className="game-desc">{game.instructions}</p>
              </div>

              {/* Right Side - Play Button */}
              <div className="button-container">
                <Button variant="primary" className="play-btn" onClick={() => navigate(game.route)}>
                  PLAY NOW
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* Styling */}
      <style jsx>{`
        .header {
          background: #2e18d7;
          color: white;
          text-align: center;
          padding: 15px;
          font-size: 30px;
          font-weight: 700;
          width: 100%;
          font-family: "Lilita One", sans-serif;
        }
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px;
          gap: 15px;
          position: relative;
          min-height: 100vh;
          padding-bottom: 60px; /* Space for back button */
        }
        .games-list {
          flex: 1; /* Allow this section to grow */
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .game-card {
          width: 70rem; 
          background: linear-gradient(to right, #ff7e5f, #feb47b);
          color: white;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .game-card:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
          background: linear-gradient(to right, #ff6a5f, #fd946b); 
        }
        .card-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .game-image img {
          width: 220px;
          height: 160px;
          border-radius: 10px;
          border: 3px solid white;
        }
        .game-info {
          flex: 1;
          text-align: left;
        }
        .game-title {
          font-size: 22px;
          font-weight: bold;
          font-family: 'Lobster', cursive;
        }
        .game-desc {
          font-size: 16px;
          color: #f1f1f1;
          font-family: 'Poppins', sans-serif;
        }
        .button-container {
          display: flex;
          align-items: center;
        }
        .play-btn {
          background-color: #0056b3;
          border: none;
          padding: 12px 20px;
          font-size: 16px;
          font-weight: bold;
          color: white;
          border-radius: 5px;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .play-btn:hover {
          background-color: #003d80;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Games;