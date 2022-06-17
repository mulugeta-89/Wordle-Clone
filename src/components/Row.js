import React from 'react'

export default function Row({guess, currentGuess}) {

    if(guess){
        return (
            <div className='row past'>
                {guess.map((g, i) => {
                    return <div key={i} className={g.color}>{g.key}</div>
                })}
            </div>
        )
    }
    if(currentGuess){
        let letters = currentGuess.split("")
        return (
            <div className='row current'>
        {letters.map((letter, i) => {
            return <div key={i} className="filled">{letter} </div>

        })}
        {[...Array(5 - letters.length)].map((_, i) => {
            return <div key={i}></div>
        })}
        </div>
        )
    }
  return (
    <div className='row'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
