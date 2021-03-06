<template>
  <div class="v-chart" ref="echart"></div>
</template>

<script>
import ECharts from 'echarts/lib/echarts'
import '@/plugins/echarts'
import { onMounted, onBeforeUnmount, toRefs, ref, watch, nextTick } from 'vue'
import { debounce } from 'lodash-es'
import { addListener, removeListener } from 'resize-detector'

export default {
  name: 'Chart',
  props: {
    options: {
      type: Object,
      require: true
    }
  },
  setup(props) {
    const { options } = toRefs(props)
    const echart = ref(null)
    const myChart = ref(null)

    watch(
      () => options,
      () => {
        nextTick(() => {
          myChart.value.setOption(options.value)
        })
      },
      {
        deep: true
      }
    )

    onMounted(() => {
      myChart.value = initChart(echart, options)
      addListener(echart.value, resizeHandler(myChart))
    })

    onBeforeUnmount(() => {
      removeListener(echart.value, resizeHandler)
    })

    return {
      echart,
      myChart
    }
  }
}

function initChart(echart, options) {
  const myChart = ECharts.init(echart.value)
  myChart.setOption(options.value)

  return myChart
}

function resizeHandler(myChart) {
  return debounce(() => {
    if (myChart.value) {
      myChart.value.resize()
    }
  }, 200)
}
</script>

<style lang="scss" scoped>
.v-chart {
  min-height: 400px;
  width: 100%;
  transition: none;
  * {
    transition: none;
  }
}
</style>
