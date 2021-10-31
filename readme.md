## Contents

[6. 두근두근 내 첫서버에서 GET 요청을 처리해보자](#두근두근-내-첫서버에서-get-요청을-처리해보자)

[7. 서버에서 HTML 파일전송해보기 & Nodemon으로 자동화](#서버에서-html-파일전송해보기-&-nodemon으로-자동화)

[8. Bootstrap을 이용한 빠른 UI 개발](#bootstrap을-이용한-빠른-ui-개발)

[9. 폼에 입력한 데이터를 서버에 전송하는 법 (POST요청)](#폼에-입력한-데이터를-서버에-전송하는-법)

[10. (쉬어가기) REST API가 뭔지 세계 최고로 쉽게 설명해드림](#rest-api가-뭔지-세계-최고로-쉽게-설명해드림)

## Part1

#### 두근두근 내 첫서버에서 GET 요청을 처리해보자

1 . server.js 시작 방법

```js
const express = require('express');
const app = express();
```

2 . 명시하는 포트넘버가 해당 서버에 **들어오는 상황** 에서 필요한 것임을 기억

```js
// 8080 포트를 통해 '들어오는' 상황의 callback function
app.listen(8080, function () {
  console.log('listening on 8080');
});
```

3 . 기본적인 get method 사용 방법

```js
app.get('/pet', (req, res) => {
  res.send('펫 용품 쇼핑할 수 있는 페이지입니다');
});
```

#### 서버에서 HTML 파일전송해보기 & Nodemon으로 자동화

1 . client: 주소창에 URL 을 입력한다는 것은 서버에 GET 요청을 한다는 것

2 . `sendFile()` 사용법

```js
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
```

> __dirname은 현재 파일의 경로를 뜻한다.

<br/>

❓React `routes` 에서 특정 링크 이동시 특정 컴포넌트 리턴 수행 🆚 nodejs 에서 특정 링크 이동시 특정 파일 `send` 해주는 것의 차이

#### Bootstrap을 이용한 빠른 UI 개발

[Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/) 페이지 이동 후 `Starter template` 참조

#### 폼에 입력한 데이터를 서버에 전송하는 법

1 . server.js

```js
app.post('/add', (req, res) => {
  res.send('전송완료');
});
```

`req` 에 `<form action="/add">` 로 부터 전달받은 정보 포함.

쉽게 확인하기 위해서는 `npm install body-parser` 명령어를 이용해야 한다.

🎯 업데이트사항.

2021년 이후로 설치한 프로젝트들은 body-parser 라이브러리가 express에 기본 포함이라 따로 npm으로 설치할 필요가 없다. 

```
app.use(express.urlencoded({extended: true})) 
```

▲ 이 코드만 위쪽에 추가하면 된다. 

2 . write.html

```js
<div class="container mt-3">
  <form action="/add" method="post">
    <div class="form-group">
      <label>오늘의 할일</label>
      <input type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label>날짜</label>
      <input type="text" class="form-control" />
    </div>
    <button type="submit" class="btn btn-outline-secondary">Submit</button>
  </form>
</div>
```

`<form>` 태그 프로퍼티 설명

- `action` :The URI of a program that processes the form information.
- `method` : The HTTP method that the browser uses to submit the form. Possible values are:

❓URI 가 정확히 무엇이며 어떤 기능을 하는 걸까?

🙋‍♂️ URI

#### REST API가 뭔지 세계 최고로 쉽게 설명해드림

1 . API 란?

서로 다른 프로그램간에 소통할 수 있게 도와주는 통신 규약 => 서버와 클라이언트간에 소통할 수 있게 도와주는 통신 규약 => 클라이언트가 서버에게 요처해서 데이터 가져오는 방법

> 여러분 지금까지 짠 코드가 
>
> "누군가 /write로 접속하면 write.html을 보내주세요" 
>
> 같은 거였는데 바로 이게 서버의 API입니다. 여러분 서버랑 통신할 수 있는 방법이니까요. 
>
> write.html을 보고싶으면 /write로 접속하라는 API를 정의하고 계셨던 것입니다. 

2 . REST API 란? REST 규칙을 모두 충족한 API

웹 API 를 짤 때 지켜야 할 REST 원칙 6 가지

🎯 **Uniform Interface**

- 하나의 URL 로 하나의 데이터만 가져오기. 하나의 데이터를 가져오기 위해 두개의 URL 을 만들지 말자
- 간결하고 예측 가능하게 작성하기 (URL 하나를 알면 둘을 알도록)
  - ex. https://www.instagram.com/explore/tags/kpop
- URL 이름 지을때 관습 잘 따르기

🎯 **Client-Server 역할 구분하기**

고객들은 하나의 URL 을 알고난 후 이를 통해 서버에 있는 해당 자료를 가져올 수 있다. 고객에게 서버역할을 맡기거나 고객에게 DB에 있는 자료를 직접 꺼내라고 하는 식의 코드를 짜면 안된다.

🎯 **Stateless**

요청들은 모두 각각 독립적으로 처리되어야 한다. 요청 1이 성공해야 요청 2를 보내주는 식의 요청 간 의존성이 존재하는 코드를 짜면 안된다. 다르게 말하면, 요청 하나 만으로 자료를 가져오기 충분하도록 요청에 필요한 모든 정보를 실어 보내야 한다.

🎯 **Cacheable**

요청을 통해 보내는 자료들은 캐싱이 가능해야 한다. 또한 캐싱 가능하다고 표시하거나 캐싱 기간을 설정해주어야 한다.

> 캐싱이란, 네이버를 방문하면 크롬 브라우저는 자동으로 자주 사용하는 이미지 파일, CSS 파일 등을 하드에 저장해 놓는다. 별로 바뀔 일이 없는 네이버 로고나 아이콘 같은 것을 말이다. 하드에 저장해놓고 네이버 방문할 때 네이버 서버에 네이버 로고를 달라는 요청을 따로 하지 않고 하드에서 불러온다. 이 행위를 캐싱이라 한다.

🎯 **Layered System**

요청을 처리하는 곳과 DB에 저장하는 곳 , 이런 여러가지 단계를 거쳐서 요청을 처리하도록 해도 된다. 즉 여러개의 레이어를 거쳐서 요청을 처리하게 만들어도 된다.

🎯 **Code on Demand**

서버는 고객에게 실제 실행 가능한 코드를 전송해주어야 한다.

3 . URL 이름짓기 관습

예시 :

**instagram.com/explore/tags/kpop
instagram.com/explore/tags/food**
**facebook.com/natgeo/photos
facebook.com/bbc/photos**

관습 :

- 단어들을 동사보다는 명사 위주로 구성
- 응용해서 다른 정보들을 쉽게 가져올 수 있도록 일관성 유지
- 대충 봐도 어떤 정보가 들어올지 예측 가능하게
- 띄어쓰기는 대시`-` 사용
- 파일 확장자 쓰지 말기
- 하위 문서들을 뜻할 땐 / 기호를 사용
