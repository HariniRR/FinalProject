import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRedo } from "react-icons/fa";

// Rights for children
const childrenRights = [
  "Right to Education",
  "Right to Protection",
  "Right to Freedom from Child Labor",
  "Right to Expression",
  "Right to Health and Care",
  "Right to Information",
  "Right to Recreation",
  "Right to Equality",
  "Right to Life",
  "Right to Family and Parental Care",
  "Right to Privacy",
  "Right to Special Care for Disabled Children",
];

// Rights for women
const womenRights = [
  "Right to Education",
  "Right to Equal Pay",
  "Right to Protection Against Violence",
  "Right to Work",
  "Right to Vote",
  "Right to Own Property",
  "Right to Maternity Benefits",
  "Right to Dignity and Decency",
  "Right Against Dowry",
  "Right to Self Defence",
];

// Scenarios with correct rights for children
const scenariosForChildren = [
  {
    scenario: "A child is denied access to school, even though education is free and mandatory. This child feels isolated and unable to learn like their peers.",
    correctRights: ["Right to Education", "Right to Equality"],
  },
  {
    scenario: "A child is forced to work in a factory instead of attending school. They are missing out on vital education and childhood experiences.",
    correctRights: ["Right to Education", "Right to Freedom from Child Labor"],
  },
  {
    scenario: "A child is being denied access to proper healthcare despite suffering from a serious illness. Their parents are unable to afford the necessary treatment.",
    correctRights: ["Right to Health and Care"],
  },
  {
    scenario: "A child’s views and opinions are disregarded in decisions affecting them. They feel powerless and unheard in their own life.",
    correctRights: ["Right to Expression"],
  },
  {
    scenario: "A child with disabilities is not provided with necessary care and support in school. This lack of support hinders their ability to learn and socialize.",
    correctRights: ["Right to Education", "Right to Special Care for Disabled Children"],
  },
  {
    scenario: "A child is not allowed to participate in sports activities because of their gender. This exclusion affects their confidence and social skills.",
    correctRights: ["Right to Recreation", "Right to Equality"],
  },
  {
    scenario: "A child is not given the opportunity to express their feelings about a family situation. They feel confused and anxious without a safe space to share.",
    correctRights: ["Right to Expression", "Right to Family and Parental Care"],
  },
  {
    scenario: "A child is bullied at school and no action is taken by the authorities. This bullying affects their mental health and sense of safety.",
    correctRights: ["Right to Protection", "Right to Education"],
  },
  {
    scenario: "A child is not allowed to access information about their rights. They remain unaware of the protections available to them.",
    correctRights: ["Right to Information"],
  },
  {
    scenario: "A child is separated from their family during a crisis. They are not provided with the necessary support to cope with this trauma.",
    correctRights: ["Right to Family and Parental Care", "Right to Protection"],
  },
];

// Scenarios with correct rights for women
const scenariosForWomen = [
  {
    scenario: "A woman is denied equal pay for the same job position and workload as her male colleagues. This disparity affects her financial independence and self-esteem.",
    correctRights: ["Right to Equal Pay", "Right to Work"],
  },
  {
    scenario: "A woman faces physical violence at her workplace, and her complaints are ignored. She feels unsafe and unsupported in her work environment.",
    correctRights: ["Right to Protection Against Violence", "Right to Dignity and Decency"],
  },
  {
    scenario: "A woman is forced to quit her job after becoming pregnant, without maternity benefits. This situation leaves her financially vulnerable and stressed.",
    correctRights: ["Right to Maternity Benefits", "Right to Work"],
  },
  {
    scenario: "A woman is being prevented from voting in an election despite meeting all the legal requirements. This denial undermines her rights as a citizen.",
    correctRights: ["Right to Vote", "Right to Equality"],
  },
  {
    scenario: "A woman’s property rights are being violated, and she’s not allowed to inherit her family’s land. This injustice limits her economic opportunities and independence.",
    correctRights: ["Right to Own Property"],
  },
  {
    scenario: "A woman is subjected to harassment while using public transportation. She feels unsafe and is afraid to travel alone.",
    correctRights: ["Right to Protection Against Violence", "Right to Dignity and Decency"],
  },
  {
    scenario: "A woman is denied access to education because of her marital status. This restriction limits her personal growth and career opportunities.",
    correctRights: ["Right to Education", "Right to Equality"],
  },
  {
    scenario: "A woman is not allowed to make decisions regarding her own healthcare. This lack of autonomy affects her well-being and trust in the system.",
    correctRights: ["Right to Health and Care", "Right to Dignity and Decency"],
  },
  {
    scenario: "A woman is pressured to marry against her will. This situation violates her right to choose her own path in life.",
    correctRights: ["Right to Self Defence", "Right to Dignity and Decency"],
  },
  {
    scenario: "A woman is not given maternity leave despite being entitled to it. This lack of support during a critical time affects her health and family.",
    correctRights: ["Right to Maternity Benefits", "Right to Work"],
  },
];

const Rights = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("children"); // Default to children
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedRights, setSelectedRights] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const currentScenarioObj =
    selectedCategory === "children"
      ? scenariosForChildren[currentScenarioIndex]
      : scenariosForWomen[currentScenarioIndex];

  const rightsList =
    selectedCategory === "children" ? childrenRights : womenRights;

  const handleRightSelect = (right) => {
    if (selectedRights.includes(right)) {
      setSelectedRights(selectedRights.filter((r) => r !== right));
    } else {
      setSelectedRights([...selectedRights, right]);
    }
  };

  const handleSubmit = () => {
    const correctRights = currentScenarioObj.correctRights;
    const correctCount = selectedRights.filter((right) =>
      correctRights.includes(right)
    ).length;

    setScore(score + correctCount);
    setShowResult(true);
  };

  const handleNextScenario = () => {
    if (selectedCategory === "children") {
      if (currentScenarioIndex < scenariosForChildren.length - 1) {
        setShowResult(false);
        setSelectedRights([]);
        setCurrentScenarioIndex((prevIndex) => prevIndex + 1);
      } else {
        alert(`You've completed all scenarios for Children! Your score: ${score}`);
        navigate("/games");
      }
    } else {
      if (currentScenarioIndex < scenariosForWomen.length - 1) {
        setShowResult(false);
        setSelectedRights([]);
        setCurrentScenarioIndex((prevIndex) => prevIndex + 1);
      } else {
        alert(`You've completed all scenarios for Women! Your score: ${score}`);
        navigate("/games");
      }
    }
  };

  const resetGame = () => {
    setCurrentScenarioIndex(0);
    setScore(0);
    setSelectedRights([]);
    setShowResult(false);
  };

  const switchCategory = (category) => {
    setSelectedCategory(category);
    resetGame();
  };

  return (
    <div className="game-container">
      <h1>Who's Right</h1>

      <div className="score-section">
        <p>Score: {score}</p>
      </div>

      <div className="category-switch">
        <button
          className={`category-button ${
            selectedCategory === "children" ? "active" : ""
          }`}
          onClick={() => switchCategory("children")}
        >
          Children
        </button>
        <button
          className={`category-button ${
            selectedCategory === "women" ? "active" : ""
          }`}
          onClick={() => switchCategory("women")}
        >
          Women
        </button>
      </div>
      <h2>Scenario: {currentScenarioObj.scenario}</h2>
      <div className="rights-list">
        <h4>Select the relevant rights:</h4>
        <div className="rights-grid">
          {rightsList.map((right, index) => {
            const isSelected = selectedRights.includes(right);
            const isCorrect = currentScenarioObj.correctRights.includes(right);
            return (
              <div
                key={index}
                className={`right-item ${
                  isSelected ? "selected" : ""
                } ${showResult && isCorrect ? "correct" : ""}`}
                onClick={() => handleRightSelect(right)}
              >
                {right}
              </div>
            );
          })}
        </div>
      </div>

      {!showResult && (
        <div className="button-section">
        <button className="submit-button" onClick={handleSubmit}>
          Submit Answer
        </button>
      
        <button className="reset-button" onClick={resetGame}>
          <FaRedo /> Reset Game
        </button>
      
        <button className="back-button" onClick={() => navigate("/games")}>
          <FaArrowLeft /> Back
        </button>
      </div>
      )}

      {showResult && (
        <div className="result-section">
          <p>Correct rights selected: {selectedRights.length}</p>
          <button className="next-button" onClick={handleNextScenario}>
            Next Scenario
          </button>
        </div>
      )}

      <style>{`
        .game-container {
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-size: 32px;
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .score-section {
          position: absolute;
          top: 80px;
          right: 20px;
          font-size: 24px;
          font-weight: bold;
          color: rgb(33, 105, 36);
        }
        .category-switch {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .category-button {
          padding: 10px 20px;
          margin: 0 10px;
          border: none;
          cursor: pointer;
          font-size: 18px;
          border-radius: 5px;
          background-color: #e0e0e0;
          transition: background-color 0.3s;
        }
        .category-button.active {
          background-color: rgb(33, 105, 36);
          color: white;
        }
        .category-button:hover {
          background-color: rgb(19, 78, 68);
        }
        h2 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #555;
        }
        .rights-list {
          margin-bottom: 20px;
        }
        .rights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .right-item {
          padding: 10px;
          cursor: pointer;
          background-color: #f1f1f1;
          border-radius: 5px;
          transition: background-color 0.3s, transform 0.2s;
        }
        .right-item.selected {
          background-color: #ffbf00; /* Harvest gold for selected answers */
          color: black;
        }
        .right-item.correct {
          background-color: #90ee90; /* Light green for correct answers */
          color: black;
        }
        .right-item:hover {
          background-color: #e0e0e0;
          transform: scale(1.05);
        }
        .submit-button,
        .next-button,
        .reset-button,
        .back-button {
          padding: 10px 15px;
          margin-top: 20px;
          cursor: pointer;
          font-size: 18px;
          border: none;
          border-radius: 5px;
          background-color: rgb(23, 77, 25);
          color: white;
          transition: background-color 0.3s;
        }
        .submit-button:hover,
        .next-button:hover,
        .reset-button:hover,
        .back-button:hover {
          background-color: rgb(0, 0, 0);
        }
        .result-section {
          margin-top: 20px;
        }
        .button-section {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 20px;
        }
        .button-section .back-button {
          margin-bottom: 58px;
        }
      `}</style>
    </div>
  );
};

export default Rights;