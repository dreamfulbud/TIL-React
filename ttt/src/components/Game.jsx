import { useState } from "react";
import styled from "styled-components";
import Board from "./Board";

function Game() {
  const status = "X";

  return (
    <StyledDiv>
      <Board />

      <section>
        <h2>게임정보</h2>
        <p>Next player: {status}</p>
      </section>
    </StyledDiv>
  );
}
const StyledDiv = styled.div`
  display: flex;
  gap: 40px;
  section {
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    padding-left: 40px;
  }
  h2 {
    margin: 0;
  }
`;
export default Game;
