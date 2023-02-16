import styled from "styled-components";
import Game from "./components/Game";

function App() {
  return (
    <StyledDiv>
      <h1>Tic Tac Toe</h1>
      <Game />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  background: #6a8df7;
  padding: 20px;
  color: #fff;
`;

export default App;
