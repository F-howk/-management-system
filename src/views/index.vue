<template>
  <div id="index">
    <el-container>
      <el-aside width="240px">
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          text-color="#fff"
          background-color="rgb(255,255,255,0)"
          active-text-color="#1296db"
          router
        >
          <el-header style="height:80px">
            <i class="el-icon-food"></i>外卖商家中心
          </el-header>
          <el-menu-item index="/index/admin_home">
            <i class="el-icon-s-home"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>
          <el-menu-item index="/index/admin_order-management">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-collection"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/index/admin_product-list">商品列表</el-menu-item>
            <el-menu-item index="/index/admin_add-product">添加商品</el-menu-item>
          </el-submenu>
          <el-menu-item index="/index/admin_store">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>店铺管理</span>
            </template>
          </el-menu-item>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item index="/index/admin_Account-list">账号列表</el-menu-item>
            <el-menu-item index="/index/admin_add-user">添加账号</el-menu-item>
            <el-menu-item index="/index/admin_change-pwd">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item index="/index/admin_product-statistics">商品统计</el-menu-item>
            <el-menu-item index="/index/admin_orders-statistics">订单统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="height:80px" class="main-header">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="float:left;">
            <el-breadcrumb-item :to="{ path: '/index/admin_home' }">
              <span class="one">首页</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="(v,i) in this.$route.meta" :key="i">{{v}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="login-right">
            欢迎你，
            <span class="user">{{user}}</span>
            <span class="user-icon">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <img v-if="imgsrc" :src="imgsrc" alt />
                  <img v-else src="../assets/logo.png" alt />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <a href="#/index/user_info">个人信息</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a href="#/" @click="exit">退出登录</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: "",
      imgsrc: ""
    };
  },
  methods: {
    exit() {
      sessionStorage.removeItem("data");
    },
    async verify() {
      if (sessionStorage.getItem("data")) {
        let data = JSON.parse(sessionStorage.getItem("data"));
        let obj = {
          id: parseInt(data.data.id),
          token: data.token
        };
        let d = await this.$axios.get(
          "users.php?a=chklogin&" + this.$qs.stringify(obj)
        );
        if (d.data.code > 0) {
          this.$message({
            message: "请登陆后再操作!",
            type: "error"
          });
          this.$router.replace("/");
        }
        this.user = data.data.account;
        this.imgsrc = data.data.imgUrl;
      } else {
        this.$message({
          message: "请登陆后再操作!",
          type: "error"
        });
        this.$router.replace("/");
      }
    }
  },
  created() {
    this.verify();
  }
};
</script>
<style>
#index,
html,
body {
  width: 100%;
  height: 100%;
}
#index > section {
  height: 100%;
}
#index aside {
  background: url("../assets/indexbg.jpg");
}
#index .el-menu .el-menu-item:hover,
#index .el-submenu__title:hover {
  background-color: rgb(0, 0, 0) !important;
}
#index main {
  background-color: #f0f2f5;
}
#index aside header {
  font-size: 22px;
  line-height: 80px;
  color: #fff;
}
#index aside header i {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  line-height: 56px;
  text-align: center;
  font-size: 28px;
  color: #000;
  background-color: #c5dbe6;
  margin-right: 8px;
  vertical-align: middle;
}
#index aside i {
  color: #fff;
}
#index aside .el-menu-item {
  padding-left: 44px !important;
}
#index aside .el-submenu__title {
  padding-left: 44px !important;
}
#index aside .el-submenu .el-menu-item {
  padding-left: 66px !important;
}
#index aside .el-menu {
  border: 0;
}
#index .login-right {
  height: 80px;
  width: 240px;
  float: right;
  text-align: center;
}
#index .el-breadcrumb {
  line-height: 80px;
}
#index .login-right .user-icon {
  width: 80px;
  height: 80px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
}
#index .login-right .user-icon img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 10px;
}
</style>