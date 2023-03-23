# Hook 자주 묻는 질문

<!-- 나중에 읽어볼것 -->

# 적용 전략
## Hook이 render props 및 고차 컴포넌트를 대체합니까?
## Redux connect()와 React Router와 같은 인기 있는 API에 대해 Hook은 무엇을 의미합니까?
## Hook을 사용하는 컴포넌트 테스트하는 방법?
---
# Class에서 Hook으로
## 생명주기 메서드가 Hook에 어떻게 대응합니까?

- `constructor`
  - 함수 컴포넌트는 constructor가 필요하지 않습니다. useState 호출에서 state를 초기화 할 수 있습니다. 초기 state를 계산하는 것이 비싸면 useState에 함수 컴포넌트를 전달할 수 있습니다.
- `getDerivedStateFromProps`
  - 대신 렌더링하는 동안 업데이트 예약.
- `shouldComponentUpdate` 
  - React.memo를 참조해주세요.
- `render`
  - 함수 컴포넌트 본체 자체입니다.
- `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`
  - useEffect Hook은 이들의 모든 조합을 표현할 수 있습니다. (흔하거나 그렇지 않은 경우 포함).
- `getSnapshotBeforeUpdate`, `componentDidCatch`, `getDerivedStateFromError`
`- 이러한 메서드에 대한 Hook은 없지만, 곧 추가될 예정입니다.

## 인스턴스 변수와 같은 것이 있습니까?

## 하나 또는 여러 state 변수를 사용해야 합니까?
## 업데이트에만 effect를 실행할 수 있습니까?
## 이전 props 또는 state를 얻는 방법?
## 함수 컴포넌트 안에 오래된 props나 state가 보이는 이유는 무엇입니까
## getDerivedStateFromProps를 어떻게 구현합니까?
## forceUpdate와 같은 것이 있습니까?
## 함수 컴포넌트에 ref를 만들 수 있습니까?
- 자주 필요하지는 않지만 `useImperativeHandle` Hook을 사용하여 일부 명령형 메서드를 부모 컴포넌트에 노출 할 수 있음

## DOM 노드를 측정하려면 어떻게 해야 합니까?

---
# 성능 최적화
## 종속성 목록에서 함수 컴포넌트를 생략하는 것이 안전합니까?
- 일반적으로 아님!
```js
function Example({someProp}){
  function doSomething(){
    console.log(someProp);
  }

  useEffect(()=>{
    doSomething();
  }, []) // 안전하지 않음
}
```
- Effect 외부의 함수 컴포넌트에서 어떤 props 또는 state를 사용하는지 기억하기  어려움. 
- 일반적으로 그 내부의 effect에 필요한 함수 컴포넌트를 선언하려는 이유. 그러면 effect가 미치는 컴포넌트 범위의 값을 쉽게 확인 할 수 있음.
```js
function Example({someProp}){
  useEffect(()=>{
    function doSomething(){
      console.log(someProp);
    }

    doSomething();

  }, [someProp]) // 안전
}
```
- 컴포넌트 범위의 값을 사용하지 않으면 []를 지정하는 것이 안전.
```js
useEffect(()=>{
  function doSomething(){
    console.log('hello');
  }
}, []) // 이 예에서는 컴포넌트 범위의 어떤 값도 사용하지 않기 때문에 안전.
```

- useEffect, useLayoutEffect, useMemo, useCallback, useImperativeHandle 의 마지막 인수로 종속성 목록을 지정하는 경우 콜백 내에서 사용되는 모든 값을 포함하고 React 데이터 흐름에 참여해야 함.
- 여기에는 props, state 및 그로부터 파생된 모든 것이 포함.
<!-- 추가로 정리 필요 -->

## effect 종속성이 너무 자주 변경되면 어떻게 해야 합니까?
## shouldComponentUpdate는 어떻게 구현합니까?
## 계산을 메모이제이션 하는 법?
## 고비용의 객체를 지연해서 생성하는 법?
## 렌더링에서 함수 컴포넌트를 만들기 때문에 Hook이 느려집니까?
## 콜백 전달을 피하는 법?
## useCallback에서 자주 변경되는 값을 읽는 방법?
---
# Hook의 이면
## React는 Hook 호출을 컴포넌트와 어떻게 연관시키는가?
- React는 현재 렌더링 컴포넌트를 추적.
- Hook은 React 컴포넌트에서만 호출.
## Hook에 대한 선행 기술은 무엇입니까?