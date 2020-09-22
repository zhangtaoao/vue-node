<template>
  <div class="login">
    <el-form
      id="loginForm"
      status-icon
      :rules="loginRules"
      ref="loginForm"
      :model="loginForm"
      label-width="0"
    >
      <el-form-item prop="username">
        <el-input
          size="small"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="用户名"
        >
          <i slot="prefix" class="el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="small"
          @keyup.enter.native="handleLogin"
          :type="passwordType"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        >
          <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
          <i slot="prefix" class="el-icon-unlock"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :span="24">
          <el-col :span="16">
            <el-input
              size="small"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
            >
              <i slot="prefix" class="el-icon-key" />
            </el-input>
          </el-col>
          <el-col :span="8">
            <div
              class="login-code"
              v-loading="captchaLoading"
              element-loading-spinner="el-icon-loading"
              element-loading-background="#F5F7FA"
            >
              <div v-html="codeImg" lass="login-code-img" @click="refreshCode" title="验证码过期时间：120秒"></div>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click.native.prevent="handleLogin"
          class="login-submit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, genVerifyCode } from "../apis/apis";
import Cookies from "js-cookie";
export default {
  name: "Home",
  data() {
    return {
      codeImg: "",
      captcha: "",
      loginForm: {
        //租户ID
        tenantId: "000000",
        //用户名
        username: "admin",
        //密码
        password: "admin",
        //账户类型
        type: "account",
        //验证码的值
        code: "",
        //验证码的索引
        key: "",
        //预加载白色背景
        image:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      },
      loginRules: {
        tenantId: [
          { required: false, message: "请输入租户ID", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, message: "密码长度最少为6位", trigger: "blur" },
        ],
      },
      passwordType: "password",
      captchaLoading: false,
      timer: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
      this.genVerifyCode();
    });
  },
  methods: {
    async getData() {
      const [res, err] = await this.awaitWrap(login());
    },
    async genVerifyCode() {
      this.captchaLoading = true;
      const [res, err] = await this.awaitWrap(genVerifyCode());
      if (err) {
        console.log(err);
        return;
      }
      this.codeImg = res;
      this.captcha = Cookies.get("captcha");
      this.captchaLoading = false;
      console.log(this.captcha);
    },
    refreshCode() {
      this.captchaLoading = true;
      this.genVerifyCode();
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.refreshCode();
      }, 120000);
    },
    showPassword() {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "登录中,请稍后。。。",
            spinner: "el-icon-loading",
          });
          if (this.loginForm.code === this.captcha) {
            loading.close();
            this.$router.push({ path: "/home" });
            clearInterval(this.timer);
          } else {
            this.refreshCode();
            loading.close();
          }
          // this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
          //   this.$router.push({path: this.tagWel.value});
          //   loading.close();
          //   clearInterval(this.timer);
          // }).catch(() => {
          //   this.refreshCode();
          //   loading.close();
          // });
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  #loginForm {
    width: 400px;
    height: 240px;
    margin: 260px auto;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>