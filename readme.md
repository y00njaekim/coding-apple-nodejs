## Contents

[6. 두근두근 내 첫서버에서 GET 요청을 처리해보자](#두근두근-내-첫서버에서-get-요청을-처리해보자)

[7. 서버에서 HTML 파일전송해보기 & Nodemon으로 자동화](#서버에서-html-파일전송해보기-&-nodemon으로 자동화)

[8. Bootstrap을 이용한 빠른 UI 개발](#bootstrap을-이용한-빠른-ui-개발)

[9. 폼에 입력한 데이터를 서버에 전송하는 법 (POST요청)](#폼에-입력한-데이터를-서버에-전송하는-법-(post요청))

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

#### 폼에 입력한 데이터를 서버에 전송하는 법 (POST요청)

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

