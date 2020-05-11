<template>
  <div id="add-user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改账号</span>
      </div>
      <div>
        <el-form label-width="100px" ref="userform" :model="form">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.account" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="form.userGroup" placeholder="请选择用户组">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" prop="time">
            <el-input v-model="form.ctime" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="reset">取消</el-button>
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
        account: "123",
        ctime: "023",
        userGroup: "超级管理员"
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
      this.$axios
        .post(
          "users.php?a=edit",
          `id=${this.form.id}&account=${this.form.account}&userGroup=${this.form.userGroup}`
        )
        .then(data => {
          if (data.data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.$router.push('/index/admin_Account-list')
          } else {
            this.$message({
              message: "修改失败",
              type: "error"
            });
          }
        });
    },
    reset() {
      this.$router.push("/index/admin_Account-list");
    }
  },
  created() {
    let id = this.$route.params.id;
    this.$axios
      .get(`users.php?a=readOne&id=${id}`)
      .then(data => {
        this.form = data.data.data;
      });
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