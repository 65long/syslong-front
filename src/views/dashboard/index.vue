<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-row :gutter="50">
      <el-col :span="24">
        <el-card class="box-card-dashboard">
          <EChart :echart-obj="dynamicState" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>视图名称1</span>
            <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
          </div>
          <EChart :echart-obj="barEchart" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button style="float: right; padding: 3px 0" type="text" @click="updateBarData">刷新</el-button>
          </div>
          <EChart :echart-obj="lineEchart" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
          </div>
          <EChart :echart-obj="pieEchart" />
        </el-card>
      </el-col>
      <!--<el-col :span="6"><div class="grid-content bg-purple" /></el-col>-->
      <!--<el-col :span="6"><div class="grid-content bg-purple" /></el-col>-->
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EChart from '@/components/echart/echart'
import { getBarData, getSysInfo } from '@/api/dashboard'
import ResizeMixin from '@/layout/mixin/ResizeHandler'

export default {
  name: 'Dashboard',
  components: {
    EChart
  },
  mixins: [ResizeMixin],
  data() {
    return {
      barEchart: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      },
      lineEchart: {
        title: {
          text: '销量折线图'
        },
        tooltip: {},
        legend: {
          // 这个data是标签列表
          data: []
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          // {
          //   name: '销量', 该线图或者折线图的名称
          //   data: [],  数据列表
          //   type: 'line',  数据类型
          //   smooth: true  平滑型
          // }
        ]
      },
      pieEchart: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      },
      dynamicState: {
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'CPU使用率',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 100,
            splitNumber: 10,
            radius: '50%',
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: { // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              backgroundColor: 'auto',
              borderRadius: 2,
              color: '#eee',
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: '#222'
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic'
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              formatter: function(value) {
                value = (value + '').split('.')
                value.length < 2 && (value.push('00'))
                return ('00' + value[0]).slice(-2) +
                    '.' + (value[1] + '00').slice(0, 2)
              },
              fontWeight: 'bolder',
              borderRadius: 3,
              backgroundColor: '#444',
              borderColor: '#aaa',
              shadowBlur: 5,
              shadowColor: '#333',
              shadowOffsetX: 0,
              shadowOffsetY: 3,
              borderWidth: 2,
              textBorderColor: '#000',
              textBorderWidth: 2,
              textShadowBlur: 2,
              textShadowColor: '#fff',
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              fontFamily: 'Arial',
              width: 100,
              color: '#eee',
              rich: {}
            },
            data: [{ value: 0, name: 'CPU使用率' }]
          },
          {
            name: '内存使用率',
            type: 'gauge',
            center: ['20%', '55%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 100,
            endAngle: 45,
            splitNumber: 10,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: { // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, '-30%'] // x, y，单位px
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder'
            },
            data: [{ value: 0, name: '内存使用率' }]
          },
          {
            name: '硬盘使用率',
            type: 'gauge',
            center: ['80%', '55%'], // 默认全局居中
            radius: '40%',
            min: 0,
            max: 100,
            endAngle: 0,
            startAngle: 180,
            splitNumber: 10,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: { // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, '-30%'] // x, y，单位px
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder'
            },
            data: [{ value: 0, name: '硬盘使用率' }]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.timer = setInterval(this.get_sys_info, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    get_sys_info() {
      // 获取后台服务器使用情况
      getSysInfo()
        .then(res => {
          this.dynamicState.series[0].data[0].value = res.cpu_usage
          this.dynamicState.series[1].data[0].value = res.memory_usage
          this.dynamicState.series[2].data[0].value = res.disk_usage
        })
        .catch(err => {
          this.$notify.warning({
            title: '失败',
            message: '获取服务器运行信息错误' + err.message
          })
        })
    },
    updateBarData() {
      this.getBarData_()
    },
    getBarData_() {
      // request.get('/rbac/permslist/')
      getBarData()
        .then(res => {
          var series = { data: [], name: '销量', smooth: true, type: 'line' }
          var x_data = []
          res.forEach(perm => {
            series.data.push(Math.floor(Math.random() * 1000))
            x_data.push(perm.name)
          })
          this.lineEchart.series = series
          this.lineEchart.xAxis.data = x_data
        })
        .catch(err => {
          this.$notify.error({ 'message': '获取数据失败---' + err.message, 'title': '错误' })
        })
    }
  }

}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .box-card {
    height: 300px;
  }

  .box-card-dashboard {
    height: 600px;
  }
</style>
