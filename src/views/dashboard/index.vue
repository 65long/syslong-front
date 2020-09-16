<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
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
import { getBarData } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: {
    EChart
  },
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {

  },
  methods: {
    updateBarData() {
      this.getBarData_()
    },
    getBarData_() {
      // request.get('/rbac/permslist/')
      getBarData()
        .then(res => {
          this.$message.success('获取数据成功')
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
          this.$message.error('获取数据失败---' + err.message)
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
    width: 450px;
  }
</style>
