let moment = require("moment");
let router = require("express").Router();
let multer = require('multer');
let fs = require("fs");
let path = require("path");
let utils = require('./fsUtils');
let filePath = path.join(__dirname, './uploads');
let storage = multer.diskStorage({
  //文件存储路径
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  //修改上传文件的名字
  //file 是个文件对象 ,fieldname对应在客户端的name属性
  //存储的文件需要自己加上文件的后缀，multer并不会自动添加
  //这里直接忽略文件的后缀.
  filename: function (req, file, cb) {
    cb(null, moment().format("YYYYMMDDhhmmss") + "ZT" + file.originalname);
  }
});
let upload = multer({ storage: storage });
router.post('/', upload.single('file'), function (req, res, next) {
  let maxSize = 1024 * 1024 * 5;//大于5M压缩
  let fileSize = req.file.size;
  let fileName = req.file.filename;
  let fileType = req.file.mimetype;
  let sourceFile = req.file.path;
  let destPath = path.join(filePath, fileName);//文件路径
  let dest_Dir = path.join(filePath);
  let fileurl = destPath.substr(destPath.indexOf("uploads"));
  fileurl = fileurl.replace(/\\/g, "/");
  fs.exists(dest_Dir, function (exists) {
    if (exists) {
      fs.rename(sourceFile, destPath, function (err) {
        //压缩文件并删除压缩前文件
        if (fileSize > maxSize) {
          utils.compress(destPath)
          utils.deleteFile(destPath)
          utils.filStat(destPath, fileSize, fileName, fileType)
        } else {
          utils.filStat(destPath, fileSize, fileName, fileType, 0)
        }
        res.status(200).json({
          httpCode: 200,
          message: '上传成功',
          data: {
            "fileurl": req.file.path,
            "fileType": req.file.mimetype
          },
          req: req.file
        });
      });
    }
    else {
      fs.mkdir(dest_Dir, 0777, function (err) {
        if (err) {
          res.status(500).json({
            httpCode: 500,
            message: err,
            data: dest_Dir,
          });
        } else {
          fs.rename(sourceFile, destPath, function (err) {
            //压缩文件并删除压缩前文件
            if (fileSize > maxSize) {
              utils.compress(destPath)
              utils.deleteFile(destPath)
              utils.filStat(destPath, fileSize, fileName, fileType)
            } else {
              utils.filStat(destPath, fileSize, fileName, fileType, 0)
            }
            res.status(200).json({
              httpCode: 200,
              message: '上传成功',
              data: {
                "fileurl": fileurl
              },
            });
          });
        }
      })
    }
  });

});

// router.post('/', upload.array('file', 8), function (req, res, next) {
//   var paths = [];
//   for (var i = 0; i < req.files.length; i++) {
//     var path = req.files[i].path.replace(/\\/g, "/");
//     var fileurl = uploadFileDomin + path.substr(path.indexOf("uploads")).replace('\\', '/');
//     paths.push(fileurl);

//   }
//   res.status(200).json({
//     httpCode: 200,
//     message: '上传成功',
//     "fileurls": paths,
//   });
// });
module.exports = router;














/**
  multer关联的文件信息:
  filedname: 在form表单中指定的name属性值
  orginalname: 原始文件名
  encoding: 文件编码方式
  mimetype: 多媒体类型
  size: 文件大小，单位b
  destination: 文件上传后存储在服务端的路径
  filename: 文件在服务端的命名
  path: 文件在服务端的完整路径
  buffer: 文件二进制数据

  ps: 其中destination, filename和path只有在指定storage属性时候有效.而buffer只有文件在内存中存储时候有效.
*/
