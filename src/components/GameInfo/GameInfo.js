import React from 'react'
import './GameInfo.css';

const GameInfo = () => {
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
                            Best
                        </div>
                        <div className='scorePoint'>
                            0
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameInfo