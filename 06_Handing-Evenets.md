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
function Toggle() {
  const [state, setState] = useState({isToggleOn:true});

  handleClick(){
    setState(prevState =>({
      isToggleOn: !prevState.isToggleOn
    }));
  };

  return (
    <button onClick={handleClick}>
      {state.isToggleOn ? "ON" : "OFF"}
    </button>
  );
}
```
