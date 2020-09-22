let fs = require("fs");
let router = require("express").Router();
let mysqlHandler = require('../config/db');
let utils = require('../utils/fsUtils');

//delete
router.post("/", function (req, res) {
  let { id, filePath } = req.body;
  mysqlHandler.exec({
    sql: 'delete from tbl_file where id = ?',
    params: [id],
    callback: function (data) {
      res.send({
        "state": 'success'
      })
    }
  })
  utils.deleteFile(filePath)
})
module.exports = router;  