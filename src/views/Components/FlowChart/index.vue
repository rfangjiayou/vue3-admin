<template>
  <div class="flow-chart">
    <Left class="left" />
    <Right class="right" />
  </div>
</template>

<script>
import Left from './component/Left'
import Right from './component/Right'

export default {
  components: {
    Left,
    Right
  },
  setup() {

  }
}
</script>

<style lang="scss" scoped>
.flow-chart {
  padding: $base-padding;
  display: flex;
}
</style>
