import Dice from "./Components/Dice"
import './App.css'
import React from "react"
import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import ReactConfetti from "react-confetti"
import { useWindowSize } from "@uidotdev/usehooks"

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const btnRef = useRef(null)
  const {width, height} = useWindowSize()
  
  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  useEffect(()=>{
    if(gameWon){
      btnRef.current.focus()
    }
  },[gameWon])


  function generateAllNewDice(){
    const newDice =[]   

    for(let i =0; i < 10; i++){
      const randomNum = Math.floor(Math.random() * 6) + 1 
      newDice.push({
        value: randomNum,
        isHeld: false,
        id:nanoid(),
      })
    }
    return newDice
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die => 
      die.id === id ? 
        {...die, isHeld: !die.isHeld} 
        : die
    ))
}


  const rollDice = () => {
    if(!gameWon){

      setDice(oldDice => oldDice.map(die =>
        die.isHeld ?
        die: 
        {...die, value: Math.floor(Math.random() * 6) + 1 }
      ))
    }else{
      setDice(generateAllNewDice)
    }
  }

  const diceElement = dice.map(dieobj => 
    <Dice 
      value={dieobj.value}  
      isHeld={dieobj.isHeld} 
      key={dieobj.id} 
      hold={() => hold(dieobj.id)}
    />)

  return (
    <main>
      {gameWon && <ReactConfetti width={width} height={height}/> }
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElement}
      </div> 
      <button ref={btnRef} className="roll-btn" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
