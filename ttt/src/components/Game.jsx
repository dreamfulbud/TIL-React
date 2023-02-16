import { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import { calculateWinner } from "./calculateWinner";

function Game() {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    xIsNext: true,
  });
  const handleClick = (i) => {
    const history = state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // 누군가 승리하거나 Square가 채워져 있다면 클릭함수 무시
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !state.xIsNext,
    });
  };

  let status = `Next player: ${state.xIsNext ? "X" : "O"}`;

  const history = state.history;
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${state.xIsNext ? "X" : "O"}`;
  }

  return (
    <StyledDiv>
      <Board squares={current.squares} handleClick={handleClick} />

      <section>
        <h2>게임정보</h2>
        <p>{status}</p>
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
