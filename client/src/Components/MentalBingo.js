import React, { useState, useEffect } from 'react';
import { FaRedo, FaArrowLeft, FaHeart, FaHeartbeat, FaPen, FaWalking, FaGamepad, FaMusic, FaBookReader, FaHandHoldingHeart } from 'react-icons/fa';
import { SiKakaotalk } from "react-icons/si";
import { IoIosWater } from "react-icons/io";
import { IoTimer } from "react-icons/io5";
import { GiNightSleep, GiHeartInside } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const activities = [
  { description: "Practice deep breathing", icon: <FaHeartbeat /> },
  { description: "Write in a journal", icon: <FaPen /> },
  { description: "Take a walk", icon: <FaWalking /> },
  { description: "Meditate for 10 minutes", icon: <FaHandHoldingHeart /> },
  { description: "Talk to a friend", icon: <SiKakaotalk /> },
  { description: "Listen to music", icon: <FaMusic /> },
  { description: "Do some stretches", icon: <FaHeart /> },
  { description: "Drink water", icon: <IoIosWater /> },
  { description: "Read a book", icon: <FaBookReader /> },
  { description: "Get enough sleep", icon: <GiNightSleep /> },
  { description: "Take a break", icon: <GiHeartInside /> },
  { description: "Spend time outside", icon: <IoTimer /> },
];

const shuffleCards = (cards) => {
  const shuffled = [...cards, ...cards].sort(() => Math.random() - 0.5);
  return shuffled.map((card, index) => ({ ...card, id: index, flipped: false, matched: false }));
};

const MentalBingo = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCards(shuffleCards(activities));
  }, []);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
      }, 3000);
    }
  }, [matchedCards.length, cards.length]);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || card.flipped || card.matched) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;
      if (firstCard.description === card.description) {
        const updatedCards = newCards.map((c) =>
          c.description === card.description
            ? { ...c, matched: true, flipped: true }
            : c
        );
        setCards(updatedCards);
        setMatchedCards([...matchedCards, card, firstCard]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(newCards.map((c) => (!c.matched ? { ...c, flipped: false } : c)));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(shuffleCards(activities));
    setFlippedCards([]);
    setMatchedCards([]);
    setGameWon(false);
  };

  return (
    <>
      <div className="bingo-container">
        <h1 style={{ color: 'white',  fontFamily: " 'Poppins' , sans-serif", fontWeight: '800'}}>
          <FaGamepad style={{ marginRight: '7px'}} />
          Mental Health Bingo
        </h1>

        <div className="cards-container">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${card.flipped || card.matched ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`} 
              onClick={() => handleCardClick(card)}
            >
              <div className="card-content">
                {card.flipped || card.matched ? (
                  <>
                    <div className="card-icon">{card.icon}</div>
                    <p>{card.description}</p>
                  </>
                ) : (
                  <span className="question-icon">★</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="button-section">
          <button className="reset-button" onClick={resetGame}>
            <FaRedo />&nbsp; Reset Game
          </button>
          <button className="back-button" onClick={() => navigate('/games')}>
            <FaArrowLeft />&nbsp; Back
          </button>
        </div>

        {showCongrats && (
          <div className="congrats-popup">
            <div className="congrats-message">
              <h2>Congratulations!</h2>
              <p>You matched all the pairs!</p>
            </div>
          </div>
        )}

        <style>{`
          .bingo-container {
            padding: 20px;
            text-align: center;
            font-family: 'Roboto', sans-serif;
            position: relative;
            background: linear-gradient(135deg, #8e44ad, #c0392b);            
            min-height: 100vh; /* Ensure full height */
          }
          h1 {
            font-size: 32px;
            margin-bottom: 30px; 
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .cards-container {
            display: grid;
            grid-template-columns: repeat(6, 1fr); 
            grid-template-rows: repeat(4, 1fr); 
            gap: 10px;
            width: auto;
            max-width: calc(100px * 6 + 85px);
            margin: 0 auto 30px; 
            padding: 20px;
            background-color: #f0f8ff;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          .card {
            background-color: #ccc; 
            width: 100px; 
            height: 100px; 
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 10px;
            transition: transform 0.5s, background-color 0.3s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            position: relative;
            color: black;
          }
          .card.flipped {
            background-color: #ffe6e6;
            transform: rotateY(0deg);
          }
          .card.matched {
            background-color: #ffcccb; /* Change color for matched cards */
          }
          .card-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .card-icon {
            font-size: 24px;
            margin-bottom: 10px;
            color: rgb(23, 77, 25);
          }
          .question-icon {
            font-size: 36px;
            color: #000;
          }
          .button-section {
            display: flex;
            justify-content: space-between; 
            margin-top: 20px;
          }
          .reset-button{
            padding: 10px 15px;
            font-size: 20px;
            background-color: black;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            display: flex;
            align-items: center;
            margin-left: 400px;
          }
          .back-button {
            padding: 10px 15px;
            font-size: 20px;
            background-color: black;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            display: flex;
            align-items: center;
            margin-left: 980px;
            margin-bottom: 65px;
          }
          .reset-button:hover, .back-button:hover {
            background-color: #FF0000  ; 
            transform: scale(1.05); 
          }
          .congrats-popup {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            animation: pop 0.5s ease; 
          }
          .congrats-message {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transform: scale(1.1); /* Slightly larger */
          }
          .congrats-message h2 {
            font-size: 28px;
            margin-bottom: 10px;
            color: #28a745; /* Green color for the title */
          }
          .congrats-message p {
            font-size: 20px;
            margin-bottom: 20px;
          }
          @keyframes pop {
            0% {
              transform: scale(0);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default MentalBingo;