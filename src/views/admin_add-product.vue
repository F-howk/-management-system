<template>
  <div id="add-product">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <div>
        <el-form label-width="80px">
          <el-form-item label="商品名称" style="width:480px">
            <el-input v-model="product.goodsname"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="product.goodscategory" placeholder="请选择商品分类">
              <el-option label="速食" value="速食"></el-option>
              <el-option label="冷冻" value="冷冻"></el-option>
              <el-option label="水果" value="水果"></el-option>
              <el-option label="糕点" value="糕点"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品特色">
            <el-checkbox-group v-model="product.goodsfeature">
              <el-checkbox label="新品上市" name="type"></el-checkbox>
              <el-checkbox label="第二单半价" name="type"></el-checkbox>
              <el-checkbox label="主打产品" name="type"></el-checkbox>
              <el-checkbox label="火爆产品" name="type"></el-checkbox>
              <el-checkbox label="祖传手艺" name="type"></el-checkbox>
              <el-checkbox label="源自四川" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              action="http://m.zcblack.top/sell/goods.php?a=uploadImg"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="product.dialogVisible">
              <img width="100%" :src="product.dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio v-model="product.isPromotion" label="1">促销</el-radio>
            <el-radio v-model="product.isPromotion" label="2">不促销</el-radio>
          </el-form-item>
          <el-form-item label="食品规格">
            <el-radio v-model="product.standard" label="1">单规格</el-radio>
            <el-radio v-model="product.standard" label="2">多规格</el-radio>
          </el-form-item>
          <el-form-item label="包装费">
            <el-input-number
              v-model="product.packprice"
              @change="handleChange"
              :min="0"
              :max="10"
              label="包装费"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number
              v-model="product.price"
              @change="handleChange"
              :min="0"
              :step="1"
              :max="200"
              label="价格"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="product.goodsdesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即添加</el-button>
            <el-button @click="cancel">取消</el-button>
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
      product: {
        goodscategory: "",
        goodsfeature: [],
        dialogImageUrl: "",
        dialogVisible: false,
        isPromotion: "1",
        standard: "1",
        packprice: 1,
        price: 20,
        goodsdesc: "",
        goodsname: ""
      }
    };
  },
  methods: {
    handleRemove() {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.product.dialogImageUrl = "http://m.zcblack.top/sell/"+file.response.data;
      this.product.dialogVisible = true;
    },
    handleChange() {
      // console.log(value);
    },
    onSubmit() {
      let data = this.product;
      let that = this;
      this.$axios
        .post(
          "goods.php?a=add",
          `goodsname=${data.goodsname}&goodscategory=${data.goodscategory}&goodsfeature=${data.goodsfeature}&imgUrl=${data.dialogImageUrl}
        &isPromotion=${data.isPromotion}&standard=${data.standard}&packprice=${data.packprice}&price=${data.price}&goodsdesc=${data.goodsdesc}
      `
        )
        .then(data => {
          if (data.data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            that.$router.push('/index/admin_product-list');
          } else if (data.data.code == 1) {
            this.$message({
              message: "添加失败",
              type: "error"
            });
          } else {
            this.$message({
              message: "请填写完整",
              type: "warning"
            });
          }
        });
    },
    cancel(){
        this.product = {
        goodscategory: "",
        goodsfeature: [],
        imgUrl: "",
        dialogVisible: false,
        isPromotion: "1",
        standard: "1",
        packprice: 1,
        price: 20,
        goodsdesc: "",
        goodsname: ""
      }
    }
  }
};
</script>
<style>
#add-product .el-card__header span {
  color: #333;
  font-size: 20px;
}
#add-product .el-form-item__content {
  width: 500px;
}
</style>