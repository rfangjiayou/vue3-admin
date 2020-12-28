<template>
  <span class="current-time">{{currentTime}} / {{durationTime}}</span>
</template>

<script>
import { computed, inject } from 'vue'
import { secondsToTime } from '@/utils'

export default {
  setup(props) {
    const $player = inject('$player')
    const currentTime = computed(() => $player.proxy.currentTime)
    const duration = computed(() => $player.proxy.duration)
    const durationTime = computed(() => secondsToTime(duration.value))

    return {
      currentTime,
      durationTime
    }
  }
}
</script>

<style lang="scss" scoped>
.current-time {
  margin-top: 2px;
}
</style>
