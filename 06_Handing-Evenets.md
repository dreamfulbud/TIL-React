# 이벤트 처리하기

- React의 이벤트는 소문자 대신 camelCase 사용
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러 전달
- 기본 동작을 방지하기 위해선 `preventDefault`를 명시적으로 호출해야함

```js
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit");
  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

- `e`: 합성 이벤트
- React는 W3C 명세에 따라 합성 이벤트를 정의하기 때문에 브라우저 호환성에 대해 걱정할 필요가 없음
- React 이벤트는 브라우저 고유 이벤트와 정확히 동일하게 동작하지는 않음.
- `addEventListener` 호출 대신 엘리먼트가 처음 렌더링될 때 리스너를 제공

```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}
```

- JSX 콜백 안에서 `this`의 의미에 대해 주의
- JavaScript에서 클래스 메서드는 기본적으로 바인딩 되어 있지 않음.
- `this.handleClick`을 바인딩 하지 않고 `onClick`에 전달하였다면, 함수가 실제 호출될때 this는 undefined
- `onClick={this.handleClick}`과 같이 `()`를 사용하지 않고 메서드를 참조할 경우, 해당 메서드를 바인딩 해야함.

## 이벤트 핸들러에 인자 전달하기

```js
// 화살표함수
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

// Function.prototype.bind
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

- 두 경우 모두 React 이벤트를 나타내는 `e` 인자가 ID 뒤에 두번째 인자로 전달.
- 함수를 사용하면 명시적으로 인자를 전달
- `bind`를 사용할 경우 추가 인자가 자동으로 전달
