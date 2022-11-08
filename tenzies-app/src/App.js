import React from "react"
import Die from "./Die"
import Footer from './Footer'
import SocialIcons from './SocialIcons'
import Score from './Score'


import {nanoid} from "nanoid"
import Confetti from "react-confetti"

import './style.css'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)
    const [highScore, setHighScore] = React.useState(JSON.parse(localStorage.getItem("highScore")) || 0)
    
    // Runs Tenzies check every time state is updated
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            
            if (highScore == 0 || rollCount < highScore) {
                setHighScore(rollCount);
            }
            setRollCount(-1);
            
        }
    }, [dice])

    // Runs every time the highScore state changes
    React.useEffect(() => {
        localStorage.setItem("highScore", JSON.stringify(highScore))

    }, [highScore])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    // When rolled, also need to add 1 to the roll count
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }

        // Increment roll count by 1
        setRollCount(oldCount => oldCount + 1)
        console.log(rollCount)
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti className="confetti"/>}
            <div className="navbar">
                <Score 
                    rollCount={rollCount}
                    highScore={highScore} 
                />
                <h1 className="title">Tenzies</h1>
                <SocialIcons />
            </div>
            
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <Footer />
        </main>
        

    )
}