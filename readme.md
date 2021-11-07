## Contents

#### Part1

[6. 두근두근 내 첫서버에서 GET 요청을 처리해보자](#두근두근-내-첫서버에서-get-요청을-처리해보자)

[7. 서버에서 HTML 파일전송해보기 & Nodemon으로 자동화](#서버에서-html-파일전송해보기-&-nodemon으로-자동화)

[8. Bootstrap을 이용한 빠른 UI 개발](#bootstrap을-이용한-빠른-ui-개발)

[9. 폼에 입력한 데이터를 서버에 전송하는 법 (POST요청)](#폼에-입력한-데이터를-서버에-전송하는-법)

[10. (쉬어가기) REST API가 뭔지 세계 최고로 쉽게 설명해드림](#rest-api가-뭔지-세계-최고로-쉽게-설명해드림)

#### Part2

[1. MongoDB 셋팅하기 (무료 호스팅도 받아보자)](#mongodb-셋팅하기)

[2. Database에 자료 저장하는 법 (한줄이면 끝)](#database에-자료-저장하는-법)

[3. HTML에 DB데이터 꽂아넣는 법 1 (EJS)](#html에-db데이터-꽂아넣는-법-1)

[4. HTML에 DB데이터 꽂아넣는 법 2 (DB데이터 읽기)](html에-db데이터-꽂아넣는-법-2)

[5. 심심할 때 읽어보는 DB의 종류와 특징](#심심할-때-읽어보는-db의-종류와-특징)

[6. 게시물마다 번호를 달아 저장하려면](#게시물마다-번호를-달아-저장하려면)

[7. 게시물마다 번호 달기 2 : DB Update 함수와 inc 연산자](#게시물마다-번호-달기-2-db-update-함수와-inc-연산자)

[8. AJAX로 삭제요청하기 1 (HTML 파일 구성)](#ajax로-삭제요청하기-1)

[9. AJAX로 삭제요청하기 2 (서버는 뭘해야하나)](#ajax로-삭제요청하기-2)

[10. AJAX로 삭제요청하기 3 (jQuery를 이용한 UI 기능) & 여러가지 응답방법](#ajax로-삭제요청하기-3-여러가지-응답방법)

[11. 쇼핑몰처럼 상세페이지를 만들어보자 (URL parameter)](#쇼핑몰처럼-상세페이지를-만들어보자)

[12. (쉬어가기) Bootstrap 디자인 넣기 & HTML 조립식 개발하기](#bootstrap-디자인-넣기-html-조립식-개발하기)

#### Part3

[1. 글 수정 기능 1 : /edit 페이지 안내와 method-override](#글-수정-기능-1-edit-페이지-안내와-method-override)

[2. 글 수정 기능 2 : DB 데이터를 수정해보자 (이쯤되면 혼자서도 가능 ㅇㅋ)](#글-수정-기능-2-db-데이터를-수정해보자)

[3. 세션, JWT, OAuth 등 회원인증 방법론 쉽게 이해하기](#세션,-jwt,-oauth-등-회원인증-방법론-쉽게-이해하기)

[4. (회원인증기능 1) 로그인 페이지 만들기 & 아이디 비번 검사](#회원인증기능-1-로그인-페이지-만들기-아이디-비번-검사)

[5. (회원인증기능 2) 아이디 비번을 DB와 비교하고 세션 만들어주기](#회원인증기능-2-아이디-비번을-db와-비교하고-세션-만들어주기)

[6. (회원인증기능 3) 로그인 유저만 접속할 수 있는 페이지 만들기](#회원인증기능-3-로그인-유저만-접속할-수-있는-페이지-만들기)

[8.검색기능 만들기 1 : URL query string](#검색기능-만들기-1-url-query-string)

[9. 검색기능 만들기 2 : 게시물이 100만개일 때 쓰는 indexing 개념설명](#검색기능-만들기-2-게시물이 100만개일-때-쓰는-indexing-개념설명)



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

❓React `routes` 에서 특정 링크 이동시 특정 컴포넌트 리턴 수행 ([참고](https://github.com/y00njaekim/nwitter/blob/master/src/components/Router.js)) 🆚 nodejs 에서 특정 링크 이동시 특정 파일 `send` 해주는 것의 차이

👏 어떻게 보면 리액트 `routes` 에서 컴포넌트 리턴하는 것이 nodejs 에서 `response.send` 하는 것과 비슷한 거네

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

❓URI 가 정확히 무엇이며 어떤 기능을 하는 걸까? URL 과의 차이점은 무엇일까?

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
> **write.html을 보고싶으면 /write로 접속하라는 API**를 정의하고 계셨던 것입니다. 

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

요청들은 모두 각각 독립적으로 처리되어야 한다. 요청 1이 성공해야 요청 2를 보내주는 식의 요청 간 의존성이 존재하는 코드를 짜면 안된다. 다르게 말하면, **요청 하나 만으로 자료를 가져오기 충분하도록 요청에 필요한 모든 정보를 실어 보내**야 한다.

🎯 **Cacheable**

요청을 통해 보내는 자료들은 캐싱이 가능해야 한다. 또한 캐싱 가능하다고 표시하거나 캐싱 기간을 설정해주어야 한다.

> 캐싱이란, 네이버를 방문하면 크롬 브라우저는 자동으로 자주 사용하는 이미지 파일, CSS 파일 등을 하드에 저장해 놓는다. 별로 바뀔 일이 없는 네이버 로고나 아이콘 같은 것을 말이다. 하드에 저장해놓고 네이버 방문할 때 네이버 서버에 네이버 로고를 달라는 요청을 따로 하지 않고 하드에서 불러온다. 이 행위를 캐싱이라 한다.

🎯 **Layered System**

요청을 처리하는 곳과 DB에 저장하는 곳 , 이런 여러가지 단계를 거쳐서 요청을 처리하도록 해도 된다. 즉 여러개의 레이어를 거쳐서 요청을 처리하게 만들어도 된다.

🎯 **Code on Demand**

서버는 고객에게 실제 실행 가능한 코드를 전송해주어야 한다.

3 . URL 이름짓기 관습

예시 :

**instagram.com/explore/tags/kpop**

**instagram.com/explore/tags/food**

**facebook.com/natgeo/photos**

**facebook.com/bbc/photos**

관습 :

- 단어들을 동사보다는 명사 위주로 구성
- 응용해서 다른 정보들을 쉽게 가져올 수 있도록 일관성 유지
- 대충 봐도 어떤 정보가 들어올지 예측 가능하게
- 띄어쓰기는 대시`-` 사용
- 파일 확장자 쓰지 말기
- 하위 문서들을 뜻할 땐 / 기호를 사용

<br/>

## Part2

#### MongoDB 셋팅하기

1. DB 존재 위치 / 이용 방법.

   하드에 저장 🆚 호스팅

2. 접속 URL 복붙: `mongodb+srv://디비계정아이디:디비계정패스워드@cluster0-qaxa3.mongodb.net/데이터베이스이름?retryWrites=true&w=majority`

#### Database에 자료 저장하는 법

1. `<form>` `input` 자료를 저장하는 방법

```
app.post('/add', function(요청, 응답){
  응답.send('전송완료');
  db.collection('post').insertOne( { 제목 : 요청.body.title, 날짜 : 요청.body.date } , function(){
    console.log('저장완료')
  });
});
```

❗참고로 **응답.send()** 이 부분은 항상 존재해야 한다.

전송이 실패 성공과 상관 없이 서버에서 무언가 응답하지 않으면 브라우저가 멈춘다

메세지로 응답하지 않으려면 간단한 응답코드를 보내거나 리다이렉트(페이지강제이동)를 해주식으로 구성할 수도 있다.

#### HTML에 DB데이터 꽂아넣는 법 1

1. `app.get()` 에 `render` 함수 쓸 수 있음

```js
app.get('/list', (req, res) => {
  res.render('list.ejs');
});
```

#### HTML에 DB데이터 꽂아넣는 법 2

1. `app.get()` 에 `render` 함수를 쓰며 option 으로 자료 넘겨줄 수 있음

```js
app.get('/list', (req, res) => {
  const tmp = db
    .collection('post')
    .find()
    .toArray((err, rep) => {
      if (err) return console.log(err);
      res.render('list.ejs', {posts: rep});
    });
});
```

`render(view: string, options?: object)`

Render `view` with the given `options`

#### 심심할 때 읽어보는 DB의 종류와 특징

1. MongoDB 도 스키마를 미리 정의하기 위해 Mongoose 같은 라이브러리를 추가해서 사용하기도 한다.

2.  NoSQL 데이터베이스는 기본적으로 SQL에서의 JOIN 연산을 적용하는게 어렵다. 때문에 서버 단에서 JOIN 연산을 쉽게 처리해주는 라이브러리를 이용해야 한다.

3. 대부분의 NoSQL 데이터베이스는 scale out이라는 방법으로 데이터를 분산 저장하는 방법을 기본적으로 지원한다.

4. MongoDB에서도 Relational Database처럼 관계를 표현해 저장하기도 한다.

   <img src="https://user-images.githubusercontent.com/56385667/139691355-1110d1cb-19be-4a16-b9b6-410aad4e89ee.png" />

#### 게시물마다 번호를 달아 저장하려면

1. Auto Increment 구현 (DB의 `_id`를 자동으로 1 증가시켜가며 추가해주세요 - 영구적 할당, `_id=1` 인 data 가 삭제 되었을 때 이후에 추가되는 data 는 `_id=1` 을 가질 수 없음 )
2. `find` 하는 방법. 내가 원하는 data 찾는 방법

```js
db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){
    var 총게시물갯수 = 결과.totalPost;
}
```

#### 게시물마다 번호 달기 2 DB Update 함수와 inc 연산자

1. `updateOne`

   ```js
   db.collection('counter').updateOne( {요런 이름의 자료를} , {이렇게 수정해주세요} , function(에러, 결과){  console.log('수정완료') })
   ```

   가운데 인자는 `$` 기호를 통해 operator 를 적용시킬 수 있다. `$set`(변경) , `$inc`(증가) , `$min`(기존값보다 적을 때만 변경) , `rename`(key값 이름변경) 등 여러 operator 가 존재한다.

   ```js
   app.post('/add', function (요청, 응답) {
     db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){
       var 총게시물갯수 = 결과.totalPost
   
       db.collection('post').insertOne({ _id : 총게시물갯수 + 1, 제목 : 요청.body.title, 날짜 : 요청.body.date }, function (에러, 결과) {
         db.collection('counter').updateOne({name:'게시물갯수'},{ $inc: {totalPost:1} },function(에러, 결과){
   	if(에러){return console.log(에러)}
           응답.send('전송완료');
         })
       })
     })
   })
   ```

#### AJAX로 삭제요청하기 1

1. HTML 에서는 일반적으로 `PUT`, `DELETE` method 를 사용할 수 없다. 그에 대한 해결 법으로는,
   1. method-override 라는 라이브러리의 도움을 받는다
   2. AJAX 로 `DELETE` 요청을 보낸다.
   3. `POST` 요청을 통해 `DELETE` 작업을 수행한다.
2. AJAX 란 프론트엔드에서 JS 를 이용하여 서버에 여러 요청을 할 수 있는 JS 문법이다. 새로고침 없이 서버에 몰래몰래 요청을 할 수 있다.
3. JS 만을 이용해서 AJAX 를 사용할 수 있지만 그렇게 하면 다소 긴 코드를 작성해야 한다. 이 때 JQuery 를 이용하면 간편해진다. `<script>` 태그와 JQuery CDN 을 이용하여 사용하자. 

```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<script>
  $.ajax({
    method : 'DELETE',
    url : '/delete',
    data : '1번게시물'
  }).done(function(결과){
    AJAX 성공시 실행할 코드는 여기
  }).fail(function(에러){
    실패시 실행할 코드는 여기
  });
</script>
```

#### AJAX로 삭제요청하기 2

- React 에서 ajax 사용하는 방법

```react
import 많은곳;
import axios from 'axios';

function App(){
  
  return (
    <HTML많은곳/>
    <button className="btn btn-primary" onClick={()=>{

      axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((result)=>{ console.log(result.data) })
      .catch(()=>{ 요청실패시실행할코드 })

    }}>더보기</button>
  )
}
```

- HTML 에서 ajax 사용하는 방법

```react
    <script>
      $('.delete').click((event) => {
        var clickedId = event.target.dataset.id;
        $.ajax({
          method : 'DELETE',
          url: '/delete', // 요청할 경로
          data: {_id : clickedId} // 요청과 함께 보낼 데이터
        }).done((res) => {
        })
      })
    </script>
```

둘을 비교해보았을 때 HTML 에서 사용하는 ajax 가 도대체 어디다가 요청을 하는 건지 헷갈릴 수 있다.

`url: '/delete'` 는 현재 접속해있는 웹 서버 `/delete` 에 요청하는 것임을 기억하자

#### AJAX로 삭제요청하기 3 여러가지 응답방법

1. **서버는** 어떤 **요청에 대하여** **반드시 응답**하여야 한다.
2. list.ejs 에서 ajax 이후 `done` `fail` 판단은 다음과 같이 발생한다.
   1. 데이터가 오거나 200 코드가 오면 성공이다
   2. 데이터가 안오거나 400, 500 코드가 오면 실패이다.

```ejs
(list.ejs)

<script>
  $('.delete').click(function(){
    $.ajax({
      method : 'DELETE',
      url : '/delete',
      data : { _id : e.target.dataset.id }
    }).done((결과)=>{
      //AJAX 성공시 실행할 코드적기
    }).fail((xhr,code,err)=>{
      //AJAX 실패시 실행할 코드적기
    });
  });
</script>
```

​	`done` 과 `fail` 을 판단하기 위해 서버는 응답코드를 보내야 한다.

```js
app.delete('/delete', (req, res) => {
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
```

3. JQuery 를 이용하여 ejs 에서 특정 ui 를 fade out 할 수 있다.

#### 쇼핑몰처럼 상세페이지를 만들어보자

1. 가장 중요한 건 단 하나의 `detail.ejs` 를 통해 모든 상세페이지를 만든다는 것이다.

```js
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
```

`res.render('detail.ejs', {data: resFindOne})` 을 통해 상세페이지에 전달할 data 만 변경해 준다.

❓ 응답코드 확인하려면 브라우져에서 어디 들어가야 되나 ?

#### Bootstrap 디자인 넣기 HTML 조립식 개발하기

1. /public 에는 static files 를 저장한다. 예를 들면, `main.css` 등과 같은 파일들을 저장한다.

2. 미들웨어란 요청과 응답 사이에 동작하는 js 코드로 `app.use('/public', express.static('public'));` 이와 같은 코드로서 존재한다.

❓ 미들웨어란 ? [[여기서 확인]](#회원인증기능-1-로그인-페이지-만들기-아이디-비번-검사)

## Part3

#### 글 수정 기능 1 edit 페이지 안내와 method-override

❓ 특정 url 접속해서 수정 권한이 생긴다는게 다소 보안의 위험성이 있다는 거네 ?..

#### 글 수정 기능 2 DB 데이터를 수정해보자

1. 서버 단 코드에서 다른 method 를 사용하면 같은 url 로 짤 수는 있다. 근데 좋은 코드인지는 모르겠다.

   ```js
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
   ```

#### 세션, JWT, OAuth 등 회원인증 방법론 쉽게 이해하기

회원 인증 방법

1 . session-based authentication

🚩 **Keyword :** **세션스토어, 세션아이디, 쿠키**

- 로그인 과정

1. 클라이언트가 특정 웹페이지에서 로그인 시도를 한다.
2. 클라이언트의 로그인 정보가 서버에 전달되어 로그인에 성공하게 된다면, 서버는 **세션스토어**(physically 서버메모리) 에 **세션** (로그인 상태 정보)을 만들어 다음과 같은 정보를 저장한다. "A 라는 사람이 7시에 로그인 하였습니다."
3. 서버가 특정 유저에 관한 세션을 저장하며 **세션 아이디**를 발급한다.
4. 서버는 **세션 아이디**를 **쿠키**에 담아 클라이언트 브라우저에 전송한다. 비로소 **세션 아이디**는 서버와 클라이언트 브라우저 모두에 보관되어 있다. 
   * 쿠키란, 브라우저에 마련되어 있는 조그만 문자데이터 저장 공간이다.

- 요청 과정

1. 클라이언트가 서버에 로그인이 필요한 페이지를 요청한다. (ex. 마이페이지) 브라우저가 서버에 페이지를 요청할 때에는 자동적으로 쿠키가 서버로 전송된다.
2. 서버는 클라이언트의 로그인 상태를 확인하려 한다. 그 방법으로 서버는 **쿠키 **에 기록된 **세션 아이디**를 서버의 세션스토어에 저장되어 있는 세션 아이디와 비교한다. 클라이언트의 로그인이 확인되면 요청에 따른 응답을 보낸다.
   * 즉, `res.render( )` 하기 전에 로그인 상태를 확인하는 과정을 거친다.

🤔 세션이 서버에 저장된다는 특징이 이 방법의 장점이자 단점이다.

<br/>

2 . token-based authentication (JWT, Json Web Token)

🚩 **Keyword :** **토큰**

- 로그인 과정

1. 클라이언트가 특정 웹페이지에서 로그인 시도를 한다.
2. 클라이언트의 로그인 정보가 서버에 전달되어 로그인에 성공하게 된다면, 서버는 **토큰**을 만들어 클라이언트 브라우저에 보내준다. **토큰**은 암호화된 긴 문자열로, 사용자가 로그인 했었는지, 아이디는 무엇인지 등의 정보를 넣을 수 있다. 또한 위조가 불가능하도록 특별한 서명이 추가된다.
3. **토큰**은 브라우저의 쿠키나 로컬 스토리지에 저장된다. (개발자는 코드를 잘 구성하여 클라이언트가 페이지를 방문할 때마다 **토큰**이 서버로 보내지도록 **미리 직접** 장치를 추가해야 한다)

- 요청 과정

1. 클라이언트가 서버에 로그인이 필요한 페이지를 요청한다. (ex. 마이페이지) 개발자는 코드를 잘 구성하여 클라이언트가 페이지를 방문할 때마다 **토큰**이 서버로 보내지도록 **미리 직접** 장치를 추가해야 한다
2. 서버는 클라이언트의 로그인 상태를 확인하려 한다. 그 방법으로 서버는 **토큰**을 검사한다. 토큰이 적법한지 검사한다. 유통기한이 지나지 않았는지, 서명이 잘 되어 있는지, 블랙리스트에 등록된 토큰인지 등의 검사를 거친다. 클라이언트의 **토큰**의 이상이 없으면 요청에 따른 응답을 보낸다.

🤔 토큰을 준다는 것은 열쇠를 준다고 생각하면 된다. 그냥 열쇠를 주는 거다.

🤔 서버가 세션데이터를 저장할 필요가 없다. 이 점은 서버 스케일링 시 문제가 발생하지 않는다는 장점이다.

🤔 클라이언트의 토큰만을 이용해 로그인 상태를 파악하는 것은 보안상의 문제가 있을 수 있다. 해당 토큰(열쇠) 를 다른 사람이 흠칠 수 있다.

🤔 왜인지는 모르겠지만 좀 더 stateless (restful) 한 방법이라고 한다.

<br/>

3.Open authentication (OAuth)

- 로그인 과정
  1. 클라이언트가 특정 웹페이지에서 '페이스북으로 로그인'을 시도한다.
  2. 페이스북은 우리 서버에 유저의 이름과 아이디 등의 정보를 보내준다.
  3. 서버는 해당 유저의 정보를 바탕으로 회원 목록을 만들어 주거나 세션 혹은 토큰을 만들어 준다.

- 요청 과정

1. 클라이언트가 서버에 로그인이 필요한 페이지를 요청한다. (ex. 마이페이지)
2. 서버는 클라이언트의 로그인 상태를 확인하려 한다. 그 방법으로 서버는 **세션** 혹은 **토큰**을 검사한다.

🤔 페이스북이 1.  OAuth 를 중단하거나 2. 방법을 수정하거나 3. 페이스북 API 서버 다운으로 접속이 불가능하다면 우리 사이트도 로그인이 불가능해진다.

#### 회원인증기능 1 로그인 페이지 만들기 아이디 비번 검사

1 . 라이브러리 설치

`npm install passport passport-local express-session`

실제 서비스 시 express-session 말고 MongoDB에 세션데이터를 저장해주는 라이브러리를 사용하는 것을 추천 !

2 . ❓ 미들웨어란 ?

**What ?** 웹사이트는 요청-응답해주는 프로그램. 이 때 요청-응답 중간에 실행시키는 코드가 미들웨어.

> Middleware functions are functions that have **access to the request object** (req), the response object (res), and **the next function** in the application’s request-response cycle.

**Why ?** 보통 요청이 적법한지 검사하는 기능 등을 미들웨어에 많이 담는다.

**How ?** app.use(미들웨어)

```js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 
```

위 코드 중 `passport.initialize()` , `passport.session()` 는 **모든** 요청과 응답 중간에 실행된다.

---

**referene**

[미들웨어 정의 및 유형](https://psyhm.tistory.com/8)

> - 모든 코드를 실행
> - 다음 미들웨어 호출(미들웨어가 순차적으로 실행)
> - res, req 객체 변경 가능
> - 요청-응답 주기를 종료(response methods를 이용)

[모듈과 미들웨어 개념](https://jinbroing.tistory.com/126)

> - 4. 미들웨어 함수 우선순위 : 먼저 로드되는 미들웨어 함수가 먼저 실행됨(코드 순서 중요)

---

3 . `app.post()` 새로운 파라미터.

```js
app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), function(요청, 응답){
  응답.redirect('/')
});
```

두 번째 파라미터의 의미 : **응답해주기 전**에 local 방식으로 아이디 비번을 인증해주세요 라는.

4 . `LocalStrategy`

**How ?** ` LocalStrategy({ 설정 }, function() { 아이디비번 검사하는 코드 })`

#### 회원인증기능 2 아이디 비번을 DB와 비교하고 세션 만들어주기

1 . 쿠키 확인 위치

개발자도구 > Application > Cookies

<br/>

❓근데

```js
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/fail',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

passport.use( ...
)
```

여기서 두 번째 파라미터로 `passport` 가 실행되고 아마 그 때, `passport.use(미들웨어)` 실행할 텐데 그 안에서 `req.body.id` ( = `filledId` ) , `req.body.pw` ( = `filledPw` ) 를 어떻게 알고 참조해서 사용하는 거지 ?

✋ 지금 추측 :

1. 아마 미들웨어에서 `req` 을 참조할 수 있을 거임.
2. `LocalStrategy` 에 우리가 `usernameField` 를 넘겨 줬음.
3. `usernameField` 를 이용해서 `req.body.usernameField` 등으로 참조할 수 있을 거임.
4. 그렇게 나온 결과를 `filledId` 에 넣을 수 있을 것임.

#### 회원인증기능 3 로그인 유저만 접속할 수 있는 페이지 만들기

1. 혼자 횡설수설하며 정리해본 영상
   - 3-6. middle ware 이해 하려고 횡설수설 [[유튜브]](https://youtu.be/i3S-cwuiXxg3-6)
   - 3-6. passport 와 session 을 비롯한 middle ware 이해 [[유튜브]](https://youtu.be/kWk9MEJ1-O4)

---

**Q. 실제 서버 제작을 위해 신경쓰거나 더 공부해봐야할 사항들이 있나요?** 

\- 디자인, UI 개발, IE 호환성, 반응형 웹 등 프론트엔드 내용

\- 악성 유저가 아이디를 너무 길거나 이상하게 적으면 어떻게 할지 (직접 악성 유저가 되어 이것저것 테스트해보시면 됩니다)

\- DB에 저장하기 전에 빈칸이 없는지, 길이가 너무 길지 않은지 정규식과 if문으로 검증하기 

\- helmet 라이브러리 등으로 보안 약간 더하기

\- 이미지 업로드 등 서버에서 이미지 처리하기 (압축, 저장, 리사이즈 등)

\- Oauth 등 다른 로그인 방식 도입해보기

\- express-session 라이브러리는 세션이 많아지면 서버의 메모리를 많이 잡아먹기 때문에 connect-mongo 등의 라이브러리로 DB에 세션데이터를 저장해서 사용하기 

#### 회원가입 페이지 만들기

1. npm bycrypt 이용 [[공식문서]](https://www.npmjs.com/package/bcrypt)


#### 검색기능 만들기 1 URL query string

1. 검색 데이터를 서버에 보내야 내가 무얼 검색했는지 알 수 있다. 때문에 보통 이런 경우 `post` 요청을 하기 마련이다. 하지만 우리가 이번에 할 작업은 `get` 요청만으로 내가 무얼 검색했는지 서버에 넘겨주는 작업이다. 바로 `get` 요청이 들어가는 주소에 정보를 몰래 담는 것이다.

   `/search?value=내가검색한거`

2. 이런 작업을 query string, query parameter 라고 한다.
3. 이 때 `server.js` 에서 실행되는 요청은 `/search` 의 미들웨어 Path 를 가진 부분이다. 그렇다면 `?` 와 함께 보낸 정보는 어디로 갔을까 ? 바로 `req.query` 에 들어있다.

4. `list.ejs` 에서는 `get` 요청을 따로 할 필요 없이 url 만 갈아 치우면 된다. `window.location.replace('/search?value=' + value)` 와 같이 말이다. 

#### 검색기능 만들기 2 게시물이 100만개일 때 쓰는 indexing 개념설명

1. 정규식: 문자 검사하는 식 `.find({name: /글쓰기/})` 와 같이 `/땡땡땡/` 이라고 입력해야 함.

❓ 정규식이란 ? 

2. 그런데 정규식을 써도 임시방편일 뿐. 왜냐하면 검색할 대상의 데이터가 많으면 검색하는 데에 시간이 너무 많이 소요됨.
   - 이 때 필요한 게 **indexing** - indexing 을 해두면 binary search 를 할 수 있음. 즉 indexing 이란 미리 정렬해 둔 사본(참고용) 을 만들어 두는 것. 인덱싱은 웹(mongo atlas) 으로도 할 수 있고 cli 로 할 수도 있음.
   - 하지만, 인덱싱과 정규식은 다소 관련이 없음. 인덱싱은 맨 앞 글자부터 기준 삼아 정렬하는 것. 하지만 정규식은 특정 문자가 포함된 모든 경우를 탐색 해야하니까 중간에 있는 문자를 찾으려 할 때, 인덱싱의 정보를 이용할 수 없음.
