import React, { useState } from "react";
import Square from "./Square";

export default function Board({ squares, onClick, size }) {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [centerClicks, setCenterClicks] = useState(0);
  const [showDraw, setShowDraw] = useState(false);

  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => {
        const secretIndex = Math.floor((size * size) / 2);

        // 🥚 Detectar 3 clics en el centro
        if (i === secretIndex) {
          const newCount = centerClicks + 1;
          setCenterClicks(newCount);

          if (newCount === 3) {
            setShowEasterEgg(true);
            setTimeout(() => {
              setShowEasterEgg(false);
              setCenterClicks(0);
            }, 5000); // 🕓 5 segundos
          }
        } else {
          setCenterClicks(0); // Reinicia si clic fuera del centro
        }

        onClick(i);
      }}
    />
  );

  // 🧮 Verificar empate
  const isDraw =
    !calculateWinner(squares) && squares.every((sq) => sq !== null);

  if (isDraw && !showDraw) {
    setShowDraw(true);
    setTimeout(() => setShowDraw(false), 3000); // 🕓 3 segundos
  }

  const rows = [];
  for (let row = 0; row < size; row++) {
    const cols = [];
    for (let col = 0; col < size; col++) {
      cols.push(renderSquare(row * size + col));
    }
    rows.push(
      <div key={row} className="board-row">
        {cols}
      </div>
    );
  }

  return (
    <div className="board-container">
      {rows}
      {showEasterEgg && (
        <div className="easter-egg">
          ME DESCUBRISTE <br />
          Iker Sánchez 65042
        </div>
      )}
      {showDraw && <div className="draw-message">QUE MALOS SON EMPATARON </div>}
    </div>
  );
}

function calculateWinner(squares) {
  const size = Math.sqrt(squares.length);
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
    if (
      squares[first] &&
      rest.every((idx) => squares[idx] === squares[first])
    ) {
      return squares[first];
    }
  }
  return null;
}
