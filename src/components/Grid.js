import React from 'react'
import Row from './Row'
export default function Grid({ guesses, isCorrect, turn, currentGuess}) {
  return (
    <div>
        
        {guesses.map((g, i) => {
            if(turn === i){
              return <Row key={i} currentGuess = {currentGuess}/>
            }
            return <Row guess={g} key={i}/>
        })}


    </div>
  )
}
