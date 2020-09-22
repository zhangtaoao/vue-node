let express = require('express');
let router = express.Router();
let mysqlHandler = require('../config/db');

//获取
router.get('/', function (req, res) {
  mysqlHandler.exec({
    sql: 'select * from tbl_student',
    params: [],
    callback: function (data) {
      res.send({
        'list': data
      })
    }
  })
})
module.exports = router;