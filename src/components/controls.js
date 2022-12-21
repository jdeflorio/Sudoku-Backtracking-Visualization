import styled from "styled-components";

const ControlsContainer = styled.div`
  padding: 25px;
  display: flex;
  place-items: center;
  align-content: center;
  justify-content: center;
`;

const SolveContainer = styled.div`
  display: grid;
  place-items: center;
`;

const SolveButton = styled.button`
  margin: 10px;
  width: 125px;
  height: 75px;
  background-color: #7f85d4;
  border: 0;
  border-radius: 12px;
  font-size: 20px;
  cursor: pointer;
`;

const SpeedButton = styled.button`
  margin: 10px;
  width: 125px;
  height: 50px;
  background-color: #7f85d4;
  border: 0;
  border-radius: 12px;
  font-size: 17px;
  cursor: pointer;
`;

function Controls(props) {
  const {
    checkGrid,
    grid,
    setGrid,
    solveGrid,
    setOpenPopup,
    setFoundSolution
  } = props;

  function handleCheck() {
    console.log("Checking...");
    if (checkGrid(grid)) {
      console.log("Correct!");
    } else {
      console.log("Incorrect :(");
    }
  }

  function slowDownSolve() {
    window.solveSpeed += 25;
  }

  function speedUpSolve() {
    if (window.solveSpeed - 25 <= 0) {
      window.solveSpeed = 1;
    } else {
      window.solveSpeed -= 25;
    }
  }

  async function startSolve() {
    if (await solveGrid(grid, setGrid)) {
      setFoundSolution(true);
    } else {
      setFoundSolution(false);
    }
    setOpenPopup(true);
  }

  function endSolve() {
    window.solveSpeed = 0;
  }

  return (
    <ControlsContainer>
      <SpeedButton onClick={slowDownSolve}>Slow Down</SpeedButton>
      <SolveContainer>
        <SolveButton onClick={startSolve}>Start Solve</SolveButton>
        <SolveButton onClick={endSolve}>End Solve</SolveButton>
      </SolveContainer>
      <SpeedButton onClick={speedUpSolve}>Speed Up</SpeedButton>
    </ControlsContainer>
  );
}

export default Controls;
