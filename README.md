#### 기본프로젝트 구성

create-react-app

#### 실행방법

1.
```bash
npm install
```
2.
```bash
npm start
```

```
#### 프로젝트 구조

```bash
├── node_modules
├── src
│   ├── Components
│   │	├── Search
│   │	│    ├── __generated__
│   │	│    ├── SearchContainer.css
│   │	│    ├── SearchContainer.js
│   │	│    ├── SearchList.css
│   │	│    └── SearchList.js
│   ├── Root
│   │	├── __generated__
│   │	├── App.css
│   │	└── App.js
│   ├── utils
│   │	├── fetchGraphQL.js
│   │	└── RelayEnvironment.js
│   ├── index.css
│   └── index.js
├── public
├── schema.graphql
├── package-lock.json
└── package.json

``` 
#### 추가 설명
1. UI 라이브러리 : AntDesign 사용

#### 기능 구현 X
cursor based pagination 구현하지 못함

#### 느낀점
graphql 와 relay 를 이번 과제를 통해 처음 적용해보면서 진행을 하였는데 레퍼런스를 참고 하면서 진행하려 했으나 많은 자료가 없었다. 그래서 가이드 문서를 번역하면서 진행했는데, 역시나 부족했던 것일까 pagination 구현을 제대로 하지 못하여 아쉬웠다.