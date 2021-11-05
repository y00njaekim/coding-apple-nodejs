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

app.put('/edit/:id', (req, res) => {
  var reqParamsId = parseInt(req.params.id);
  db.collection('post').updateOne({_id: reqParamsId}, {$set: {name: req.body.title, date: req.body.date}}, (errUpdateOne, resUpdateOne) => {
    if (errUpdateOne) return console.log(errUpdateOne);
    res.redirect('/list');
  });
});

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// app.use(session({ secret : '세션 만들 때 쓸 비밀 번호' }))
app.use(session({secret: 'secret code', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

// 'local 방식으로 회원인지 인증해주세요' 라는 passport.authenticate() 사용 예시
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/fail',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

// LocalStrategy => 인증 전략
passport.use(
  new LocalStrategy(
    {
      usernameField: 'id', // <form> 태그의 name attribute 에 들어가는 string 입력
      passwordField: 'pw',
      session: true, // session 정보 저장 유무
      passReqToCallback: false, // 아이디 비밀번호 말고 다른 정보의 검사 필요 유무.
    },
    (filledId, filledPw, done) => {
      // done(서버에러, 성공시 사용자 DB 데이터, 에러메세지)
      console.log(filledId, filledPw);
      db.collection('login').findOne({id: filledId}, (err, res) => {
        if (err) return done(err);
        if (!res) return done(null, false, {message: '존재하지 않는 아이디입니다'});
        if (filledPw === res.pw) {
          return done(null, res);
        } else {
          return done(null, false, {message: '비밀번호가 틀렸습니다'});
        }
      });
    }
  )
);

// user.id 를 이용해서 세션 저장시키는 코드 (로그인 성공시 발동)
// user 에 들어오는 정보 =  passport.use 의 findOne({req, res}) 에서 res. 즉 찾은 유저 데이터
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 이 세션 데이터를 가진 사람을 DB 에서 찾아달라고 요청하는 코드 (마이페이지 접속시 발동)
passport.deserializeUser((id, done) => {
  done(null, {});
});
