var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource！！！');
});
router.get('/cool', function(req, res, next) {
  res.send('你好cool11');
});
module.exports = router;
