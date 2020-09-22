let express = require('express');
let router = express.Router();
let mysqlHandler = require('../config/db');

//插入
router.post('/', function (req, res) {
  let name = req.body.name;
  let age = req.body.age;
  mysqlHandler.exec({
    sql: 'insert into tbl_student(id,name,age) values(0,?,?)',
    params: [name, age],
    callback: function (data) {
      if (data) {
        res.send({
          'data': {
            state: 'true',
            mes: "插入成功"
          }
        })
      }
    }
  })
})
module.exports = router;