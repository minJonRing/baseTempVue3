<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">欢迎登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model.trim="form.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          clearable
        >
          <template class="svg-container" #prepend>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model.trim="form.password"
          type="password"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          clearable
          @keyup.enter="handleLogin"
          show-password
        >
          <template class="svg-container" #prepend>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <div class="username-help">
          <router-link to="/login">
            <el-button type="text">还没有账号?马上注册!</el-button>
          </router-link>
          <router-link to="/login">
            <el-button class="color-w" type="text">忘记密码</el-button>
          </router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { blur } from "tqr";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "admin",
        password: "111111",
      },
      rules: {
        username: blur,
        password: blur,
      },
      loading: false,
      //
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {
    if (this.form.username === "") {
      this.$refs.username.focus();
    } else if (this.form.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {},
  methods: {
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch(
              "user/login",
              {
                password: "c715b7a95b19e6b8e4fb69e8ddd5ec9a",
                terminal: "organization",
                username: "admin",
              } || this.form
            )
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #000;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  height: 100vh;

  .login-form {
    float: right;
    position: relative;
    width: 460px;
    max-width: 100%;
    padding: 160px 35px 0;
    overflow: hidden;
    background-color: #fff;
    height: 100%;
    clear: both;
    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
    .username-help {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
    }
  }
}
</style>
