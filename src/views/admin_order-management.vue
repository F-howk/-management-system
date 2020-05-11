<template>
  <div id="order-management">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input v-model="form.id" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="form.user" placeholder="收货人"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.tel" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="form.status" placeholder="订单状态">
              <el-option label="状态一" value="shanghai"></el-option>
              <el-option label="状态二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择时间">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column fixed prop="id" label="订单号" width="130"></el-table-column>
          <el-table-column prop="time" label="下单时间" width="170"></el-table-column>
          <el-table-column prop="tel" label="手机号" width="150"></el-table-column>
          <el-table-column prop="name" label="收货人" width="120"></el-table-column>
          <el-table-column prop="address" label="配送地址" width="300"></el-table-column>
          <el-table-column prop="delivery_time" label="送达时间" width="170"></el-table-column>
          <el-table-column prop="remark" label="用户备注" width="170"></el-table-column>
          <el-table-column prop="money" label="订单金额" width="120"></el-table-column>
          <el-table-column prop="status" label="订单状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :page-size="10" layout="total, prev, pager, next, jumper" :total="400"></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<style>
#order-management .el-date-editor {
  width: 100%;
}
#order-management td,
#order-management th {
  text-align: center;
}
#order-management .el-pagination,
#order-management .el-pagination span,
#order-management .el-pagination button,
#order-management .el-pagination li,
#order-management .el-pagination i {
  line-height: 80px;
}
</style>
<script>
export default {
  data() {
    return {
      form: {
        id: "",
        user: "",
        tel: "",
        status: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      tableData: [
        {
          id: "2016-05-02",
          time: "王小虎",
          tel: "上海",
          name: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          delivery_time: 200333,
          remark: "123",
          money: "",
          status: ""
        },
        {
          id: "2016-05-02",
          time: "王小虎",
          tel: "上海1",
          name: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          delivery_time: 200333,
          remark: "123",
          money: "",
          status: ""
        },
        {
          id: "2016-05-02",
          time: "王小虎",
          tel: "上海",
          name: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          delivery_time: 200333,
          remark: "123",
          money: "",
          status: ""
        },
        {
          id: "2016-05-02",
          time: "王小虎",
          tel: "上海",
          name: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          delivery_time: 200333,
          remark: "123",
          money: "",
          status: ""
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
    },
    handleClick() {
      // console.log(row);
    }
  }
};
</script>