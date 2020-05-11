<template>
  <div id="accountlist">
    <el-header>账号列表</el-header>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="账号" width="155"></el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="255"></el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="255"></el-table-column>
      <el-table-column prop="imgUrl" label="头像" width="255">
        <template slot-scope="scope">
          <img
            v-if="scope.row.imgUrl"
            :src="scope.row.imgUrl"
            alt
            width="100"
            height="100"
            style="vertical-align:middle; border-radius:50%"
          />
          <img
            v-else
            src="../assets/logo.png"
            alt
            width="100"
            height="100"
            style="vertical-align:middle; border-radius:50%"
          />
        </template>
      </el-table-column>
      <el-table-column prop="handle" label="操作" width="255">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div class="bottom-btn">
      <el-button type="danger" @click="delall">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
    </div>
    <div
      id="userlist"
      style="width: 100%;height:600px;background-color:#fff;padding:30px;box-sizing:border-box;border-top:1px solid #ccc"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      total: 0,
      pagesizes: [10, 20, 30, 40],
      tableData: [],
      multipleSelection: [],
      arr: [
        { userGroup: "超级管理员", num: "0" },
        { userGroup: "部门管理员", num: "0" },
        { userGroup: "普通管理员", num: "0" }
      ]
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.userList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.userList();
    },
    handleEdit(index, row) {
      this.$router.push(`/index/admin_alter-user/${row.id}`);
    },
    handleDelete(index, row) {
      this.del(row.id);
    },
    userList() {
      let that = this;
      this.$axios
        .get(
          `users.php?a=list&currentPage=${this.currentPage}&pageSize=${this.pagesize}`
        )
        .then(data => {
          data = data.data;
          if (data.code == 0) {
            that.total = parseInt(data.total);
            that.tableData = data.data;
          }
        });
      this.getuserGroup();
    },
    del(id) {
      let that = this;
      let flag = confirm("确认删除吗?");
      if (flag) {
        this.$axios.get(`users.php?a=delete&id=${id}`).then(data => {
          if (data.data.code == 0) {
            that.$message({
              message: "删除成功",
              type: "success"
            });
            that.userList();
          }
        });
      }
    },
    delall() {
      let arr = this.multipleSelection;
      let id = [];
      for (let v in arr) {
        id.push(arr[v].id);
      }
      id = id.join(",");
      this.del(id);
    },
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("userlist"));
      let option = {
        title: {
          text: "账号用户组分布图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: ["超级管理员", "部门管理员", "普通管理员"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 110],
            center: ["25%", "50%"],
            roseType: "radius",
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { value: this.arr[0].num, name: "超级管理员" },
              { value: this.arr[1].num, name: "部门管理员" },
              { value: this.arr[2].num, name: "普通管理员" }
            ]
          },
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["75%", "50%"],
            roseType: "area",
            data: [
              { value: this.arr[0].num, name: "超级管理员" },
              { value: this.arr[1].num, name: "部门管理员" },
              { value: this.arr[2].num, name: "普通管理员" }
            ]
          }
        ]
      };
      myChart.setOption(option);
      option.title.left = "auto";
    },
    count() {
      return this.$axios.get("counter.php?a=users").then(data => {
        data = data.data.data;
        let d = [
          { userGroup: "超级管理员", num: "0" },
          { userGroup: "部门管理员", num: "0" },
          { userGroup: "普通管理员", num: "0" }
        ];
        for (let i in data) {
          if (data[i].userGroup == "超级管理员") {
            d[0] = data[i];
          }
          if (data[i].userGroup == "部门管理员") {
            d[1] = data[i];
          }
          if (data[i].userGroup == "普通管理员") {
            d[2] = data[i];
          }
        }
        for (let item in d) {
          this.arr[item] = d[item];
        }
      });
    },
    async getuserGroup() {
      await this.count();
      this.drawChart();
    }
  },
  mounted() {
    this.userList();
    this.drawChart();
  }
};
</script>
<style>
#accountlist {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#accountlist > header {
  line-height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #eff1f7;
}
#accountlist > .el-table {
  padding: 26px;
  padding-bottom: 0;
}
#accountlist > .el-table .cell {
  text-align: center;
}
#accountlist .el-pagination {
  line-height: 60px;
  height: 60px;
  vertical-align: middle;
  padding: 0;
  background-color: #fff;
  padding-left: 26px;
}
#accountlist .el-pagination li,
#accountlist .el-pagination span,
#accountlist .el-pagination button,
#accountlist .el-pager {
  vertical-align: middle;
}
#accountlist .el-table::before {
  height: 0;
}
#accountlist .bottom-btn {
  background-color: #fff;
  padding-left: 26px;
  line-height: 80px;
}
</style>