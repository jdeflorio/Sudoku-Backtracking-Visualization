import styled from "styled-components";
import React, { useEffect, useState } from "react";

const CellContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--cell-size);
  height: var(--cell-size);
  border: solid 1px black;
  border-right-width: ${(props) => (props.isRightEdge ? "4px" : "1px")};
  border-bottom-width: ${(props) => (props.isBottomEdge ? "4px" : "1px")};
  position: relative;
  text-align: center;
  cursor: default;
  background: ${(props) => (props.isSelected ? "#203449" : "#B4C0CC")};
  font-size: 2em;
  font-weight: ${(props) => (props.canEdit ? "normal" : "bold")};
  color: ${(props) => (props.canEdit ? "#3772A6" : "black")};

  &:hover {
    background: ${(props) => (props.isSelected ? "#203449" : "#708594;")};
  }

  &:focus {
    outline: none;
  }
`;

function Cell(props) {
  function handleKeyDown(e) {
    if (
      canEdit &&
      isSelected &&
      (/[1-9]/.test(e.key) ||
        e.key === " " ||
        e.key === "Backspace" ||
        e.key === "Delete")
    ) {
      const input = parseInt(e.key, 10) || 0;
      const newGrid = grid.map((e, rowIndex) => {
        return e.map((v, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            return input;
          } else {
            return v;
          }
        });
      });
      setGrid(newGrid);
    }
  }

  const {
    row,
    col,
    isRightEdge,
    isBottomEdge,
    isSelected,
    onClick,
    grid,
    setGrid
  } = props;

  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setCanEdit(grid[row][col] === 0 ? true : false);
  }, []);

  return (
    <CellContainer
      isRightEdge={isRightEdge}
      isBottomEdge={isBottomEdge}
      isSelected={isSelected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      canEdit={canEdit}
    >
      {grid[row][col] === 0 ? "" : grid[row][col]}
    </CellContainer>
  );
}

export default Cell;
