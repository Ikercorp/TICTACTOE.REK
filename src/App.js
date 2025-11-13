import React, { useState, useEffect } from "react";
import Board from "./Board";

export default function App() {
  const [size, setSize] = useState(3);
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [message, setMessage] = useState("");
  const [centerClicks, setCenterClicks] = useState(0);

  const handleClick = (i) => {
    if (calculateWinner(squares, size) || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    // Easter Egg: clic en el centro 3 veces
    const centerIndex = Math.floor((size * size) / 2);
    if (i === centerIndex) {
      setCenterClicks(centerClicks + 1);
      if (centerClicks + 1 === 3) {
        setMessage("🎉 ME DESCUBRISTE IKER SANCHEZ 65042 🎉");
        setTimeout(() => setMessage(""), 5000); // 5 segundos
        setCenterClicks(0);
      }
    }

    const winner = calculateWinner(newSquares, size);
    if (winner) {
      setMessage(`🎉 Ganó ${winner}! 🎉`);
    } else if (newSquares.every((square) => square !== null)) {
      setMessage("QUE MALOS SON EMPATARON! ");
      setTimeout(() => setMessage(""), 3000); // 3 segundos
    }
  };

  const resetGame = () => {
    setSquares(Array(size * size).fill(null));
    setXIsNext(true);
    setMessage("");
    setCenterClicks(0);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setSize(newSize);
    setSquares(Array(newSize * newSize).fill(null));
    setXIsNext(true);
    setMessage("");
    setCenterClicks(0);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe Personalizable 🎲</h1>
      <div className="controls">
        <label>
          Tamaño del tablero:
          <select value={size} onChange={handleSizeChange}>
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
          </select>
        </label>
        <button onClick={resetGame}>Reiniciar</button>
      </div>
      <div className="status">Turno de: {xIsNext ? "X" : "O"}</div>
      <Board squares={squares} onClick={handleClick} size={size} />
      {message && <div className="message">{message}</div>}
    </div>
  );
}

// Función para determinar el ganador
function calculateWinner(squares, size) {
  const lines = [];

  // Filas y columnas
  for (let i = 0; i < size; i++) {
    lines.push([...Array(size)].map((_, j) => i * size + j)); // fila
    lines.push([...Array(size)].map((_, j) => j * size + i)); // columna
  }

  // Diagonales
  lines.push([...Array(size)].map((_, i) => i * (size + 1)));
  lines.push([...Array(size)].map((_, i) => (i + 1) * (size - 1)));

  for (const line of lines) {
    const [first, ...rest] = line;
    if (squares[first] && rest.every((i) => squares[i] === squares[first])) {
      return squares[first];
    }
  }

  return null;
}
