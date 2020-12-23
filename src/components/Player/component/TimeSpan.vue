<template>
  <span class="current-time">{{currentTime}}</span>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  setup(props) {
    const $player = inject('$player')
    const currentTime = computed(() => $player.ctx.currentTime)

    return {
      currentTime
    }
  }
}
</script>

<style lang="scss" scoped>
.current-time {
  margin-top: 2px;
}
</style>
