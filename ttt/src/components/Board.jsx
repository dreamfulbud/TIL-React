import { useState } from "react";
import styled from "styled-components";
import Square from "./Square";

function Board(props) {
  const [state, setState] = useState({
    squares: Array(9).fill(null),
  });

  const handleClick = (i) => {
    const squares = state.squares.slice();
    squares[i] = "X";
    setState({
      squares: squares,
    });
  };
  return (
    <StyledDiv>
      {state.squares.map((_, i) => (
        <Square
          key={i}
          value={state.squares[i]}
          onClick={() => handleClick(i)}
        />
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
