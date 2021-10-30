## Part1

#### 두근두근 내 첫서버에서 GET 요청을 처리해보자

1 . server.js 시작 방법

```js
const express = require('express');
const app = express();
```

2 . 명시하는 포트넘버가 **들어오는 상황** 에서 필요한 것임을 기억

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
