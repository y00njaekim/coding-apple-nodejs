const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.urlencoded({extended: true}));

var db;
MongoClient.connect('mongodb+srv://keymy00njae:rladbswo12@cluster0.tjh3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.log(err);

  db = client.db('todoapp');
  // db.collection('post').insertOne({name: 'John', age: 20}, (err, rep) => {
  //   console.log('저장완료');
  // });

  // 8080 포트를 통해 '들어오는' 상황의 callback function
  app.listen(8080, function () {
    console.log('listening on 8080');
  });
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

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});

app.post('/add', (req, res) => {
  db.collection('post').insertOne({name: req.body.title, date: req.body.date}, (err, rep) => {
    if (err) return console.log(err);
    else {
      console.log('저장완료');
      res.send('전송완료');
    }
  });
});
