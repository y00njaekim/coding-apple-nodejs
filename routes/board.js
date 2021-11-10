var router = require('express').Router();

const isLoginned = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send('로그인 안하셨는 데요?');
  }
};

router.use(isLoginned);

router.get('/sports', (req, res) => {
  res.send('스포츠');
});

router.get('/game', (req, res) => {
  res.send('게임');
});

module.exports = router;
