# 조건부 렌더링

- React에서는 원하는 동작을 캡슐화하는 컴포넌트를 만들 수 있음.
  이렇게 하면 애플리케이션의 상태에 따라서 컴포넌트 중 몇개만을 렌더링할 수 있음.

## 엘리먼트 변수

- 엘리먼트를 저장하기 위해 변수를 사용할 수 있음
- 출력의 다른 부분은 변하지 않은 채로 컴포넌트의 일부를 조건부로 렌더링 할 수 있음.

## 논리 && 연산자

```js
render() {
  const username = '홍길동';
  return (
    <div>
      {username && <h1>반갑습니다. {username}님</h1>}
    </div>
  );
}

```

## 조건부 연산자

- `condition ? true : false`

## 컴포넌트가 렌더링 하는 것을 막기

- render 메서드로부터 null을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않음.
- 그 예로 `componentDidUpdate`는 계속해서 호출되게 됨.

```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  // 생략...
}
```
