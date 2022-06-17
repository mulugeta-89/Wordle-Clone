import React, { useEffect , useState} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
export default function Wordle({solution}) {
    const {currentGuess, handleKeyUp, isCorrect, history, guesses, turn, usedKeys}  = useWordle(solution)
    const[show, setShow] = useState(false)
   
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)
        if(isCorrect){
          setTimeout(() => {setShow(true)}, 2000)
          window.removeEventListener('keyup', handleKeyUp)
        }
        if(turn > 5){
          setTimeout(() => {setShow(true)}, 2000)
          window.removeEventListener('keyup', handleKeyUp)
        }
        return () => window.removeEventListener('keyup', handleKeyUp)

    },[handleKeyUp, isCorrect, turn])

    useEffect(() => {
        console.log(guesses, history, isCorrect)
    }, [guesses, turn, isCorrect])
  return (
      <div>
          {/* <div>{solution}</div>
        <div>currentGuess: {currentGuess}</div> */}
      <Grid guesses={guesses} isCorrect={isCorrect} turn={turn} currentGuess={currentGuess}/>
      <Keypad usedKeys={usedKeys}/> 
        { show && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
      </div>
      
  )
}
