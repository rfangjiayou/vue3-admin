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
import { ref } from 'vue'

export default {
  setup(props, ctx) {
    const isPlaying = ref(false)

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
  font-size: 16px;
  margin-top: 2px;
  cursor: pointer;
}
</style>
