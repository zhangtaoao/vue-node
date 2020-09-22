var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json({ name: 'zhang', pwd: '123456' })
})

module.exports = router;