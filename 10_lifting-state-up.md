# State 끌어올리기

- 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영 할 필요가 있음.
- 가장 가까운 공통 조상으로 state를 끌어올리는 것이 좋음.
- React 애플리케이션 안에서 변경이 일어나는 데이터에 대해서는 "진리의 원천(source of truth)"을 하나만!
- 보통은 state는 렌더링에 그 값을 필요로 하는 컴포넌트에 먼저 추가
- 그리고 나서 다른 컴포넌트도 역시 그 값이 필요하게 되면 그 값을 그들의 가장 가까운 조상으로 끌어올리면 됨.
- 다른 컴포넌트 간에 존재하는 state를 통기화 시키려고 노력하는 대신 하향식 데이터 흐름에 기대기
- state를 끌어올리는 작업은 양방향 바인딩 접근 방식보다 더 많은 "보일러 플레이트" 코드를 유발하지만 버그를 찾고 격리하기 더 쉽게 만듦.
  > 보일러 플레이트 : 변화없이 여러 군데에서 반복되는 코드
- 어떤 값이 props 또는 state로부터 계산될 수 있다면, 아마도 그 값을 state에 두어선 안됨.

```js
import React, { useState } from "react";

//부모 컴포넌트
export default function ParentComponent() {
  const [value, setValue] = useState("초기값");

  const handleChangeValue = () => {
    setValue("변경값");
  };

  return (
    <div>
      <p>{value}</p>
      <ChildComponent handleChangeValue={handleChangeValue} />
    </div>
  );
}

//자식 컴포넌트
function ChildComponent({ handleChangeValue }) {
  const handleClick = () => {
    handleChangeValue();
  };

  return <button onClick={handleClick}>변경</button>;
}
```
