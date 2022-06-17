import { useEffect , useState} from 'react'
import Wordle from './components/Wordle'
import Keypad from './components/Keypad'
function App() {
  const [solution, setSolution] = useState(null)
  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => res.json())
      .then((data) => {
        const randomSol = data[Math.floor((Math.random() * data.length))]        
        setSolution(randomSol.word)
      })
  }, [setSolution])
  return (
    <div className="App">
      <h3>Wordle Game</h3>
      {solution && <Wordle solution={solution}/>}
      
    </div>
  );
}

export default App;
