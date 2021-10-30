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

