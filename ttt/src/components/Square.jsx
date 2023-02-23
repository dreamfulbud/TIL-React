import styled from "styled-components";

function Square(props) {
  return <StyledButton {...props}>{props.value}</StyledButton>;
}

const StyledButton = styled.button`
  width: 1.4em;
  height: 1.4em;
  border: 5px solid royalblue;
  border-width: 5px 0 0 5px;
  margin: -5px 0 0 -5px;
  background: none;
  color: rgba(65, 105, 225, 0.4);
  font-weight: bold;
  font-size: 4rem;
  cursor: pointer;
  box-sizing: border-box;
  line-height: 1;
  padding: 0;
  text-align: center;

  &.active {
    color: rgba(255, 255, 255, 1);
  }

  &.win {
    background: rgba(65, 105, 225, 0.7);
    color: rgba(255, 255, 255, 1);
  }
`;
export default Square;
