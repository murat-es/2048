import React from 'react'
import './GameInfo.css';

const GameInfo = ({generateRandomTiles}) => {

    const newGame = () => {
        const emptyCells = Array(4).fill("").map(() => Array(4).fill("")); 
        
        const constRandomCellCount = 2;
        generateRandomTiles(emptyCells, constRandomCellCount)
    }
    

    return (
        <div>
            <div className="Info">
                <div className="appName">2048</div>
                <div className="score">
                    <div className='currentScore'>
                        <div className='scoreText'>
                            SCORE
                        </div>
                        <div className='scorePoint'>
                            0
                        </div>
                    </div>
                    <div className='bestScore'>
                        <div className='scoreText'>
                            BEST
                        </div>
                        <div className='scorePoint'>
                            0
                        </div>
                    </div>
                  
                </div>
                <div className='newGame' onClick={newGame}>
                    New Game
                </div>
            </div>
        </div>
    )
}

export default GameInfo