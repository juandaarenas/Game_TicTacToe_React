import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinner } from './logica/board.js'
import { AlertWinner } from './components/AlertWinner.jsx'
import { saveGameToStorage , resetGameToStorage } from './logica/storage/index.js'
function App() {
  const [board, setBoard] = useState( ()=>{ 
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() =>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    //removera los turnos y el tablero despues de reiniciar el juego
    //aunque recargue la pagina
    resetGameToStorage()
  }
  const checkEndGame = (newBoard) =>{
    //revisara si hubo un empate
    return newBoard.every((square) => square !== null)
  }
  const updateBoard = (index) =>{
    //no renderizara la posicion si ya esta ocupada por algo
    if(board[index] || winner) return
    //actualizara el tablero de juego
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //actualizara el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardar aca la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    //verificara si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      // Este dara el aviso por si ya se ocuparon las casillas y no hay ganador
      setWinner(false)
    }
  }
  return (
    <main className="board">
      <h1>
        Tic Tac Toe
      </h1>
      <section className="game">
        {
          board.map((square,index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>
      <button onClick={resetGame}> Reiniciar </button>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <AlertWinner resetGame={resetGame} winner={winner} />
    </main>
  )
}
export default App
