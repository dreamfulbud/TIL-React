import styled from "styled-components";
import Square from "./Square";

function Board(props) {
  return (
    <StyledDiv>
      <Square {...props} />
      <Square {...props} />
      <Square {...props} />
      <Square {...props} />
      <Square {...props} />
      <Square {...props} />
      <Square {...props} />
      <Square {...props} />
      <Square {...props} />
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
