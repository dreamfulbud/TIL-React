# Components와 Props

- JS 함수와 유사.
- props라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환

## 함수 컴포넌트와 클래스 컴포넌트

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

```js
function Welcome extends React.Component {
  render(){
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 컴포넌트 렌더링

- React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달. 이 객체를 "props"라고 함

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <Welcome name="Sara" />;
root.render(element);
```

1. `<Welcome name="Sara" />` 엘리먼트로 `root.render()` 호출
2. React는 `{name:'Sara'}`를 props로 하여 `Welcom` 컴포넌트 호출
3. `Welcome` 컴포넌트는 결과적으로 `<h1>Hello, Sara</h1>` 엘리먼트 반환
4. React DOM은 `<h1>Hello, Sara</h1>` 엘리먼트와 일치하도록 효율적으로 업데이트

**💡 컴포넌트의 이름은 항상 대문자로 시작**

## 컴포넌트 합성

- 컴포넌트는 자신의 출력에 다른 컴포넌트 참조 가능
- 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음

  > 추상화(abstraction)는 복잡한 자료, 모듈, 시스템 등으로부터 핵심적인 개념 또는 기능을 간추려 내는 것

## 컴포넌트 추출

- props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장.

## props는 읽기 전용

- 함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안됨.
- 순수함수 : **입력값을 바꾸려하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환**
  ```js
  function sum(a, b) {
    return a + b;
  }
  ```
- 비 순수함수

  ```js
  function withdraw(account, amount) {
    account.total -= amount;
  }
  ```

- **모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 함**
