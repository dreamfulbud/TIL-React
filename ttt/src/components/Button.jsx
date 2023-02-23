import styled from "styled-components";

function Button(props) {
  const { children } = props;
  return <StyledButton {...props}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  border: none;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.3em 0.5em;
  border-radius: 0.4em;
  color: #fff;
  cursor: pointer;
`;

export default Button;
