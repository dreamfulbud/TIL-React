import { useState } from "react";
import styled from "styled-components";
import Square from "./Square";

function Board(props) {
  const { squares, handleClick } = props;
  console.log(props);
  return (
    <StyledDiv>
      {squares.map((_, i) => (
        <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
      ))}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  overflow: hidden;
`;

export default Board;
