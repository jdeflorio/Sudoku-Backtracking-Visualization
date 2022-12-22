import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import Cell from "./cell";

const BoardContainer = styled.div`
  background: white;
  margin: auto;
  padding: 0;
  border-style: solid;
  border-width: 3px;
  width: calc((var(--cell-size) + 2px) * 9 + 6px);
  height: calc((var(--cell-size) + 2px) * 9 + 6px);
  display: flex;
  flex-flow: row wrap;
  margin-left: auto;
  margin-right: auto;
`;

function Board(props) {
  const [activeRow, setActiveRow] = useState(-1);
  const [activeCol, setActiveCol] = useState(-1);
  function setActive(r, c) {
    setActiveRow(r);
    setActiveCol(c);
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);
  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      setActive(-1, -1);
    }
  };
  const refOne = useRef(null);

  const { grid, setGrid } = props;

  return (
    <BoardContainer ref={refOne}>
      {grid.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          const isRightEdge = colIndex === 2 || colIndex === 5;
          const isBottomEdge = rowIndex === 2 || rowIndex === 5;
          return (
            <Cell
              isBottomEdge={isBottomEdge}
              isRightEdge={isRightEdge}
              isSelected={activeRow === rowIndex && activeCol === colIndex}
              row={rowIndex}
              col={colIndex}
              num={cell}
              onClick={() => setActive(rowIndex, colIndex)}
              grid={grid}
              setGrid={setGrid}
            ></Cell>
          );
        });
      })}
    </BoardContainer>
  );
}

export default Board;
