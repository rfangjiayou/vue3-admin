<template>
  <!-- <i class="icon" :class="isFullscreen ? 'unscreenfull-icon' : 'screenfull-icon'" @click="toggle"></i> -->
  <IconSvg
    v-if="isFullscreen"
    :iconName="`unfullscreen`"
    class="icon"
    @click="toggle"
  />
  <IconSvg
    v-else
    :iconName="`fullscreen`"
    class="icon"
    @click="toggle"
  />
</template>

<script>
import screenfull from 'screenfull'
import { reactive, toRefs, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Screenfull',
  setup() {
    const state = reactive({
      isFullscreen: false
    })

    const {
      toggle,
      handleChange
    } = useChange(state)

    onMounted(() => {
      if (screenfull.isEnabled) {
        screenfull.on('change', handleChange)
      }
    })

    onUnmounted(() => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleChange)
      }
    })

    return {
      ...toRefs(state),
      toggle
    }
  }
}

const useChange = (state) => {
  const toggle = () => {
    if (!screenfull.isEnabled) {
      // this.$message({
      //   message: 'you browser can not work',
      //   type: 'warning'
      // })
      return false
    }
    screenfull.toggle()
  }
  const handleChange = () => {
    state.isFullscreen = screenfull.isFullscreen
  }

  return {
    toggle,
    handleChange
  }
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 22px;
  cursor: pointer;
  margin-top: 2px;
  &:hover {
    color: $base-color-default;
  }
}
</style>
