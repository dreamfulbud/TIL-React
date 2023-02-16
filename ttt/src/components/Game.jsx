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
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // 누군가 승리하거나 Square가 채워져 있다면 클릭함수 무시
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: [...history, { squares: squares }],
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  };

  const jumpTo = (step) => {
    console.log(step, state.stepNumber);

    setState({
      history: history,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  let status = `Next player: ${state.xIsNext ? "X" : "O"}`;

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const move = history.map((step, move) => {
    const desc = move ? `Go to move#${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

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
        <ol>{move}</ol>
      </section>
    </StyledDiv>
  );
}
const StyledDiv = styled.div`
  display: flex;
  align-items: flex-start;
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
