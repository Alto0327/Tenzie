import Dice from "./Components/Dice"
import './App.css'
import { useState } from "react"
import { nanoid } from "nanoid"

function App() {
  const [dice, setDice] = useState(generateAllNewDice)

  //Check if Game is won
  let gameWon = false

  if(dice.every(die=> die.isHeld) &&  dice.every(die=>die.value === dice[0].value)){
    console.log('Game Won')
    gameWon = true
  }

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
    setDice(oldDice => oldDice.map(die =>
      die.isHeld ?
        die: 
        {...die, value: Math.floor(Math.random() * 6) + 1 }
    ))
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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElement}
      </div>
        <button className="roll-btn" onClick={rollDice}>
          {gameWon? 'New Game':'Roll'}
        </button>
    </main>
  )
}

export default App
