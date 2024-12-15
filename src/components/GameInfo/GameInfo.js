import React from 'react'
import './GameInfo.css';

const GameInfo = ({ score, setScore, bestScore, generateRandomTiles, setIsGameOver }) => {

    const newGame = () => {
        const emptyCells = Array(4).fill("").map(() => Array(4).fill(""));

        const constRandomCellCount = 2;
        generateRandomTiles(emptyCells, constRandomCellCount)

        setScore(0);
        localStorage.setItem("bestScore", bestScore);
        localStorage.setItem("currentScore", "0");
        localStorage.removeItem("board");
        setIsGameOver(false);
    }


    return (
            <div className="Info">
                    <div className="appName">2048</div>

                    <div className='currentScore'>
                        <div className='scoreText'>
                            SCORE
                        </div>
                        <div className='scorePoint'>
                            {score}
                        </div>
                    </div>
                    <div className='bestScore'>
                        <div className='scoreText'>
                            BEST
                        </div>
                        <div className='scorePoint'>
                            {bestScore}
                        </div>
                    </div>
                    <div className='newGame' onClick={newGame}>
                        New Game
                    </div>
            </div>
    )
}

export default GameInfo