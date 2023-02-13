# 폼

- HTML 폼 엘리먼트는 폼 엘리먼트 자체가 내부 상태를 가지기 때문에, React의 다른 DOM 엘리먼트와 다르게 동작
- JavaScript 함수로 폼의 제출을 처리하고 사용자가 폼에 입력한 데이터에 접근하도록 하는 것이 편리. 이를 위한 표준 방식 “제어 컴포넌트 (controlled components)“ 기술을 이용.

## 제어 컴포넌트 (controlled components)

- HTML에서 `<input>`, `<textarea>`, `<select>`와 같은 폼 엘리먼트는 일반적으로 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트
- React에서는 변경할 수 있는 state가 일반적으로 컴포넌트의 state 속성에 유지되며 setState()에 의해 업데이트
- React state를 "신뢰 가능한 단일 출처(single source of truth)"로 만들어 두 요소를 결합.
- 그러면 폼을 렌더링 하는 React 컴포넌트는 폼이 발생하는 사용자 입력값을 제어.
- 이러한 방식으로 React에 의해 값이 제어되는 입력 폼 엘리먼트를 "제어 컴포넌트"라고 함

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    alert(`A name was submitted: ${this.state.value}`);
    e.preventDefault();
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <label>Name:
        <input type="text" value={this.state.value} onChange={this.handlChange}>
      </label>
      <input type="submit" value="Submit">
    </form>;
  }
}
```

- value 어트리뷰트는 폼 엘리먼트에 설정되므로 표시되는 값은 항상 this.state.value가 되고 React state는 신뢰 가능한 단일 출처가 됨.
- React state를 업데이트하기 위해 모든 키 입력에서 handleChange가 동작하기 때문에 사용자가 입력할 때 보여지는 값이 업데이트됨.
- 제어 컴포넌트로 사용하면, input의 값은 항상 React state에 의해 결정.
- 코드를 조금 더 작성해야하지만, 다른 UI 엘리먼트에 input 값을 전달하거나 다른 이벤트 핸들러에서 값을 재설정할 수 있음.

## textarea 태그

- HTML에서 `<textarea>` 엘리먼트는 덱스트를 자식으로 정의
- React에서 `<textarea>`는 value 어트리뷰트를 대신 사용.
- 이렇게하면 `<textarea>`를 사용하는 폼은 한줄 입력을 사용하는 폼과 비슷하게 작성 할 수 있음.

```js
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Please write an essay about your favorite DOM element.' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    alert(`An essay was submitted: ${this.state.value}`);
    e.preventDefault();
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <label>Essay:
        <textarea value={this.state.value} onChange={this.handlChange}>
      </label>
      <input type="submit" value="Submit">
    </form>;
  }
}
```

## select 태그

- HTML에서 `<select>`는 드롭 다운 목록을 만듦.
- seleted 옵션이 있으므로 초기값 주의
- React에서 selected 어트리뷰트를 사용하는 대신 최상단 select 태그에 value 어트리뷰트를 사용.

```js
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'coconut' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    alert(`Your favorite flavor is: ${this.state.value}`);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit">
      </form>
    );
  }
}
```

- select 태그에 multiple 옵션을 허용한다면 value 어티리뷰트에 배열을 전달 할 수 있음.

```js
<select multiple={true} value={['B', 'C']}>
```

## `<input type="file">`

- HTML에서는 사용자가 하나 이상의 파일을 자신의 장치 저장소에서 서버로 업로드하거나 File API를 통해 JS로 조작할 수 있음
- 값이 읽기 전용이기 때문에 React에서는 비제어 컴포넌트

## 다중 임력 제어하기

- 여러 input 엘리먼트를 제어해야할 때, 각 엘리먼트에 name 어트리뷰트를 추가하고 event.target.name 값을 통해 핸들러가 어떤 작업을 할지 선택할 수 있게 해줌

```js
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      /* 
      주어진 input 태그의 name에 일치하는 state를 업데이트하기 위해 
      ES6 computed property name 구문 사용 
      */
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
```

## 제어되는 input null 값

- 제어 컴포넌트에 value prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없음.
- value를 설정했는데 여전히 수정할 수 있다면 실수로 value를 undefined나 null로 설정했을 수 있음

```js
// 첫 번째 입력은 잠겨있지만 잠시 후 입력이 가능해짐
ReactDOM.createRoot(mountNode).render(<input value="hi" />);

setTimeout(function () {
  ReactDOM.createRoot(mountNode).render(<input value={null} />);
}, 1000);
```

## 제어 컴포넌트의 대안

- 데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고 React 컴포넌트를 통해 모든 입력 상태를 연결해야 하기 때문에 때로는 제어컴포넌트를 사용하는 게 지루할 수 있음.
- 특히 기존의 코드베이스를 React로 변경하고자 할 때나 React가 아닌 라이브러리와 React 애플리케이션을 통합하고자 할 때 짜증날 수 있음.
- 이러한 경우에 입력 폼을 구현하기 위한 대체 기술인 [비제어 컴포넌트](https://ko.reactjs.org/docs/uncontrolled-components.html) 확인

## 완전한 해결책

- 유효성 검사, 방문한 필드 추적 및 폼 제출 처리와 같은 완벽한 해결을 원한다면 [Formik](https://formik.org/)이 대중적인 선택 중 하나
- Formik은 제어 컴포넌트 및 state 관리에 기초하기 때문에 배우는게 쉽지 않음.
