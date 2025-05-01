import Dice from "./Components/Dice"
import './App.css'

function App() {

  return (
    <main>
      <div className="dice-container">
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} />
        <Dice value={1} />
      </div>
    </main>
  )
}

export default App
