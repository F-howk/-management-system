<template>
  <div id="product-statistics">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="时间范围">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div
      id="product"
      style="width: 100%;height:600px;background-color:#fff;padding:20px;box-sizing:border-box"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: [0, 0, 0],
      alldata: [20, 40, 23],
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
      value1: [new Date(2020, 10, 10, 10, 10), new Date(2020, 10, 11, 10, 10)],
      value2: ""
    };
  },
  name: "app",
  methods: {
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("product"));
      let option = {
        title: {
          text: "商品总量日期图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.time
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "总量",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: this.alldata
          }
        ]
      };
      myChart.setOption(option);
      option.title.left = "auto";
      option.grid.height = "auto";
    },
    onSubmit() {

    },
    async count() {
      let d = await this.$axios.get("counter.php?a=goods&field=date");
      d = d.data.data;
      for (let i in d) {
        this.time[i] = d[i].ctime;
        this.alldata[i] = d[i].num;
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
</style>