import styled from "styled-components";

function Square(props) {
  const { value } = props;
  return <StyledButton {...props}>{value}</StyledButton>;
}

const StyledButton = styled.button`
  width: 60px;
  height: 60px;
  border: 5px solid royalblue;
  border-width: 5px 0 0 5px;
  background: none;
  color: rgba(65, 105, 225, 0.4);
  font-weight: bold;
  font-size: 40px;
  cursor: pointer;

  &:first-child {
    border-left: 0;
  }
  .first & {
    border-top: 0;
  }
`;
export default Square;
