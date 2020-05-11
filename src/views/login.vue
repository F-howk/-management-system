<template>
  <div class="login">
    <section>
      <h1>系统登陆</h1>
      <el-form ref="loginform" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user-solid" clearable></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="form.pwd" prefix-icon="el-icon-lock" clearable show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登陆</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        pwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "用户名必须在2-16位之间",
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度必须在6位以上", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginform.validate(async result => {
        if (result) {
          let obj = {
            account: this.form.username,
            password: this.form.pwd
          };
          let data = await this.$axios.post(
            "users.php?a=login",
            this.$qs.stringify(obj)
          );
          if (data.data.code == 0) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            data = JSON.stringify(data.data);
            sessionStorage.setItem("data", data);
            this.$router.replace("/index/admin_home");
          } else if (data.data.code == 1) {
            this.$message({
              message: "用户名或密码不正确",
              type: "warning"
            });
          } else {
            this.$message({
              message: "登陆失败",
              type: "error"
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/loginbg.jpg") no-repeat center;
}
.login > section {
  margin-top: 50px;
  width: 400px;
}
.login h1 {
  color: #eee;
  text-align: center;
  margin-bottom: 2em;
}
.login .el-form-item {
  margin-top: 50px;
}
.login .el-form-item input,
.login .el-form-item button {
  height: 50px;
  font-size: 18px;
}
.login .el-form-item button {
  font-size: 20px;
}
.login .el-button {
  width: 100%;
}
</style>
