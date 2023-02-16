import styled from "styled-components";

function Square(props) {
  return <StyledButton {...props}>{props.value}</StyledButton>;
}

const StyledButton = styled.button`
  width: 60px;
  height: 60px;
  border: 5px solid royalblue;
  border-width: 5px 0 0 5px;
  margin: -5px 0 0 -5px;
  background: none;
  color: rgba(65, 105, 225, 0.4);
  font-weight: bold;
  font-size: 40px;
  cursor: pointer;
  box-sizing: border-box;
  line-height: 1;
  padding: 0;
  text-align: center;
`;
export default Square;
