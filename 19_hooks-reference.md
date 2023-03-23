# Hooks API Reference

## 기본 Hook
### useState
```js
const [state, setState] = useState(initialState);
```
- 상태 유지 값과 그 값을 갱신하는 함수를 반환.
- 최초로 렌더링을 하는 동안, 반환된 state는 첫번째 전달된 인자(initialState)d
- setState 함수는 state를 갱신할 때 사용. 새 state 값을 받아 컴포넌트 리렌더링을 큐에 등록
```js
setState(newState);
```
- 다음 리렌더링 시에 useState를 통해 반환받은 첫번째 값은 항상 갱신된 최신 state가 됨.
- [!] React는 setState 함수 동일성이 안정적이고 리렌더링 시에도 변경되지 않을 것이라는 것을 보장. useEffect나 useCallback 의존성 목록에 이 함수를 포함하지 않아도 무방한 이유.

**함수적 갱신**
- 이전 state를 사용해서 새로운 state를 계산하는 경우 함수를 setState로 전달할 수 있음. 
- 그 함수는 이전 값을 받아 갱신된 값을 반환.
```js
function Counter({initialCount}){
  const [count, setCount] = useState(initialCount);
  return(
    <>
    Count:{count}
    <button onClick={()=> setCount(initialCount)}>Reset</button>
    <button onClick={()=> setCount(prevCount => prevCount - 1)}>-</button>
    <button onClick={()=> setCount(prevCount => prevCount + 1)}>+</button>
  )
}
```

**state 갱신의 취소**
- State Hook을 현재의 state와 동일한 값으로 갱신하는 경우 React는 자식을 렌더링 한다거나 무엇을 실행하는 것을 회피하고 그 처리를 종료
- React는 Object.is 비교 알고리즘을 사용
  - `Object.is()` 메서드는 두 값이 같은 값인지 결정합니다.
    ```js
    Object.is(value1, value2);
    ```
- 실행을 회피하기 전에 React에서 특정 컴포넌트를 다시 렌더링하는 것이 여전히 필요할 수도 있다는 것에 주의.
- React가 불필요하게 트리에 그 이상으로 더 깊게 관여하지 않을것이므로 크게 신경 쓰지 않아도 되지만, 렌더링 시에 고비용의 계산을 하고 있다면 useMemo를 사용하여 최적화 할 수 있음.


**state 업데이트 일괄 처리**
- React는 성능을 향상시키기 위해 여러 상태 업데이트를 단일 재렌더링으로 그룹화할 수 있음.
- 일반적인 경우 성능이 향상되고 애플리케이션 동작에 영향을 주지 않음.
- React 18부터 기본적으로 모든 업데이트에 일괄 처리가 활성화.
- React는 여러가지 사용자 시작 이벤트의 업데이트가 항상 개별적으로 처리되고 일괄적으로 처리되지 않도록 함. 

---
### useEffect
```js
useEffect(didUpdate);
```
- 명령형 또는 어떤 effect를 발생하는 함수를 인자로 받음.
- useEffect에 전달된 함수는 화면에 렌더링이 완료된 후에 수행되게 될것. 
- 기본적으로 동작은 모든 렌더링이 완료된 후에 수행되지만, 어떤 값이 변경되었을 때만 실행되게 할 수도 있음.

**effect 정리**
- effect는 종종 컴포넌트가 화면에서 제거될 때 정리해야 하는 리소스를 만듦.
- useEffect로 전달된 함수는 정리(clean-up) 함수를 반활할 수 있음.
```js
useEffect(()=>{
  const subscription = props.source.subscribe();
  return ()=>{
    subscription.unsubscribe();
  }
})
```
- 정리함수는 메모리 누수 방지를 위해 UI 컴포넌트를 제거하기 전에 수행.
- 컴포넌트가 여러번 렌더링 된다면 다음 effect가 수행되기 전에 이전 effect는 정리됨.
- 위의 예는 매 갱신마다 새로운 구독이 생성.

**effect 타이밍**
- useEffect로 전달된 함수는 지연 이벤트 동안에 레이아웃 배치와 그리기를 완료한 후 발생.
- 구독이나 이벤트 핸들러를 설정하는 것과 같은 다수의 공통적인 부작용에 적합. 왜냐면 대부분의 작업이 브라우저에서 화면을 업데이트하는 것을 차단해서는 안 되기 때문.
- 

**조건부 effect 발생**