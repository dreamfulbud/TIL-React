# Effect Hook 사용하기

- Effect Hook을 사용하면 함수 컴포넌트에서 side effect를 수행할 수 있음.
- side effect: 데이터 가져오기, 구독 설정하기, 수동으로 React 컴포넌트의 DOM을 수정하는 것 까지
  - class 생명주기 메서드 componentDidMount와 componentDidUpdate, componentWillUnmount가 합쳐진 것

## 정리(Clean-up)를 이용하지 않는 Effects

- React가 DOM을 업데이트한 뒤로 추가로 코드를 실행해야하는 경우가 있음.
- 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 정리(clean-up)가 필요 없는 경우.
- 실행 이후 신경 쓸 것이 없음.

### useEffect가 하는 일

- useEffect Hook을 이용하여 React에게 컴포넌트가 렌더링 이후 어떤 일을 수행해야하는 지를 말함.
- React는 우리가 넘긴 함수(effect)를 기억했다가 DOM 업데이트를 수행한 이후에 불러냄.

### useEffect를 컴포넌트 안에서 불러내는 이유

- 컴로넌트 내부에 둠으로써 effect를 통해 state 변수(또는 그 어떤 prop에도) 접근할 수 있음.
- 함수 범위 안에 존재하기 때문에 특별한 API 없이도 값을 얻을 수 있는 것.
- Hook은 자바스크립트의 클로저를 이용하여 React에 한정된 API를 고안하는 것보다 자바스크립트가 이미 가지고 있는 방법을 이용하여 문제를 해결.

### useEffect는 렌더링 이후에 매번 수행되는 건가?

- Yes, 기본적으로 ㄹ첫번째 렌더링과 이후의 모든 업데이트에서 수행.
- 마운팅과 업데이트라는 방식으로 생각하는 대신 **effect를 렌더링 이후에 발생하는 것**으로 생각하기
- React는 effect가 수행되는 시점에 이미 DOM이 업뎅이트 되었음을 보장.

- 리렌더링하는 때마다 모두 이전과 다른 effect로 교체하여 전달. 이점이 렌더링의 결과의 한 부분이 되게 만드는 점.
- 각각의 effect는 특정한 렌더링에 속함.
- useEffect에서 사용되는 effect는 브라우저가 화면을 업데이트하는 것을 차단하지 않음. 이를통해 애플리케이션의 방응성을 향상해줌.
- 대부분의 effect는 동기적으로 실행될 필요가 없음.
- 동기적 실행이 필요한 경우 useEffect와 동일한 API를 사용하는 useLayoutEffect라는 별도의 Hook 사용

## 정리(Clean-up)를 이용하는 Effects

- 외부 데이터에 구독(subscription)을 설정해야하는 경우
- 이런 경우에 메모리 누수가 발생하지 않도록 정리(clean-up)하는 것은 매우 중요.

### effect에서 함수를 반환하는 이유?

- effect를 위한 추가적인 정리 메커니즘.
- 모든 effect는 정리를 위한 함수를 반환할 수 있음.
- 이 점이 구독의 추가와 제거를 위한 로직을 가까이 묶어둘 수 있게 함.
- 구독의 추가와 제거가 모두 하나의 effect를 구성하는 것.

### React가 effect를 정리(clean-up)하는 시점은 정확히 언제?

- React는 컴포넌트가 마운트 해제되는 때에 정리(clean-up)를 실행.
- effect는 한번이 아니라 렌더링이 실행되는 때마다 실행. React가 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect 또한 정리하는 이유.

```js
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
});
```

## Effect를 이용하는 팁

### 관심사를 구분하려고 한다면 Multiple Effect를 사용

- Hook을 이용하면 생명주기 메서드에 따라서가 아니라 코드가 무엇을 하는지에 따라 나눌수 있음.
- React는 컴포넌트에 사용된 모든 effect를 지정된 순서에 맞춰 적용.

### effect가 업데이트 시마다 실행되는 이유

- useEffect가 기본적으로 업데이트를 다루기 때문에 더는 업데이트를 위한 특별한 코드가 필요 없음.
- 동작의 일관성을 유지해주며 클래스 컴포넌트에서 흔히 업데이트로 로직을 빼먹으면서 발생할 수 잇는 버그를 예방.

### Effect를 건너뛰어 성능 최적화하기

- 모든 렌더링 이후에 effect를 정리하거나 적용하는 것은 때때로 성능 저하를 발생시키는 경우도 있음.
- 특정 값들이 리렌더링 시에 변경되지 않는 다면 React로 하여금 effect를 건너뛰도록 할 수 있음.
- useEffect의 선택적 인수인 두번째 인수로 배열을 넘기면 됨.

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // count가 바뀔 때만 effect를 재실행합니다.
```

- 두번째 인자는 빌드 시 변환에 의해 자동으로 추가될 수 있음.
- 배열이 컴포넌트 범위 내에서 바뀌는 값들과 effect에 의해 사용되는 값들을 모두 포함함.
- 그렇지 않으면 현재 값이 아닌 이전의 렌더링 때의 값을 참고.
- effect를 실행하고 이를 정리하는 과정을 딱 한번씩만 실행하고 싶다면 빈배열`[]`을 두번째 인수로 넘기면 됨.
- 빈 배열을 넘기게 되면, effect 안의 prop과 state는 초깃값을 유지하게 됨.
- exhaustive-deps 규칙을 eslint-plugin-react-hooks 패키지에 포함하는 것을 추천. 이 패키지는 의존성이 바르지 않게 지정되었을 때 경고하고 수정하도록 알려줌
