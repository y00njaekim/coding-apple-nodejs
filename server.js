const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const methodOverride = require('method-override');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/public', express.static('public'));

var db;
MongoClient.connect('mongodb+srv://keymy00njae:rladbswo12@cluster0.tjh3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
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
  res.render('index.ejs');
  // res.sendFile(__dirname + '/index.html');
});

app.get('/pet', (req, res) => {
  res.send('펫 용품 쇼핑할 수 있는 페이지입니다');
});

app.get('/beauty', (req, res) => {
  res.send('뷰티 용품 쇼핑할 수 있는 페이지입니다');
});

app.get('/write', (req, res) => {
  res.render('write.ejs');
  // res.sendFile(__dirname + '/write.html');
});

app.post('/add', (req, res) => {
  db.collection('counter').findOne({name: 'numOfPosts'}, (err, rep) => {
    if (err) return console.log(err);
    var count = rep.totalPost;

    db.collection('post').insertOne({_id: count + 1, name: req.body.title, date: req.body.date}, (err, rep) => {
      if (err) return console.log(err);
      console.log('저장완료');

      db.collection('counter').updateOne({name: 'numOfPosts'}, {$inc: {totalPost: 1}}, (err, rep) => {
        if (err) return console.log(err);
      });

      res.send('전송완료');
    });
  });
});

app.get('/list', (req, res) => {
  db.collection('post')
    .find()
    .toArray((err, rep) => {
      if (err) return console.log(err);
      // console.log(rep);
      res.render('list.ejs', {posts: rep});
    });
});

app.delete('/delete', (req, res) => {
  // console.log(req.body);
  req.body._id = parseInt(req.body._id);
  db.collection('post').deleteOne({_id: req.body._id}, (errDeleteOne, resDeleteOne) => {
    if (errDeleteOne) {
      res.status(400).send({message: '실패하였습니다'});
      return console.log(errDeleteOne);
    }
    console.log('삭제완료');
    res.status(200).send({message: '성공했습니다'});
  });
});

app.get('/detail/:id', (req, res) => {
  var reqParamsId = parseInt(req.params.id);
  db.collection('post').findOne({_id: reqParamsId}, (errFindOne, resFindOne) => {
    if (errFindOne) {
      res.status(400, {message: '실패했습니다'});
      return console.log(errFindOne);
    }
    res.render('detail.ejs', {data: resFindOne});
    res.status(200, {message: '성공했습니다'});
  });
});

app.get('/edit/:id', (req, res) => {
  var reqParamsId = parseInt(req.params.id);
  db.collection('post').findOne({_id: reqParamsId}, (errFindOne, resFindOne) => {
    if (errFindOne) return console.log(errFindOne);

    res.render('edit.ejs', {post: resFindOne, postId: reqParamsId});
  });
});

// app.post('/update/:id', (req, res) => {
//   var reqParamsId = parseInt(req.params.id);
//   db.collection('post').updateOne({_id: reqParamsId}, {$set: {name: req.body.title, date: req.body.date}}, (errUpdateOne, resUpdateOne) => {
//     if (errUpdateOne) return console.log(errUpdateOne);
//     res.send('전송완료');
//   });
// });
