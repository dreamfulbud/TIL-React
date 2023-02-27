# Hook의 규칙

## 1. 최상위에서만 Hook을 호출해야 함.

- 반복문, 조건문 혹은 중첩된 함수 내에서 Hook을 호출하지 말것.
- 대신 early return이 실행되기전에 항상 React 함수의 최상위에서 Hook을 호출해야함.
- 이 규칙을 따르면 컴포넌트가 렌더링 될 때마다 항상 동일한 순서로 Hook이 호출되는 것이 보장됨.
- 이러한 점은 React가 useState와 useEffect가 어려번 호출되는 중에도 hook의 상태를 올바르게 유지할 수 있도록 해줌.

## 2. 오직 React 함수 내에서 Hook을 호출해야 함.

- 일반적은 JS 함수에서 호출하지 말것.
- React 함수 컴포넌트에서 호출.
- Custom Hook에서 호출

- React가 Hook이 호출되는 순서에 의존
- 조건부로 effect를 실행하기 원한다면, 조건문을 Hook 내부에 넣기.
