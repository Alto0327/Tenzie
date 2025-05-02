import Dice from "./Components/Dice"
import './App.css'
import { useState } from "react"

function App() {
  const [dice, setDice] = useState(generateAllNewDice)

  function generateAllNewDice(){
    const newDice =[]    

    for(let i =0; i < 10; i++){
      const randomNum = Math.floor(Math.random() * 6) + 1 
      newDice.push(randomNum)
    }
    return newDice
  }

  const handleClick = () => {
    setDice(generateAllNewDice)
  }

  const diceElement = dice.map((num,i) => <Dice value={num} key={i}/>)

  return (
    <main>
      <div className="dice-container">
        {diceElement}
      </div>
      <button className="roll-btn" onClick={handleClick}>Roll</button>
    </main>
  )
}

export default App
