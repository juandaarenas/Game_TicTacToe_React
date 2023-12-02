import { Square } from "./Square.jsx";
export function AlertWinner ({winner, resetGame}) {
    if (winner === null) return null;
    const winnerText = winner === false ? 'Empatados' : 'Ganador'
    return (
      <section className="winner">
        <div className='text'>
          <h2>{winnerText}</h2>
          <header className='win'>
            {winner && <Square>{winner}</Square>}
          </header>
          <footer>
            <button onClick={resetGame}>Jugar de nuevo</button>
          </footer>
        </div>
      </section>
    )
  }