# JSX

- JavaScript를 확장한 문법
- JavaScript의 모든 기능이 포함
- JSX는 React “엘리먼트(element)” 를 생성

## JSX란,

- React는 별도의 파일에 마크업과 로직을 넣어 기술을 인위적으로 분리하는 대신, 둘 다 포함하는 “컴포넌트”라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리

### JSX 속성 정의

- JSX는 HTML보다는 JavaScript에 가깝기 때문에, React DOM은 HTML 어트리뷰트 이름 대신 camelCase 프로퍼티 명명 규칙을 사용.

  - ex)className가, tabIndex

### JSX도 표현식

### JSX는 주입 공격을 방지

- React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 이스케이프함.

  > 이스케이프(escape): 특정 문자를 원래의 기능에서 벗어나게 변환하는 행위

- 애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않음.
- 모든 항목은 렌더링 되기 전에 문자열로 변환.
- 이런 특성으로 XSS(cross-site-scripting) 공격을 방지
  > XSS(cross-site-scripting): 이용자들이 보는 글에 스크립트를 주입하여 사용자의 정보(쿠키, 세션 등)를 가져가거나 비정상적인 기능을 수행하게 함

### JSX는 객체를 표현

- Babel은 JSX를 `React.createElement()` 호출로 컴파일
