<template>
  <IconSvg
    v-if="isPlaying"
    class="pause-btn"
    @click="pause"
    iconName="pause"
  />
  <IconSvg
    v-else
    class="play-btn"
    @click="play"
    iconName="play"
  />
</template>

<script>
import { ref, inject, watch, computed } from 'vue'

export default {
  setup(props, ctx) {
    const $player = inject('$player')
    const isPlaying = ref(false)

    watch(
      () => computed(() => $player.ctx.isPlaying),
      (val) => {
        isPlaying.value = val.value
      },
      {
        deep: true,
        immediate: true
      }
    )

    watch(
      () => computed(() => $player.ctx.ended),
      (val) => {
        if (val.value) {
          isPlaying.value = false
        }
      },
      {
        deep: true
      }
    )

    const {
      play,
      pause
    } = useClick(ctx, isPlaying)

    return {
      isPlaying,
      play,
      pause
    }
  }
}

function useClick(ctx, isPlaying) {
  const play = () => {
    isPlaying.value = true
    ctx.emit('play')
  }
  const pause = () => {
    isPlaying.value = false
    ctx.emit('pause')
  }

  return {
    play,
    pause
  }
}
</script>

<style lang="scss" scoped>
.pause-btn, .play-btn {
  font-size: 18px;
  margin-top: 2px;
  cursor: pointer;
  transition: none;
}
</style>
