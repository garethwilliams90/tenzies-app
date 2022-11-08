import React from 'react'

import './Score.css'

export default function Score(props) {

    return (
        <div className='score'>
            <div class="highScore-title">
                Best Score: 
                <span className="highScore-value">
                    {props.highScore}
                </span>
            </div>
            <div className="current-score">
                Rolls This Game: 
                <span className="current-score-value">
                    {props.rollCount}
                </span>
            </div>
        </div>
    )
}