<template>
  <div id="change-pwd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div>
        <el-form label-width="100px" ref="changepwd" :model="form" :rules="rules">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="form.old_pwd" clearable show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="form.new_pwd" clearable show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="new2_pwd">
            <el-input v-model="form.new2_pwd" clearable show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    let new_pwdfun = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入6位以上的密码"));
      } else {
        callback();
      }
    };
    let new2_pwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("请输入6位以上的密码"));
      } else if (value != this.form.new_pwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        old_pwd: "",
        new_pwd: "",
        new2_pwd: ""
      },
      rules: {
        old_pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度必须在6位以上", trigger: "blur" }
        ],
        new_pwd: [{ validator: new_pwdfun, trigger: "blur" }],
        new2_pwd: [{ validator: new2_pwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.changepwd.validate(async result => {
        if (result) {
          let obj = {
            oldPassword: this.form.old_pwd,
            newPassword: this.form.new2_pwd,
            id: parseInt(JSON.parse(sessionStorage.getItem("data")).data.id),
            token: JSON.parse(sessionStorage.getItem("data")).token
          };
          let d = await this.$axios.post(
            "users.php?a=chgpwd",
            this.$qs.stringify(obj)
          );
          if (d.data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            setTimeout(() => {
              this.$refs.changepwd.resetFields();
              sessionStorage.removeItem("data")
              this.$router.push("/");
            }, 2000);
          } else {
            this.$message({
              message: "原密码不正确或者参数不对",
              type: "error"
            });
          }
        }
      });
    },
    reset() {
      this.$refs.changepwd.resetFields();
    }
  }
};
</script>
<style>
#change-pwd .el-form-item {
  width: 400px;
}
</style>