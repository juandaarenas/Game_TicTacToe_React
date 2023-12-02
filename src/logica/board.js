import { WINNER_COMBOS } from "../constants"
export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      //recuperar las ubicaciones
      const [a, b, c] = combo
      // verificara si el combo coincide
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    //si no coincide seguira con el juego o no hay ganador
    return null
  }