<template>
  <div id="home">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-tickets grid-content-one-i"></i>
          <span>总订单</span>
          <span>120,400</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-coin grid-content-two-i"></i>
          <span>总销售额</span>
          <span>120,400</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-document grid-content-three-i"></i>
          <span>今日订单数</span>
          <span>120,400</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-coin grid-content-four-i"></i>
          <span>今日销售额</span>
          <span>120,400</span>
        </div>
      </el-col>
    </el-row>
    <div
      id="home-main"
      style="width: 100%;height:500px; background-color:#fff;margin-top:60px;padding:20px;box-sizing:border-box"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      x: [1, 2, 3, 4, 5],
      user: [10, 10, 10, 10, 10],
      product: [10, 10, 10, 10, 10]
    };
  },
  name: "app",
  methods: {
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("home-main"));
      let option = {
        title: {
          text: "管理人员和商品总数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["商品总数", "管理人员"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.x
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "商品总数",
            type: "line",
            data: this.product
          },
          {
            name: "管理人员",
            type: "line",
            data: this.user
          }
        ]
      };
      myChart.setOption(option);
      option.title.left = "auto";
      option.grid.height = "auto";
    },
    async count() {
      let d1 = await this.$axios.get("counter.php?a=goods&field=date");
      let d2 = await this.$axios.get("counter.php?a=users&field=date");
      d1 = d1.data.data;
      d2 = d2.data.data;
      for (let i in d1) {
        this.x[i] = d1[i].ctime;
        this.product[i] = d1[i].num;
        this.user[i] = d2[i].num;
      }
      this.drawChart();
    }
  },
  mounted() {
    this.count();
    this.drawChart();
  }
};
</script>
<style>
#home.el-row {
  display: flex;
}
#home .grid-content {
  box-sizing: border-box;
  flex: 1;
  height: 138px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 24px 50px;
  justify-content: center;
}
#home .grid-content i {
  flex: 1;
  line-height: 90px;
  font-size: 84px;
}
#home .grid-content span {
  color: #333;
  line-height: 35px;
  font-size: 24px;
  text-align: center;
}
#home .grid-content span:nth-of-type(1) {
  color: #ccc;
}
#home .grid-content-one-i {
  color: #1296db;
}
#home .grid-content-two-i {
  color: #d4237a;
}
#home .grid-content-three-i {
  color: #1296db;
}
#home .grid-content-four-i {
  color: #1afa29;
}
</style>