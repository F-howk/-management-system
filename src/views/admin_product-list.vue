<template>
  <div id="product-list">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称:">
              <span>{{ props.row.goodsname }}</span>
            </el-form-item>
            <el-form-item label="商品 ID:">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品分类:">
              <span>{{ props.row.goodscategory }}</span>
            </el-form-item>
            <el-form-item label="商品特色:">
              <span>{{ props.row.goodsfeature }}</span>
            </el-form-item>
            <el-form-item label="商品描述:">
              <span>{{ props.row.goodsdesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id" width="100"></el-table-column>
      <el-table-column label="商品名称" prop="goodsname"></el-table-column>
      <el-table-column label="商品价格" prop="price" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.price}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="goodsdesc"></el-table-column>
      <el-table-column label="图片" prop="imgUrl">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt width="100" height="100" style="vertical-align:middle" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pagesize"
      :current-page="currentpage"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<style>
#product-list {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#product-list th,
#product-list td {
  text-align: center;
}
#product-list .el-pagination {
  line-height: 80px;
  background-color: #fff;
  padding-left: 14px;
}
#product-list .el-pagination,
#product-list .el-pagination span,
#product-list .el-pagination button,
#product-list .el-pagination li,
#product-list .el-pagination i {
  line-height: 80px;
}
</style>
<script>
export default {
  data() {
    return {
      pagesize: 10,
      currentpage: 1,
      total: 0,
      tableData: [
        {
          id: "12987122",
          goodsname: "好滋好味鸡蛋仔",
          goodscategory: "江浙小吃、小吃零食",
          goodsdesc: "荷兰优质淡奶，奶香浓而不腻"
        }
      ]
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentpage = val;
      this.goodslist();
    },
    handleEdit(index, row) {
      this.$router.push(`/index/admin_alter-product/${row.id}`);
    },
    handleDelete(index, row) {
      let id = row.id;
      let that = this;
      let flag = confirm("确认删除吗?");
      if (flag) {
        this.$axios.get(`goods.php?a=delete&id=${id}`).then(data => {
          if (data.data.code == 0) {
            that.$message({
              message: "删除成功",
              type: "success"
            });
            that.goodslist();
          }
        });
      }
    },
    goodslist() {
      this.$axios
        .get(
          `goods.php?a=list&currentPage=${this.currentpage}&pageSize=${this.pagesize}`
        )
        .then(data => {
          data = data.data;
          this.total = parseInt(data.total) || 0;
          this.tableData = data.data;
        });
    }
  },
  mounted() {
    this.goodslist();
  }
};
</script>