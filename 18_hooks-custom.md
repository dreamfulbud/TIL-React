# 자신만의 Hook 만들기

- React에서 상태 관련 로직을 컴포넌트에 공유하는 두가지 전통적인 방법
  1. render props
  2. 고차원 컴포넌트

## 사용자 정의 Hook 추출하기
- 사용자 정의 Hook은 이름이 use로 시작하는 자바스크립트 함수.
- 사용자 Hook은 다른 Hook을 호출 할 수 있음.
- 컴포넌트에서처럼 다른 Hook들은 사용자 Hook 위로 놓여야 함.
- 사용자 정의 Hook은 조건부 함수가 아니여야 함.
- 무엇을 인수로 받아야하며 필요하다면 무엇을 반환해야 하는 지를 사용자가 결정.
- 보통의 함수와 마찬가지.

## 사용자 정의 Hook 이용하기
- 사용자 정의 Hook은 기본적으로 Hook의 디자인을 따르는 관습
- use로 시작해야함. 이를 따르지 않으면 특정한 함수가 그 안에서 Hook을 호출하는지를 알 수 없기 때문에 Hook의 규칙 위반 여부를 자동으로 체크 할 수 없음.
- 사용자 정의 Hook은 상태관련 로직을 재사용하는 매커니즘 이지만 사용자 Hook을 **사용할 때마다 그 안의 state와 effect는 완전히 독립적**
- 각각의 Hook에 대한 호출은 서로 독립된 state를 받음. 하나의 컴포넌트 안에서 useState와 useEffect를 여러 번 부를 수 있고 이들은 모두 완전히 독립적

## Tip: Hook에서 Hook으로 정보 전달하기
- Hook은 함수이기 때문에 Hook 사이에서도 정보를 전달할 수 있음.
- 너무 이른 단계에서 로직을 뽑아내려고 하지는 않을 것. 지금 바로 Hook으로 분리해야한다고 느낄 필요 없음.
- 사용자 정의 Hook이 복잡한 로직을 단순한 인터페이스 속에 숨길 수 있도록 하거나 복잡하게 뒤엉킨 컴포넌트를 풀어내도록 돕는 경우들을 찾아내는 것을 권장.
- 내부에 많은 state 관리
  - useState는 업데이트 로직을 모아주는 데는 도움이 되지 않음.
  - 대신 Redux reducer의 이용을 선호할 수 있음.
  - reducer는 독립적으로 테스트하기에 편리하며 복잡한 업데이트 로직의 표현이 늘어나는 경우에도 잘 맞음
### useReducer Hook
```js
function useReducer(reducer,initialState){
  const [state, setState] = useState(initialState);

  function dispatch(action){
    const nextState = reducer(state, action);
    setState(nextState);
  }
  return [state, dispatch];
}

function Todos(){
  const [todos, dispatch] = useReducer(todosReducer,[]);
  function handleAddClick(text){
    dispatch({type:'add', text})
  }
}
```
