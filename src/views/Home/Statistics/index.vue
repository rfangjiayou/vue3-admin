<template>
  <div class="statistics">
    <section class="card">
      <el-row :gutter="20">
        <el-col
          v-for="item in cardList"
          :key="item.name"
          :xs="12"
          :sm="12"
          :md="12"
          :lg="6"
          :xl="6"
        >
          <el-card
            shadow="hover"
            class="card-item"
            :body-style="{ padding: '0px' }"
          >
            <template #header>
              <div class="clearfix">
                <span>{{item.label}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">查看趋势</el-button>
              </div>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </section>
    <section class="chart">
      <Chart :options="options"></Chart>
    </section>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      cardList: [
        {
          name: 'visit',
          label: '访问量',
          image: '',
          value: '123'
        },
        {
          name: 'author',
          label: '授权数',
          image: '',
          value: '123'
        },
        {
          name: 'message',
          label: '消息量',
          image: '',
          value: '123'
        },
        {
          name: 'shop',
          label: '购买量',
          image: '',
          value: '123'
        }
      ],
      options: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  .card {
    .card-item {
      margin-bottom: 20px;
      /deep/ .el-card__header {
        padding: 10px 18px;
      }
    }
  }
}
</style>
