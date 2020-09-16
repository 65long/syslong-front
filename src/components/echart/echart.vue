<template>
  <div id="chart" ref="chart" :style="sizeObj" />
</template>

<script>
import Echarts from 'echarts'

export default {
  name: 'Echart',
  props: {
    echartObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    sizeObj: {
      type: String,
      default: function() {
        return 'width: 400px;height:300px;'
      }
    }
  },
  data() {
    return {
      myChart: {}
    }
  },
  watch: {
    echartObj: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          this.myChart.setOption(newVal)
        }
      },
      deep: true
    }
  },

  mounted() {
    const _this = this
    window.resize = function() {
      _this.myChart.resize()
    }
  },

  created() {
    this.$nextTick(() => {
      this.loadEchart()
    })
  },
  methods: {
    loadEchart() {
      this.myChart = Echarts.init(this.$refs.chart)
      // { 直接传父组件的对象过来初始化
      //   title: {
      //     text: this.echartObj.title.text
      //   },
      //   legend: {
      //     data: this.echartObj.legend.data
      //   },
      //   tooltip: {},
      //   xAxis: {
      //     data: this.echartObj.xAxis.data
      //   },
      //   yAxis: {},
      //   series: this.echartObj.series
      // }
      this.myChart.setOption(this.echartObj)
    }
  }
}
</script>

<style scoped>
  /*#chart{*/
  /*width: 400px;*/
  /*height: 300px;*/
  /*}*/
</style>
