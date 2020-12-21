<template>
  <el-row :gutter="20" class="account">
    <el-col
      v-for="item in cardList"
      :key="item.name"
      :xs="24"
      :sm="24"
      :md="24"
      :lg="24"
      :xl="8"
    >
      <el-card
        shadow="none"
        class="card"
        :body-style="{ padding: '0px' }"
      >
        <Chart :options="item.options"></Chart>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      cardList: [
        {
          name: 'hardware',
          options: {
            legend: {
              bottom: '8%',
              itemGap: 50,
              data: ['WAF-01', 'WAF-02', 'WAF-03']
            },
            tooltip: {
              // trigger: 'axis'
            },
            color: ['#40c9c6', 'rgb(179, 127, 235)', '#36a3f7'],
            radar: {
              indicator: [
                { text: '流量', max: 100 },
                { text: '吞吐量', max: 100 },
                { text: '系统', max: 100 },
                { text: '性能', max: 100 },
                { text: '屏幕', max: 100 }
              ],
              radius: '60%',
              center: ['50%', '45%']
            },
            series: [
              {
                type: 'radar',
                symbol: 'none',
                itemStyle: {
                  borderWidth: 0
                },
                areaStyle: {
                  opacity: 0.8
                },
                data: [
                  {
                    value: [65, 60, 80, 60, 50],
                    name: 'WAF-01'
                  },
                  {
                    value: [75, 60, 50, 68, 65],
                    name: 'WAF-02'
                  },
                  {
                    value: [60, 70, 65, 50, 67],
                    name: 'WAF-03'
                  }
                ]
              }
            ]
          }
        },
        {
          name: 'share',
          options: {
            legend: {
              bottom: '8%'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                name: 'Way Of Share',
                type: 'pie',
                radius: ['10%', '60%'],
                center: ['50%', '45%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 2
                },
                data: [
                  { value: 400, name: 'Facebook' },
                  { value: 380, name: 'Twitter' },
                  { value: 320, name: 'Message' },
                  { value: 200, name: 'WhatsApp' },
                  { value: 120, name: 'WeChat' }
                ]
              }
            ]
          }
        },
        {
          name: 'monitor',
          options: {
            tooltip: {
              trigger: 'axis',
              axisPointer: { // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
              }
            },
            legend: {
              bottom: '8%',
              itemGap: 50,
              data: ['Direct', 'Mail Ad', 'Affiliate Ad']
            },
            color: ['#40c9c6', 'rgb(179, 127, 235)', '#36a3f7'],
            grid: {
              left: '5%',
              right: '5%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Direct',
                type: 'bar',
                stack: 'total',
                data: [320, 302, 301, 334, 390, 330, 320]
              },
              {
                name: 'Mail Ad',
                type: 'bar',
                stack: 'total',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: 'Affiliate Ad',
                type: 'bar',
                stack: 'total',
                data: [220, 182, 191, 234, 290, 330, 310]
              }
            ]
          }
        }
      ]
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.account {
  margin-top: 20px;
  .card {
    background: $base-color-white;
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
