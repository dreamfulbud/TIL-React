import styled from "styled-components";
import Square from "./Square";

function Board(props) {
  const { squares, handleClick, winLines } = props;

  return (
    <StyledDiv>
      {squares.map((_, i) => (
        <Square
          key={i}
          value={squares[i]}
          onClick={(e) => handleClick(i, e)}
          className={winLines && winLines.includes(i) ? "win" : null}
        />
      ))}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  border: 6px solid royalblue;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  overflow: hidden;
`;

export default Board;
