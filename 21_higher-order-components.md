# 고차 컴포넌트

- HOC(Higher Order Component) : 컴포넌트 로직을 재사용하기 위한 React 고급 기술
- React의 일부가 아니며, React의 구성적 특성에서 나오는 패턴
- **고차 컴포넌트는 컴포넌트를 가져와 새 컴포넌트를 반환하는 함수**

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
- 컴포넌트 : props를 UI로 변환
- 고차 컴포넌트 : 컴포넌트를 새로운 컴포넌트로 변환
- 고차 컴포넌트(HOC)는 Redux의 connect와 Relay의 createFragmentContainer와 같은 서드 파티 React 라이브러리에서 흔하게 볼 수 있음.

## 횡단 관심사(Cross-Cutting Concerns)에 고차 컴포넌트 사용하기
- mixin을 더이상 권장하지 않음. 
  - 상속없이 다른 클래스에 행동을 더해주는 하나의 방법 
  - 서로 다른 컴포넌트에서 유사한 기능을 공유하고자 할때 사용.(횡단 관심사)

- 컴포넌트는 React에서 코드 재사용의 기본단위. 그러나 어떤 패턴은 기존 컴포넌트에 잘 적용되지 않을 수 있음.

### 외부로부터 데이터를 구독하여 댓글 목록을 렌더링하는 CommentList 컴포넌트
```js
class CommnetList extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state ={
      comments: DataSource.getComments();
    }
  }
  componentDidMount(){
    DataSource.addChangeListener(this.handleChange);
  }
  componentWillUnmount(){
    DataSource.removeChangeListner(this.handleChange);
  }
  handleChange(){
    this.setState({
      comments: DataSource.getComments();
    })
  }
  render(){
    return (
      <div>
        {this.state.commnets.map((comment)=>(
          <Comment comment={comment} key={comment.id}>
        ))}
      </div>
    )
  }
}
```

```js
class BlogPost extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state ={
      blogPost: DataSource.getBlogPost(props.id);
    }
  }
  componentDidMount(){
    DataSource.addChangeListener(this.handleChange);
  }
  componentWillUnmount(){
    DataSource.removeChangeListner(this.handleChange);
  }
  handleChange(){
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id);
    })
  }
  render(){
    return <TextBlock text={this.state.blogPost}>;
  }
}
```
```js
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = widthSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
)
```

```js
function withSubscription(WrappedComponent, selectData){
  return class extends React.Component{
    constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state ={
        data: selectData(DataSource, props);
      }
    }
    componentDidMount(){
      DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount(){
      DataSource.removeChangeListner(this.handleChange);
    }
    handleChange(){
      this.setState({
        data: selectData(DataSource, this.props);
      })
    }
    render(){
      return (
            <WrappedComponent data={this.state.data} {...this.props}>
      )
    }
  }
}
```

- 고차 컴포넌트는 입력된 컴포넌트를 수정하지 않으며 상속을 사용하여 동작을 복사하지도 않음.
- 오히려 고차 컴포넌트는 원본 컴포넌트를 컨테이너 컴포넌트로 포장하여 조합.
- 고차 컴포넌트는 사이드 이펙트가 전혀 없는 순수 함수
- 래핑된 컴포넌트는 새로운 props, data와 함께 컨테이너의 모든 props를 전달 받으며, 이 데이터들은 출력을 렌더랑하는데 사용.

- `withSubscription`은 일반 함수이기 때문에 원하는 개수의 인수를 추가할 수 있음.
  - 래핑된 컴포넌트로부터 고차 컴포넌트를 더 격리시키기 위해 data prop 이름을 설정할 수 있게 만들 수 있음.
  - `shouldComponentUpdate` 설정을 위한 인수를 받게 하거나 데이터 소스를 설정하는 인수를 받게할 수도 있음.
- 고차 컴포넌트가 컴포넌트의 정의 방법을 완전히 제어할 수 있기 때문에 이런 작업이 모두 가능.
- 컴포넌트와 마찬가지로 `withSubscription`과 래핑된 컴포넌트 간 계약(contract)은 완전히 props 기반.
- 이렇게하면 래핑된 컴포넌트에 동일한 props를 제공한다면 다른 고차 컴포넌트를 쉽게 변경할 수 있음.
---
## 원본 컴포넌트를 변경하지 마세요. 조합(Composition)하세요.
- 고차 컴포넌트 내부에서 컴포넌트의 프로토타입을 수정(또는 변경)하지 않도록 할것.
  1. 입력된 컴포넌트를 확장된(enhanced) 컴포넌트와 별도로 재사용 할 수 없다는 것.
  2. `componentDidUpdate`를 변형하는 `EnhancedComponent`에 또다른 HOC를 적용하면 첫번째 HOC의 기능은 무시.
    - 이 HOC는 생명주기 메서드가 없는 함수 컴포넌트에서도 작동하지 않음.
    - 변경된 HOC는 누출된 추상화. 
- HOC는 변경 대신에 입력 컴포넌트를 컨테이너 구성요소로 감싸서 조합을 사용해야 함.
```js
function logProps(WrappedComponent){
  return class extends React.Component{
    componentDidUpdate(prevProps){
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render(){
      return <WrappedComponent {...this.props} />;
    }
  }
}
```
- 위 방법은 클래스, 함수 컴포넌트에서도 동일하게 작동. 
- 순수한 함수이기 때문에 다른 고차 컴포넌트와 같이 조합하거나 심지어 자체적으로 조합할 수 있음.
- 고차 컴포넌트와 컨테이너 컴포넌트라 불리는 패턴이 유사.
  - 컨테이너 컴포넌트는 high-level과 low-level 관심하를 불리하는 전략 중 하나.
  - 컨테이너는 구독 및 state 같은 것을 관리하고 UI 렌더링 같은 것을 처리하는 컴포넌트에 props를 전달.
  - 고차 컴포넌트는 컨테이너를 그 구현체 중 일부에서 사용. 
  - 고차 컴포넌트는 매개변수화된 컨테이너 컴포넌트 정의로 생각할 수 있음.

---
### 컨벤션: 래핑된 컴포넌트를 통해 관련없는 Props 전달하기
- 고차 컴포넌트는 컴포넌트에 기능을 추가함.
- 고차 컴포넌트는 정의(contract)를 과감하게 변경해서는 안됨.
- 고차 컴포넌트에서 반환된 컴포넌트는 래핑된 컴포넌트와 비슷한 인터페이스가 있어야함.
- 고차 컴포넌트는 특정 관심사와 관련이 없는 props를 활용해야함. 
- 대부분의 고차 컴포넌트에는 다음과 같은 렌더링 메서드가 포함되어 있음.
```js
render(){
  const {extraProp, ...passThroughProps} = this.props;
  const injectedProp = someStateOrInstanceMethod;
  return(
    <WrappedComponent injectedProp={injectedProp} {...passThroughProps}>
  )
}
```

### 컨벤션: 조합 가능성(Composability) 끌어올리기
- 단일 인수로 래핑된 컴포넌트만 받을 때
```js
const NavbarWithRouter = withRouter(Navbar);
```
- 고차 컴포넌트는 추가 인수를 허용. config 객체는 컴포넌트의 데이터 의존성을 지정하기 위해 사용.
```js
const CommentWithRelay = relay.createContainer(Comment,config);
```
- 가장 일반적인 사용 (ex. react Redux 'connect')
```js
const ConnectedComment = connect(commentSelector, commentActions)
```
```js
const enhance = connect(commentListSelector, commentListActions);
const ConnectedComment = enhance(CommentList);
```
- connect는 고차 컴포넌트를 반환하는 고차 함수.

### 컨벤션: 간단한 디버깅을 위한 디스플레이 네임 작성 방법
- HOC로 만든 컨테이너 구성 요소도 React Developer Tools에 표시됨.
- 디버깅을 쉽게 하려면 HOC의 결과임을 알리는 디스플레이 네임을 작성.
- 가장 일반적인 방법은 HOC의 이름으로 내부 컴포넌트명을 감싸는 것. 
- HOC `withSubscription` HOC 내부 컴포넌트 `CommentList` 인 경우, 디스플레이 네임은 `WithSubscription(CommentList)`

---
## 주의사항
### render 메서드 안에서 고차 컴포넌트 사용 금지.
- 재조정(reconciliation)으로 알려진 React의 비교 알고리즘은 컴포넌트의 개별성(identity)을 가지고 기존 서브트리를 업데이트 해야 하는지 아니면 버리고 새로운 노드를 마운트 해야 할지 결정.
- render에서 반환된 컴포넌트가 이전에 렌더링 된 컴포넌트와 동일하다면 React가 새로운 서브트리와 비교하여 재귀적으로 서브트리를 업데이트. 
- 동일하지 않다면 이전 서브트리는 완전히 마운트 해제
- 성능상의 문제 뿐만 아니라 컴포넌트가 다시 마운트 되면서 컴포넌트의 state와 컴포넌트의 하위 항목들이 손실.
- 대신에 컴포넌트 정의 바깥에 HOC를 적용하여 컴포넌트가 한 번만 생성되도록 할것. 그러면 해당 component는 여러번 렌더링이 되더라도 일관성을 유지.
- 드문 경우로 HOC를 동적으로 적용해야할 경우에는 컴포넌트의 생명주기 메서드 또는 생성자 내에 작성 할 수 있음.

### 정적 메서드는 반드시 따로 복사
- 컴포넌트에 HOC를 적용하면, 기존 컴포넌트는 컨테이너의 컴포넌트로 감싸짐. 
- 즉, 새 컴포넌트는 기존 컴포넌트의 정적 메서들르 가지고 있지 않음.
- 이 문제를 해결하려면 메서드를 반환하기 전에 컨테이너에 복사
- 그러나 복사해야 할 메서드를 정확히 알아야 할 필요가 있음  `hoist-non-react-statics`를 사용하여 모든 non-React 정적 메서드를 자동으로 복사할 수 있음
- 또다른 해결 방법은 정적 메서드를 컴포넌트와 별도로 내보내는 것.

### ref는 전달되지 않는다.
- 고차 컴포넌트는 모든 props를 래핑된 컴포넌트에 전달하는 것이 원칙이지만, refs에서는 작동하지 않음.
- React에서 ref가 실제 prop이 아닌 key처럼 특별하게 취급되기 때문.
- 컴포넌트가 HOC의 결과인 엘리먼트에 ref를 추가하는 경우, ref는 래핑된 컴포넌트가 아닌 가장 바깥쪽 컨테이너 컴포넌트의 인스턴스를 나타냄.
- 이문제의 해결방법은 React.forwardRef API를 사용하는 것.


