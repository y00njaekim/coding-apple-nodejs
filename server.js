const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const {v4: uuidv4} = require('uuid');
const path = require('path');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/public', express.static('public'));

var db;
MongoClient.connect(process.env.DB_URL, (err, client) => {
  db = client.db('todoapp');
  // db.collection('post').insertOne({name: 'John', age: 20}, (err, rep) => {
  //   console.log('저장완료');
  // });

  // 8080 포트를 통해 '들어오는' 상황의 callback function
  app.listen(process.env.PORT, function () {
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

app.get('/write', (req, res) => {
  res.render('write.ejs');
  // res.sendFile(__dirname + '/write.html');
});

app.get('/detail/:id', (req, res) => {
  var reqParamsId = parseInt(req.params.id);
  db.collection('post').findOne({_id: reqParamsId}, (errFindOne, resFindOne) => {
    if (errFindOne) {
      res.status(400).send({message: '실패했습니다'});
      return console.log(errFindOne);
    }
    res.render('detail.ejs', {data: resFindOne});
    res.status(200).send({message: '성공했습니다'});
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

app.post('/add', (req, res) => {
  db.collection('counter').findOne({name: 'numOfPosts'}, (err, rep) => {
    if (err) return console.log(err);
    var count = rep.totalPost;
    var insertObj = {_id: count + 1, writer: req.user._id, name: req.body.title, date: req.body.date};

    db.collection('post').insertOne(insertObj, (err, rep) => {
      if (err) return console.log(err);
      console.log('저장완료');

      db.collection('counter').updateOne({name: 'numOfPosts'}, {$inc: {totalPost: 1}}, (err, rep) => {
        if (err) return console.log(err);
      });

      res.redirect('/list');
    });
  });
});

app.delete('/delete', (req, res) => {
  // console.log(req.body);
  req.body._id = parseInt(req.body._id);
  var deleteObj = {_id: req.body._id, writer: req.user._id};
  // var deleteObj = {_id: req.body._id};
  db.collection('post').deleteOne(deleteObj, (errDeleteOne, resDeleteOne) => {
    if (errDeleteOne) {
      res.status(400).send({message: 'server.js - error in deleting'});
      return console.log(errDeleteOne);
    }
    if (resDeleteOne.deletedCount == 0) {
      res.status(400).send({message: 'server.js - not have permission to delete'});
      return console.log('server.js - console.log - not have permission to delete');
    }
    console.log('server.js - console.log - success for deleting');
    // console.log(resDeleteOne);
    res.status(200).send({message: 'server.js - success for deleting'});
  });
});

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

// 커스텀 미들웨어 isLoginned
const isLoginned = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send('로그인 안하셨는 데요?');
  }
};

app.get('/mypage', isLoginned, (req, res) => {
  console.log(req.user);
  res.render('mypage.ejs', {user: req.user});
});

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
      console.log('passport.use local 어쩌구');
      console.log(filledId, filledPw);
      db.collection('login').findOne({id: filledId}, (err, res) => {
        if (err) return done(err);
        if (!res) return done(null, false, {message: '존재하지 않는 아이디입니다'});
        bcrypt.compare(filledPw, res.pw, function (err, result) {
          if (result) {
            return done(null, res);
          } else {
            return done(null, false, {message: '비밀번호가 틀렸습니다'});
          }
        });
      });
    }
  )
);

// `user` 에 들어오는 정보 =  passport.use 의 findOne({req, res}) 에서 res. 즉 찾은 유저 데이터
// 그렇게 찾은 `user` 를 참조 후 `user.id` 를 이용해서 세션 저장시키는 코드 (로그인 성공시 발동)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 로그인한 유저의 세션아이디를 바탕으로 개인정보를 DB에서 찾는 역할 (마이페이지 접속시 발동)
passport.deserializeUser((id, done) => {
  db.collection('login').findOne({id: id}, (errFindOne, resFindOne) => {
    done(null, resFindOne);
  });
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', (req, res) => {
  db.collection('login').findOne({id: req.body.id}, (errFindOne, resFindOne) => {
    if (errFindOne) return console.log(errFindOne);
    if (resFindOne) res.send('이미 존재하는 아이디 입니다');
    bcrypt.hash(req.body.pw, saltRounds, (errHash, hash) => {
      // Store hash in your password DB.
      if (errHash) return console.log(errHash);
      db.collection('login').insertOne({id: req.body.id, pw: hash}, (errInsertOne, resInsertOne) => {
        if (errInsertOne) return console.log(errInsertOne);
        res.redirect('/');
      });
    });
  });
});

app.get('/list', (req, res) => {
  if (!req.user) {
    db.collection('post')
      .find()
      .toArray((err, rep) => {
        if (err) return console.log(err);
        // console.log(rep);
        res.render('list.ejs', {posts: rep, loginUser: null});
      });
  } else {
    db.collection('post')
      .find()
      .toArray((err, rep) => {
        if (err) return console.log(err);
        // console.log(rep);
        res.render('list.ejs', {posts: rep, loginUser: req.user});
      });
  }
});

app.get('/search', (req, res) => {
  // console.log(req.query.value);
  var searchOption = [
    {
      $search: {
        index: 'titleSearch',
        text: {
          query: req.query.value,
          path: 'name',
        },
      },
    },
    {$sort: {_id: 1}},
    {$limit: 10},
    {$project: {name: 1, _id: 0, score: {$meta: 'searchScore'}}},
  ];
  db.collection('post')
    .aggregate(searchOption)
    .toArray((err, rep) => {
      if (err) return console.log(err);
      res.render('search.ejs', {posts: rep, search: req.query.value});
    });
});

// router 폴더와 파일을 만들어 API들 관리하기 연습 //
app.use('/shop', require('./routes/shop'));
app.use('/board/sub', require('./routes/board'));

app.get('/upload', (req, res) => {
  res.render('upload.ejs');
});

let multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/image');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return callback(new Error('PNG, JPG만 업로드하세요'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024, // 1 mb 를 뜻함.
  },
});

app.post('/upload', upload.single('profile'), (req, res) => {
  res.send('완료');
});

app.get('/image/:imgName', (req, res) => {
  var imgName = req.params.imgName;
  res.sendFile(__dirname + '/public/image/' + imgName);
});

const isNewChat = (req, res, next) => {
  console.log('isnewchat');
  var member = [req.body.writer, req.body.chatter].sort();
  db.collection('chat').findOne({member: member}, (errFindOne, resFindOne) => {
    if (errFindOne) {
      res.status(400).send({message: '실패하였습니다'});
      return console.log(errFindOne);
    }
    var _id = uuidv4();
    if (!resFindOne) {
      console.log('not found');
      req.chatRoomId = _id;
      next();
    } else {
      console.log('found');
      res.status(200).send({chatRoomId: resFindOne._id, message: '채팅방이 이미 존재하여 연결합니다'});
    }
  });
};

app.post('/chat', isNewChat, (req, res) => {
  console.log('post');
  var insertObj = {
    _id: req.chatRoomId,
    member: [req.body.writer, req.body.chatter].sort(),
    date: new Date(),
  };
  db.collection('chat').insertOne(insertObj, (errInsertOne, resInsertOne) => {
    if (errInsertOne) return console.log(errInsertOne);
    res.status(200).send({chatRoomId: _id, message: '채팅방이 존재하지 않아 생성합니다'});
  });
});

app.get('/chat/:room', (req, res) => {
  console.log('get chat room');
  var room = req.params.room;
  db.collection('message')
    .find({room: room})
    .toArray((errFind, resFind) => {
      res.render('chat.ejs', {room: room, messages: resFind});
    });
});

app.post('/chat/send/:room', (req, res) => {
  var room = req.params.room;
  var insertObj = {
    room: room,
    content: req.body.msg,
    date: new Date(),
  };
  db.collection('message').insertOne(insertObj, (errInsertOne, resInsertOne) => {
    if (errInsertOne) return console.log(errInsertOne);
    res.redirect('back');
  });
});
