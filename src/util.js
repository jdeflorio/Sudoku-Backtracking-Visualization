export function checkGrid(grid) {
  for (let i = 0; i < 9; i++) {
    let rowSet = new Set();
    let colSet = new Set();
    let boxSet = new Set();

    for (let j = 0; j < 9; j++) {
      let r = grid[i][j]; //current row cell checked
      let c = grid[j][i]; //current col cell checked
      let b =
        grid[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)]; //current box cell checked

      if (r === 0) {
        return false;
      } else if (rowSet.has(r)) {
        return false;
      } else {
        rowSet.add(r);
      }

      if (c === 0) {
        return false;
      } else if (colSet.has(c)) {
        return false;
      } else {
        colSet.add(c);
      }

      if (b === 0) {
        return false;
      } else if (boxSet.has(b)) {
        return false;
      } else {
        boxSet.add(b);
      }
    }
  }
  return true;
}

export async function solveGrid(grid, setGrid) {
  const newGrid = [...grid];
  const emptySquare = findEmpty(grid);
  if (emptySquare[0] === -1 && emptySquare[1] === -1) {
    return true; //Grid is full
  }
  for (let i = 1; i < 10; i++) {
    if (isValid(grid, emptySquare, i)) {
      //see if num can fit
      grid[emptySquare[0]][emptySquare[1]] = i;
      setGrid(newGrid);
      await sleep(window.solveSpeed);
      if (await solveGrid(grid, setGrid)) {
        //recursivly check new grid, if new grid is full then returns true SOlution Found
        return true;
      } else {
        //try again with new number
        grid[emptySquare[0]][emptySquare[1]] = 0;
        setGrid(newGrid);
        await sleep(window.solveSpeed);
      }
    }
  }
  return false;
}

function findEmpty(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return [-1, -1];
}

function isValid(grid, square, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[square[0]][i] === num && i !== square[1]) {
      return false;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (grid[i][square[1]] === num && i !== square[0]) {
      return false;
    }
  }

  const boxRow = Math.floor(square[0] / 3);
  const boxColumn = Math.floor(square[1] / 3);

  for (let i = boxRow * 3; i < boxRow * 3 + 3; i++) {
    for (let j = boxColumn * 3; j < boxColumn * 3 + 3; j++) {
      if (grid[i][j] === num && i !== square[0] && j !== square[1]) {
        return false;
      }
    }
  }
  return true;
}

function sleep(duration) {
  if (duration === 0) {
    return;
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
