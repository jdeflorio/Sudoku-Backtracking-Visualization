import Board from "./components/board";
import React, { useState } from "react";
import "./App.css";
import Controls from "./components/controls";
import ResultsPopup from "./components/resultsPopup";
import { checkGrid, solveGrid } from "./util";
import { makepuzzle } from "sudoku";

window.solveSpeed = 25;

export default function App() {

  const puzzle = makepuzzle()
  .reduce((rows, key, index) => (index % 9 === 0 ? rows.push([key === null ? 0 : key + 1]) : rows[rows.length-1].push(key === null ? 0 : key + 1)) && rows, []);

  const [grid, setGrid] = useState(puzzle);
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
          puzzle={puzzle}
        ></ResultsPopup>
      ) : (
        ""
      )}
    </div>
  );
}
