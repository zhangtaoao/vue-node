let express = require('express');
let router = express.Router();
let mysqlHandler = require('../config/db');

//更改
router.post('/', function (req, res) {
  let name = req.body.name;
  let id = req.body.id;
  let age = req.body.age;
  mysqlHandler.exec({
    sql: 'update tbl_student set name = ?,age = ? where id = ?',
    params: [name, age, id],
    callback: function (data) {
      if (data) {
        res.send({
          'data': {
            state: 'true',
            mes: "更改成功"
          }
        })
      }
    }
  })
})
module.exports = router;