import Board from "./components/board";
import React, { useState } from "react";
import "./App.css";
import Controls from "./components/controls";
import ResultsPopup from "./components/resultsPopup";
import { checkGrid, solveGrid } from "./util";

window.solveSpeed = 25;

export default function App() {
  const testGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  /*const testGrid = [ [5, 3, 4, 6, 7, 8, 9, 1, 2],
               [6, 7, 2, 1, 9, 5, 3, 4, 8],
               [1, 9, 8, 3, 4, 2, 5, 6, 7],
               [8, 5, 9, 7, 6, 1, 4, 2, 3],
               [4, 2, 6, 8, 5, 3, 7, 9, 1],
               [7, 1, 3, 9, 2, 4, 8, 5, 6],
               [9, 6, 1, 5, 3, 7, 2, 8, 4],
               [2, 8, 7, 4, 1, 9, 6, 3, 5],
               [3, 4, 5, 2, 8, 6, 1, 7, 9]
               ]*/

  const [grid, setGrid] = useState(testGrid);
  const [openPopup, setOpenPopup] = useState(false);
  const [foundSolution, setFoundSolution] = useState(false);

  return (
    <div className="App">
      <h1> Sudoku Backtracking Visualization </h1>
      <Board grid={grid} setGrid={setGrid}></Board>
      <Controls
        checkGrid={checkGrid}
        solveGrid={solveGrid}
        grid={grid}
        setGrid={setGrid}
        setOpenPopup={setOpenPopup}
        setFoundSolution={setFoundSolution}
      ></Controls>
      {openPopup ? (
        <ResultsPopup
          foundSolution={foundSolution}
          setOpenPopup={setOpenPopup}
          setGrid={setGrid}
          testGrid={testGrid}
        ></ResultsPopup>
      ) : (
        ""
      )}
    </div>
  );
}
