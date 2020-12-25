<template>
  <IconSvg
    v-if="isFullscreen"
    iconName="unfullscreen"
    class="fullscreen-btn"
    @click="setFullscreen"
  />
  <IconSvg
    v-else
    iconName="fullscreen"
    class="fullscreen-btn"
    @click="setFullscreen"
  />
</template>

<script>
import { ref, inject } from 'vue'

export default {
  name: 'Fullscreen',
  setup(props, ctx) {
    const $player = inject('$player')
    const isFullscreen = ref($player.proxy.isFullscreen)
    const {
      setFullscreen
    } = useClick(ctx, isFullscreen)

    return {
      isFullscreen,
      setFullscreen
    }
  }
}

function useClick(ctx, isFullscreen) {
  const setFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
    ctx.emit('fullScreen', isFullscreen.value)
  }

  return {
    setFullscreen
  }
}
</script>

<style lang="scss" scoped>
.fullscreen-btn {
  font-size: 18px;
  cursor: pointer;
  margin-top: 2px;
}
</style>
