<template>
  <div class="statistics">
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
          class="card"
          :body-style="{ padding: '0px' }"
        >
          <template #header>
            <div class="clearfix">
              <i class="el-icon-info icon"></i>
              <span class="desc">{{item.desc}}</span>
              <el-button class="button" type="text">查看趋势</el-button>
            </div>
            <div class="clearfix bottom">
              <IconSvg
                :iconName="item.icon"
                :style="`color:${item.iconColor}`"
                class="icon-svg"
                :class="`${item.name}-label`"
              />
              <span class="bottom-right">
                <span class="label" :style="`background:${item.labelBg};color:${item.iconColor}`">{{item.label}}</span>
                <span class="card-value">{{item.value}}</span>
              </span>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
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
          label: '当日访问量',
          desc: '趋势仅展示最近一周的访问量',
          value: '123',
          icon: 'visit',
          iconColor: 'rgba(211, 33, 123, 1)',
          labelBg: 'rgba(211, 33, 123, .1)'
        },
        {
          name: 'author',
          label: '当日授权数',
          desc: '趋势仅展示最近一周的授权数',
          value: '123',
          icon: 'author',
          iconColor: 'rgba(10, 112, 255, 1)',
          labelBg: 'rgba(10, 112, 255, .1)'
        },
        {
          name: 'message',
          label: '当日消息量',
          desc: '趋势仅展示最近一周的消息量',
          value: '123',
          icon: 'message',
          iconColor: 'rgba(26, 199, 89, 1)',
          labelBg: 'rgba(26, 199, 89, .1)'
        },
        {
          name: 'shop',
          label: '当日购买量',
          desc: '趋势仅展示最近一周的购买量',
          value: '123',
          icon: 'shop',
          iconColor: 'rgba(254, 149, 0, 1)',
          labelBg: 'rgba(254, 149, 0, .1)'
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
    background: $base-color-white;
    margin-bottom: 20px;
    /deep/ .el-card__header {
      padding: 10px 18px;
    }
    .icon {
      color: $base-color-yellow;
      margin-right: 2px;
    }
    .button {
      float: right;
      padding: 3px 0;
      font-size: $base-font-size-small;
    }
    .bottom {
      margin-top: 20px;
    }
    .desc {
      font-size: $base-font-size-small;
      color: $base-color-gray;
    }
    .icon-svg {
      font-size: $base-font-size-big * 3;
      padding: 5px;
      border-radius: 8px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .bottom-right {
      float: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .label {
      font-size: $base-font-size-small;
      padding: 2px 5px;
    }
    &-value {
      font-size: $base-font-size-max;
      line-height: 40px;
    }
    &:hover {
      transform: translateY(-3px);
      .icon-svg {
        color: $base-color-white !important;
      }
      .visit-label {
        background-color: rgba(211, 33, 123, 1);
      }
      .author-label {
        background-color: rgba(10, 112, 255, 1);
      }
      .message-label {
        background-color: rgba(26, 199, 89, 1);
      }
      .shop-label {
        background-color: rgba(254, 149, 0, 1);
      }
    }
  }
  .chart {
    background: $base-color-white;
  }
}
</style>
