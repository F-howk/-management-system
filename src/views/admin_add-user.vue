<template>
  <div id="add-user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <div>
        <el-form label-width="100px" ref="userform" :model="form" :rules="rules">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="form.pwd" clearable show-password></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="form.value" placeholder="请选择用户组">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
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
    return {
      form: {
        username: "",
        pwd: "",
        value: "超级管理员"
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
      },
      options: [
        {
          value: "超级管理员",
          label: "超级管理员"
        },
        {
          value: "部门管理员",
          label: "部门管理员"
        },
        {
          value: "普通管理员",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$refs.userform.validate(result => {
        if (result) {
          let that = this;
          let data = this.form;
          this.$axios
            .post(
              "users.php?a=add",
              `account=${data.username}&password=${data.pwd}&userGroup=${data.value}`
            )
            .then(data => {
              if (data.data.code == 0) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                setTimeout(() => {
                  that.$refs.userform.resetFields();
                  that.$router.push("/index/admin_Account-list");
                }, 1000);
              } else if (data.data.code == 5002) {
                this.$message({
                  message: "用户名已存在",
                  type: "warning"
                });
              } else {
                this.$message({
                  message: "添加失败",
                  type: "error"
                });
              }
            });
        }
      });
    },
    reset() {
      this.$refs.userform.resetFields();
    }
  }
};
</script>
<style>
#add-user header {
  line-height: 60px;
  border-bottom: 1px solid #ddd;
}
#add-user .el-form-item {
  width: 400px;
}
#add-user .el-select {
  width: 100%;
}
</style>