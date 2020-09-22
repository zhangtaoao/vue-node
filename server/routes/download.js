let fs = require("fs");
let router = require("express").Router();
let mysqlHandler = require('../config/db');

//获取文件列表
router.get("/", function (req, res) {
  mysqlHandler.exec({
    sql: 'select * from tbl_file',
    params: [],
    callback: function (data) {
      if (data) {
        res.send({
          'data': data
        })
      }
    }
  })
})
module.exports = router;