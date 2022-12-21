import styled from "styled-components";

const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  color: #082c6c;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopUpMessage = styled.h1`
  color: #082c6c;
`;

const PopUpButton = styled.button`
  margin-top: 50px;
  width: 125px;
  height: 50px;
  background-color: #7f85d4;
  border: 0;
  border-radius: 12px;
  font-size: 17px;
  cursor: pointer;
`;

const PopUpBox = styled.div`
  position: relative;
  padding: 32px;
  width: 300px;
  height: 25%;
  background: #bebebe;
  color: #082c6c;
  border-radius: 10px;
  border: 2px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  margin: 8px 10px 0 0;
  font-size: 20px;
`;

function ResultsPopUp(props) {
  const { foundSolution, setOpenPopup, setGrid, puzzle } = props;

  function handleCloseButton() {
    setOpenPopup(false);
  }

  function handleResetButton() {
    setGrid(puzzle);
    handleCloseButton();
  }

  return (
    <PopUpContainer>
      <PopUpBox>
        <CloseButton onClick={handleCloseButton}>X</CloseButton>
        {foundSolution ? (
          <PopUpMessage>Sudoku Board Complete !</PopUpMessage>
        ) : (
          <PopUpMessage>Cannont Find Solution</PopUpMessage>
        )}
      </PopUpBox>
    </PopUpContainer>
  );
}

export default ResultsPopUp;
