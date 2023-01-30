# 엘리먼트 렌더링

- 엘리먼트는 React 앱의 가장 작은 단위
- 엘리먼트는 화면에 표시할 내용을 기술
- React 엘리먼트는 일반 객체
- 컴포넌트와는 다른 개념. 엘리먼트는 컴포넌트의 '구성요소'

## DOM에 엘리먼트 렌더링 하기

- 모든 엘리먼트를 React DOM에서 관리 : **루트(root) DOM 노드**
- React 애플리케이션 일반적으로 하나의 루트 DOM
  - 기존 앱 통합을 원하는 경우 독립된 루트 DOM 노드가 있을 수 있음.
- DOM에 엘리먼트 렌더링
  1. DOM 엘리먼트를 `ReactDOM.createRoot()`에 전달
  2. React 엘리먼트를 `root.render()`에 전달

```html
<div id="root"></div>
```

```js
const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <h1>Hello, world</h1>;
root.render(element);
```

## 렌더링 된 엘리먼트 업데이트 하기

- React 엘리먼트는 불변객체
- 엘리먼트 생성 후 해당 엘리먼트의 자식,속성 변경 불가
- 엘리먼트는 (영화의 한 장면) 하나의 프레임과 같이 특정 시점의 UI를 보여줌.
- UI를 업데이트 하는 유일한 방법은 새로운 엘리먼트를 생성하고 이를 `root.render()`로 전달하는 것.
- 대부분의 React 앱은 `root.render()`를 한번만 호출(유상태 컴포넌트)

## 변경된 부분만 업데이트 하기

- React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교, 필요한 경우에만 DOM 업데이트
