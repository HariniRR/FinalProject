import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EscapeFromDanger = () => {
    return (
        <div className="game-play-area">
            <h2>Escape from Danger</h2>
            {/* Here you can add the game content - scenarios simulations or like quizzes*/}
            <Link to="/games">
                <button className="back-button">
                    <FaArrowLeft style={{ marginRight: '5px' }} /> Back
                </button>
            </Link>
            <style jsx>{`
                .game-play-area {
                    padding: 20px;
                    background-color: #f0f0f0;
                    font-family: Arial, sans-serif;
                }
                .back-button {
                    background-color:rgb(74, 101, 198);
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-bottom: 20px;
                }

                .back-button:hover {
                    background-color:rgb(1, 1, 2);

                }

                h2 {
                    margin: 0 0 10px;
                }

                p {
                    font-size: 16px;
                }
            `}</style>
        </div>
    );
};

export default EscapeFromDanger;