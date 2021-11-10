var router = require('express').Router();

router.get('/shirts', (req, res) => {
  res.send('셔츠 파는 페이지입니다');
});

router.get('/pants', (res, req) => {
  res.send('바지 파는 페이지입니다');
});

module.exports = router;
