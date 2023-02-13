# 리스트와 Key

## 여러개의 컴포넌트 렌더링하기

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<NumberList numbers={numbers} />);
```

## Key

- Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 도움.
- key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 함.
- key를 선택하는 가장 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것.
- 대부분의 경우 데이터의 `ID`를 key로 사용.
- 렌더링 한 항목에 대한 안정적인 ID가 없다면 최후의 수단으로 항목의 `인덱스`를 key로 사용.
- 항목의 순서가 바뀔 수 있는 경우 key에 인덱스를 사용하는 것은 권장하지 않음.
- 이로 인해 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생할 수 있음.

### key는 형제 사이에서만 고유한 값이어야한다.

- 배열 안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없음.
- 두개의 다른 배열을 만들 때 동일한 key를 사용할 수 있음.
- key는 힌트를 제공하지만 컴포넌트로 전달하지는 않음.
