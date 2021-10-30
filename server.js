const express = require('express');
const app = express();

// 8080 포트를 통해 '들어오는' 상황의 callback function
app.listen(8080, function () {
  console.log('listening on 8080');
});

/*
app.get('경로', function (요청, 응답) {
  응답.send('펫 용품 쇼핑할 수 있는 페이지입니다');
});
*/

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/pet', (req, res) => {
  res.send('펫 용품 쇼핑할 수 있는 페이지입니다');
});

app.get('/beauty', (req, res) => {
  res.send('뷰티 용품 쇼핑할 수 있는 페이지입니다');
});
