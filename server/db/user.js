let express = require('express');
let router = express.Router();
let db = require('../config/db');
//插入测试
router.get('/dbtest', function (req, res) {
  let project = { name: 'test' };
  let sqlString = 'INSERT INTO tbl_student SET ?';
  let connection = db.connection();
  db.insert(connection, sqlString, project, function (id) {
    console.log('inserted id is:' + id);
  });
  db.close(connection);
  return;
});