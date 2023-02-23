import { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import Button from "./Button";
import { calculateWinner } from "./calculateWinner";

function Game() {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
        row: null,
        col: null,
      },
    ],
    stepNumber: 0,
    xIsNext: true,
    xIsAscending: true,
  });
  const currentClick = (e) => {
    document.querySelectorAll("button").forEach((button) => {
      button.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  const handleClick = (i, e) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const { winner } = calculateWinner(squares);
    // 누군가 승리하거나 Square가 채워져 있다면 클릭함수 무시

    if (winner || squares[i]) {
      return;
    }
    currentClick(e);

    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: [
        ...history,
        {
          squares: squares,
          row: Math.floor(i / 3) + 1,
          col: (i % 3) + 1,
        },
      ],
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
      xIsAscending: state.xIsAscending,
    });
  };

  const jumpTo = (step) => {
    setState({
      history: history,
      stepNumber: step,
      xIsNext: step % 2 === 0,
      xIsAscending: state.xIsAscending,
    });
  };

  const handleSort = () => {
    console.log(!state.xIsAscending);
    setState({
      history: state.history,
      stepNumber: state.stepNumber,
      xIsNext: state.xIsNext,
      xIsAscending: !state.xIsAscending,
    });
  };
  let status = `Next player: ${state.xIsNext ? "X" : "O"}`;

  const history = state.history;
  const current = history[state.stepNumber];
  const { winner, lines } = calculateWinner(current.squares);

  const move = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${history[move].row}, ${history[move].col})`
      : "Go to game start";
    return (
      <li value={move + 1} key={move}>
        <Button onClick={() => jumpTo(move)}>{desc}</Button>
      </li>
    );
  });
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!current.squares.includes(null)) {
    status = `무승부입니다`;
  } else {
    status = `Next player: ${state.xIsNext ? "X" : "O"}`;
  }

  return (
    <StyledDiv>
      <Board
        squares={current.squares}
        handleClick={handleClick}
        winLines={lines}
      />

      <section>
        <h2>게임정보</h2>
        <p>{status}</p>

        <div className="flex">
          <h3>History</h3>
          <Button type="button" onClick={handleSort}>
            {state.xIsAscending ? "▲ 오름차순" : "▼ 내림차순"}
          </Button>
        </div>
        <ol>{state.xIsAscending ? move : move.reverse()}</ol>
      </section>
    </StyledDiv>
  );
}
const StyledDiv = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;

  & > div {
  }

  section {
    flex-grow: 1;
    height: 100%;
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    padding-left: 40px;
  }
  h2,
  h3 {
    margin: 0;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ol {
    padding-left: 1em;

    li button {
      width: 100%;
    }
    li:not(:first-child) {
      margin-top: 0.3em;
    }
  }
`;
export default Game;
