import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/*
리액트 컴포넌트 클래스 or 리액트 컴포넌트 타입
개별 컴포넌트는 props라는 매개변수를 받아오고
render를 통해 표시할 뷰 계층 구조를 반환
*/
class Square extends React.Component {
  /*
    render 함수는 화면에서 보고자 하는 내용을 반환.
    react는 설명을 전달받고 결과를 표시.
    특히 render는 렌더링할 내용을 경량화한 React 엘리먼트를 반환
  */
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
/*
  JSX 
  JSX라는 문법을 사용하여 React의 구조를 보다 쉽게 작성.
  <button /> 구문은 빌드하는 시점에서 React.createElement('div')로 변환.
  JSX 내부의 중괄호 안에 어떤 JS 표현식도 사용 가능.
  React 엘리먼트는 JS 객체이며 변수에 저장하거나 프로그램 여기저기에 전달 할 수 있음.
 */
class Board extends React.Component {
  constructor(props) {
    /* 
      JavaScript 클래스에서 하위 클래스의 생성자를 정의할 때 항상 super 호출.
      모든 React 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출 구문부터 작성해야 함.    
    */
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }
  handleClick(i) {
    /*
      slice : 배열 사본 생성
      
      불변성 
      - 데이터 변경의 두가지 방법
        1. 데이터의 값을 직접 변경
        2. 원하는 변경 값을 가진 새로운 사본으로 데이터를 교체
      - 불변성 이점
        1. 복잡한 특징들을 단순하게 만듦.
          * 이전 버전 이력 유지, 재사용 가능
        2. 변화를 감지
          * 참조하고 있는 불변 객체와 이전 객체 비교를 통해 변화 감지가 쉬움
        3. React에서 다시 렌더링 되는 시기를 결정
          * React에서 순수 컴포넌트를 만드는데 도움을 줌.
          * 변하지 않는 데이터는 변경 여부를 쉽게 판단. 컴포넌트 리렌더링 여부 결정.
        
        shouldComponentUpdate()/순수 컴포넌트 공부
        
     */
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({ squares: squares });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
