let fs = require("fs");
const zlib = require('zlib');
let mysqlHandler = require('../config/db');


//删除指定文件
const deleteFile = (filename) => {
  fs.unlink(filename, function (err) {
    if (err) {
      throw err;
    }
    // console.log(`成功删除了 ${filename}`);
  });
}

//读取文件
const readFile = (filename) => {
  fs.readFile(filename, 'utf-8', function (err, data) {
    // 读取文件失败/错误 
    if (err) {
      throw err;
    }
    // 读取文件成功 
    console.log(data);
  });
}

//压缩文件
const compress = (filename) => {
  const gzip = zlib.createGzip();
  const inFile = fs.createReadStream(filename);
  const outGzip = fs.createWriteStream(`${filename}.gzip`);
  inFile.pipe(gzip)
    .on('error', () => {
      console.log('error');
    })
    .pipe(outGzip)
    .on('error', () => {
      console.log('error')
    });
}
//存储文件信息
const filStat = (filePath, fileSize, fileName, fileType, isGzip = 1) => {
  if (isGzip) {
    filePath = filePath + '.gzip'
  }
  mysqlHandler.exec({
    sql: 'insert into tbl_file(filePath,fileSize,fileName,fileType,isGzip) values(?,?,?,?,?)',
    params: [filePath, fileSize, fileName, fileType, isGzip],
    callback: function (data) {
      return data;
    }
  })
}
//删除文件信息
const deleteFileStat = (filePath) => {
  mysqlHandler.exec({
    sql: 'delete from tbl_file where filePath=?',
    params: [filePath],
    callback: function (data) {
      return data;
    }
  })
}
module.exports = {
  deleteFile,
  readFile,
  compress,
  filStat,
  deleteFileStat
}