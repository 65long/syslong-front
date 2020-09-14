<template>
  <div id="chart" ref="chart" />
</template>

<script>
import Echarts from 'echarts'
export default {
  name: 'Echart',
  props: {
    echartObj: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      myChart: {}
    }
  },

  mounted() {
    // const _this = this
    // window.onresize = function() {
    // _this.myChart.resize()
    // }
  },

  created() {
    this.$nextTick(() => {
      this.loadEchart()
    })
  },
  methods: {
    loadEchart() {
      this.myChart = Echarts.init(this.$refs.chart)
      this.myChart.setOption({
        title: {
          text: this.echartObj.title.text
        },
        tooltip: {},
        xAxis: {
          data: this.echartObj.xAxis.data
        },
        yAxis: {},
        series: this.echartObj.series
      })
    }
  }
}
</script>

<style scoped>
  #chart{
    width: 700px;
    height: 500px;
  }
</style>
