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
  width: 700px;
  height: 600px;
  box-sizing: border-box;
  border-radius: 20px;
  background: #6a8df7;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 60px;
  color: #fff;

  h1 {
    margin: 0 0 20px;
    text-align: center;
  }
`;

export default App;
