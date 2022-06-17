import { useState} from 'react'

const useWordle = (solution) => {
    const[turn, setTurn] =  useState(0)
    const [currentGuess, setCurrentGuess] = useState("")
    const[guesses, setGuesses]  = useState([...Array(6)])
    const[history, setHistory] = useState([])
    const[isCorrect, setIsCorrect] = useState(false)
    const[usedKeys, setUsedKeys] = useState({})
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'gray'}
        })

        formattedGuess.forEach((l, i) => {
            if(l.key === solutionArray[i]){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        formattedGuess.forEach((l, i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setUsedKeys((prevKeys) => {
            const newKeys = {...prevKeys}
            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key]
                if(l.color === 'green'){
                    newKeys[l.key] = 'green'
                    return
                }
                else if(l.color === 'yellow' && currentColor !== 'green'){
                    newKeys[l.key] = 'yellow'
                    return
                }
                else if(l.color === 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[l.key] = 'gray'
                    return
                }
                })
                return newKeys
        })
        setCurrentGuess('')

    }
    const handleKeyUp = ({key}) => {
        if(key === "Enter"){
            if(turn > 5){
                console.log("turns should not be greater than 5")
                return
            }
            if(history.includes(currentGuess)){
                console.log("duplicated words are not allowed")
                return 
            }
            if(currentGuess.length < 5){
                console.log("words must be 5 chars long")
                return
            }
            const format = formatGuess()
            addNewGuess(format)
       
        }
        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
        }
        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess((prev) => prev +=key)
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyUp, history, usedKeys}
}

export default useWordle