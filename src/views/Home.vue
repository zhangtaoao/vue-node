<template>
  <div class="home">
    <div class="container">
      <el-button size="mini" type="primary" @click.stop="selectFile()">选择文件</el-button>
      <span>文件:</span>
      <span id="filename"></span>
      <el-button size="mini" type="success" id="btn_upload" @click.stop="upload()">上传到服务器</el-button>
    </div>
    <el-table :data="fileData" style="width: 100%" class="file_table" :fit="true" size="mini">
      <el-table-column prop="fileName" label="name"></el-table-column>
      <el-table-column prop="filePath" label="path"></el-table-column>
      <el-table-column prop="fileSize" label="size" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="download(scope.$index, scope.row)">下载</el-button>
          <el-button size="mini" type="danger" @click="deleteFile(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  login,
  upload,
  getFile,
  deleteFile,
  genVerifyCode,
} from "../apis/apis";
export default {
  name: "Home",
  data() {
    return {
      fileData: [],
      filename: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nextTick(() => {
        this.getFileList();
      });
    });
  },
  methods: {
    //上传文件
    async upload() {
      if (!document.getElementById("file") && !file.files[0]) return;
      //创建一个FormDate
      let formData = new FormData();
      //将文件信息追加到其中
      formData.append("file", file.files[0]);
      // formData.append("dir", "attachment");
      const [res, err] = await this.awaitWrap(upload(formData));
      if (err) {
        console.log(err);
        return;
      }
      this.getFileList();
    },
    //获取文件
    async getFileList() {
      const [res, err] = await this.awaitWrap(getFile());
      if (err) {
        console.log(err);
        return;
      }
      res.data.map((item) => {
        item.fileSize = Math.ceil(item.fileSize / 1024) + " kb";
      });
      this.fileData = res.data;
    },
    //删除文件
    async deleteFile(row) {
      const { id, filePath } = row;
      const [res, err] = await this.awaitWrap(deleteFile({ id, filePath }));
      if (err) {
        console.log(err);
        return;
      }
      this.getFileList();
    },
    //选择文件
    selectFile() {
      if (document.getElementById("file")) {
        document.getElementById("file").click();
        return;
      }
      let dom = document.createElement("input");
      dom.style.display = "none";
      dom.type = "file";
      dom.name = "file";
      dom.id = "file";
      document.body.appendChild(dom);
      dom.click();
      dom.addEventListener("change", function () {
        if (file.files[0]) {
          // this.filename = file.files[0].name;
          document.getElementById("filename").innerHTML = file.files[0].name;
        }
      });
    },
    //下载文件
    download(index, row) {
      const { fileName, filePath } = row;
      const blob = new Blob([filePath + "?mp.wexin.qq.com"]);
      const url = window.URL.createObjectURL(blob);
      let dom = document.createElement("a");
      dom.style.display = "none";
      dom.href = url;
      dom.setAttribute("download", fileName);
      document.body.appendChild(dom);
      dom.click();
    },
  },
};
</script>
<style lang="scss">
.home {
  .container {
    margin: 5px 0;
    font-size: 8px;
    padding: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    #btn_upload {
      position: absolute;
      // left: 50%;
    }
  }
  .file_table {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>