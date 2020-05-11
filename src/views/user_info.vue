<template>
  <div id="user-info">
    <div>
      <p>管理员信息</p>
      <p>
        管理员ID:
        <span>{{info.id}}</span>
      </p>
      <p>
        账号:
        <span>{{info.account}}</span>
      </p>
      <p>
        用户组:
        <span>{{info.userGroup}}</span>
      </p>
      <p>
        创建时间:
        <span>{{info.ctime}}</span>
      </p>
      <div class="user-img">
        管理员头像:
        <el-upload
          class="avatar-uploader img"
          action="http://m.zcblack.top/sell/goods.php?a=uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <img v-else src="../assets/logo.png" class="avatar" />
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: "",
      info: {}
    };
  },
  methods: {
    async userinfo() {
      let data = JSON.parse(sessionStorage.getItem("data"));
      let id = data.data.id;
      let d = await this.$axios.get("users.php?a=readOne&id=" + id);
      this.info = d.data.data;
    },
    async handleAvatarSuccess(res) {
      this.imageUrl = "http://m.zcblack.top/sell/" + res.data;
      let data = JSON.parse(sessionStorage.getItem("data"));
      let id = data.data.id;
      let obj = {
        id,
        imgUrl: this.imageUrl
      };
      let d = await this.$axios.post(
        "users.php?a=chgImg",
        this.$qs.stringify(obj)
      );
      if (d.data.code == 0) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        data.data.imgUrl = this.imageUrl;
        sessionStorage.setItem("data", JSON.stringify(data));
        history.go(0);
      } else {
        this.$message({
          message: "修改失败",
          type: "error"
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    let img = JSON.parse(sessionStorage.getItem("data")).data.imgUrl;
    this.userinfo();
    this.imageUrl = img;
  }
};
</script>
<style>
#user-info > div {
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-top: 0;
  padding-bottom: 0;
}
#user-info p {
  line-height: 70px;
  border-bottom: 1px solid #ddd;
  font-size: 20px;
}
#user-info .user-img {
  height: 160px;
  line-height: 160px;
}
#user-info .user-img .img {
  display: inline-block;
  width: 130px;
  height: 130px;
  text-align: center;
  line-height: 130px;
  vertical-align: middle;
  border: 1px dashed #d9d9d9;
  margin-left: 20px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-size: 28px;
  color: #8c939d;
}
#user-info .user-img .img img{
  width: 100%;
}
#user-info .user-img .img:hover {
  border-color: #409eff;
}
</style>