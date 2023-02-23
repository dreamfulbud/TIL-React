# Hook 개요

## State Hook

- useState는 현재의 state 값과 이 값을 업데이트하는 함수를 쌍으로 제공.
- 이 함수는 이벤트 핸들러나 다른 곳에서 호출할 수 있음.
- useState의 초기값은 첫 번째 렌더링에만 딱 한번 사용.

```js
const [count, setCount] = useState(0);
```

### 여러 state 변수 선언

- 배열 구조 분해 문법은 useState로 호출된 state 변수들을 다른 변수명으로 할당할 수 있게 해줌.

```js
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState("banana");
const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
```

### Hook이란?

- 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)를 연동(hook into)할 수 있게 해주는 함수.
- class 안에서는 동작하지 않음. class 없이 React 사용 가능.

## Effect Hook

- useEffect 함수는 컴포넌트 내에서 side effects를 수행할 수 있게 해줌.
  - side effects : 컴포넌트 안에서 데이터를 가저오거나 구독, DOM 직접 조작 등의 모든 동작. 다른 컴포넌트에 영향을 줄 수 있고, 렌더링 과정에서는 구현할 수 없는 작업.
- class의 `componentDidMount` 나 `componentDidUpdate`, `componentWillUnmount`와 같은 목적으로 제공되지만, 하나의 API로 통합된 것
- useEffect를 사용하면, React는 DOM을 바꾼 뒤에 "effect" 함수를 사용.
- Effects는 컴포넌트 안에 선언되었기 때문에 props, state에 접근할 수 있음.
- 기본적으로 React는 매 렌더링 이후 effect를 실행. 첫 번째 렌더링도 포함.
- effect를 해제할 필요가 있다면, 해제하는 함수를 반환.(선택적)

```js
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

- unmount 될때 구독 해지.
- 재 렌더링이 일어나 effect를 재실행하기 전에도 마찬가지로 구독 해지.
- 컴포넌트 내에서 여러개의 effect를 사용할 수 있음.
- Hook을 사용하면 구독을 추가하고 제거하는 로직과 같이 서로 관련 있는 코드를 한군데에 모아서 작성 가능.

## Hook의 사용 규칙

1. 최상위에서만 Hook을 호출 해야함. 반복문, 조건문, 중첩된 함수 내에서 실행 X
2. React 함수 컴포넌트 내에서만 호출. 일반 JS 함수에서 호출 X

## 나만의 Hook 만들기

- 상태 관련 로직을 컴포넌트 간에 재사용하고 싶은 경우, Custom Hook은 컴포넌트 트리에 새 컴포넌트를 추가하지 않고도 이것을 가능하게함.
- 각 컴포넌트의 state는 완전히 독립적.
- Hook은 state 그 자체가 아니라, 상태 관련 로직을 재사용하는 방법.
- 실제로 각각의 Hook 호출은 완전히 독립된 state를 가짐. 한 컴포넌트 안에서 같은 custom Hook을 두번이상 쓸 수 있음.
- `use`로 시작하고, 안에서 다른 Hook을 호출한다면 그 함수를 custom Hook이라고 부를 수 있음.

## 다른 내장 Hook

- useContext: 컴포넌트를 중첩하지 않고도 React context를 구독할 수있게 해줌
- useReducer: 복잡한 컴포넌트들의 state를 reducer로 관리할수 있음.
