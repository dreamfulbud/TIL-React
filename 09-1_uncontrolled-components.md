# 비제어 컴포넌트

- 대부분의 경우에 폼을 구현하는데 제어 컴포넌트를 사용하는 것이 좋음.
- 제어 컴포넌트에서 폼 데이터는 React 컴포넌트에서 다루어짐
- 비제어 컴포넌트는 폼 데이터는 DOM 자체에서 다루어짐
- 모든 state 업데이트에 대한 이벤트 핸들러를 작성하는 대신 비제어 컴포넌트를 만들러면 `ref`를 사용하여 DOM에서 폼 값을 가져올수 있음
- 비제어 컴포넌트는 DOM에 신뢰 가능한 출처를 유지하므로 비제어 컴포넌트를 사용할 때 React와 non-React 코드를 통합하는 것이 쉬울 수 있음.
- 빠르고 간편하게 적은 코드를 작성할 수 있지만, 그 외에는 일반적으로 제어된 컴포넌트를 사용!

## 파일 입력 태그

- React에서 `<input type="file" />`은 프로그래밍적으로 값을 설정 할 수 없고 사용자만이 값을 설정할 수 있기때문에 항상 비제어 컴포넌트!

```js
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FileInput />);
```
