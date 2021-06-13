var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource！！！');
});
router.get('/system', function(req, res, next) {
  res.send('系统接口');
});
module.exports = router;
