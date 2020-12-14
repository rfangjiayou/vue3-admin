<template>
  <i class="icon" :class="isFullscreen ? 'unscreenfull-icon' : 'screenfull-icon'" @click="toggle"></i>
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
  cursor: pointer;
  width: 22px;
  height: 22px;
  margin-top: 2px;
  &:hover {
    color: $base-color-default;
  }
}
.screenfull-icon {
  background: url("~@/assets/fullscreen.svg") center / cover no-repeat;
}
.unscreenfull-icon {
  background: url("~@/assets/unfullscreen.svg") center / cover no-repeat;
}
</style>
