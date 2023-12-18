import React, { createContext, useState, useEffect } from 'react';
import "./Style.css"

let initialGrid = [      
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

const calculateWinner = (grid: string[][]) => {
  const rows = grid.map(row => row.join(''));
  const cols = grid[0].map((_, i) => { return grid.map(row => row[i]).join('');});
  const diagonals = [ grid[0][0] + grid[1][1] + grid[2][2], grid[0][2] + grid[1][1] + grid[2][0]];
  const lines = [...rows, ...cols, ...diagonals];
  if (lines.includes('xxx')) { return 'X';}
  if (lines.includes('ooo')) {return 'O';}
  return null;
};


function App() {
  const [grid, setGrid] = useState(initialGrid);
  const [blocco, setblocco] = useState("x");
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const newWinner = calculateWinner(grid);
    setWinner(newWinner);
  }, [grid]);

  const handleClick = (row: number, col: number) => {
    if (grid[row][col] === "" && !winner) {
      const newGrid = grid.map((rowArray, rowIndex) => {
        if (rowIndex === row) {
          return rowArray.map((colValue, colIndex) => {
            if (colIndex === col) {
              return blocco;
            }
            return colValue;
          });
        }
        return rowArray;
      });
      setGrid(newGrid);
      setblocco(blocco === "x" ? "o" : "x");
    }
  }

  function reset() {
    setGrid(initialGrid);
    setblocco("x");
    setWinner(null);
  }

  return (
    <div className='container'>
      <div className='grid'>
        {grid.map((row, rowIndex) => (row.map((col, colIndex) => 
        (<div key={`${rowIndex}${colIndex}`} className='block' 
        onClick={() => handleClick(rowIndex, colIndex)}>{col}</div>))))}
      </div>
      <div className='message'>{winner ? `${winner} vince!` : "Pareggio"}</div>
      <button onClick={reset} style={{margin: "30px"}}>Reset</button>
    </div>
  );
}

export default App;
