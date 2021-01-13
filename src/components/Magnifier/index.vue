<template>
  <div class="magnifier">
    <div
      class="magnifier__inner"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <img :class="`img-${uid}`" :src="url" alt="" @load="imgLoaded" crossorigin="anonymous">
      <div
        v-show="cursorEnter && loadCompleted"
        :class="[
          'img-zoom',
          `img-zoom-${uid}`,
          type === 'circle' && 'circle'
        ]"
        :style="[
          zoomSize,
          zoomPosition,
          zoomBgUrl,
          zoomBgSize,
          zoomBgPosition
        ]"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, reactive, toRefs } from 'vue'

export default {
  name: 'Magnifier',
  props: {
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'rect'
    },
    zoomWidth: {
      type: Number,
      default: 150
    },
    zoomHeight: {
      type: Number,
      default: 150
    },
    scale: {
      type: Number,
      default: 2
    }
  },
  setup(props) {
    const instance = getCurrentInstance()
    const { zoomWidth, zoomHeight, url, scale } = toRefs(props)
    const state = reactive({
      uid: instance.uid,
      loadCompleted: false,
      cursorEnter: false,
      imgInfo: {
        width: 0,
        height: 0
      },
      zoomerBgRect: { // 背景位置
        top: 0,
        left: 0
      },
      zoomSize: computed(() => {
        return {
          width: `${zoomWidth.value}px`,
          height: `${zoomHeight.value}px`
        }
      }),
      zoomPosition: {
        left: 0,
        top: 0,
        transform: 'translate(-50%, -50%)'
      },
      zoomBgSize: computed(() => {
        return {
          backgroundSize: `${state.imgInfo.width * scale.value}px ${state.imgInfo.height * scale.value}px`
        }
      }),
      zoomBgUrl: computed(() => {
        return {
          backgroundImage: `url(${url.value})`
        }
      }),
      zoomBgPosition: computed(() => {
        return {
          backgroundPosition: `${state.zoomerBgRect.left}px ${state.zoomerBgRect.top}px`
        }
      })
    })

    const imgLoaded = (e) => {
      state.imgInfo.width = e.target.clientWidth
      state.imgInfo.height = e.target.clientHeight
      state.loadCompleted = true
    }

    const {
      handleMouseEnter,
      handleMouseLeave,
      handleMouseMove
    } = useEvents(state, props)

    return {
      ...toRefs(state),
      imgLoaded,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseMove
    }
  }
}

function useEvents(state, props) {
  const handleMouseEnter = () => {
    state.cursorEnter = true
  }
  const handleMouseLeave = () => {
    state.cursorEnter = false
  }
  const handleMouseMove = (e) => {
    if (state.loadCompleted && state.cursorEnter) {
      const { zoomWidth, zoomHeight, scale } = toRefs(props)

      const img = document.querySelector(`.magnifier .img-${state.uid}`)
      const imgWidth = img.width
      const imgHeight = img.height
      const { clientX, clientY } = e
      let left = clientX - img.x
      let top = clientY - img.y

      // 鼠标相对于背景的位置
      let zoomX = left * scale.value
      let zoomY = top * scale.value

      const minLeft = zoomWidth.value / 2
      const maxLeft = imgWidth - zoomWidth.value / 2
      const minTop = zoomHeight.value / 2
      const maxTop = imgHeight - zoomHeight.value / 2
      if (left < minLeft) {
        left = minLeft
      } else if (left > maxLeft) {
        left = maxLeft
      }
      if (top < minTop) {
        top = minTop
      } else if (top > maxTop) {
        top = maxTop
      }

      const maxZoomX = left * scale.value + zoomWidth.value / 2
      const minZoomX = left * scale.value - zoomWidth.value / 2
      const maxZoomY = top * scale.value + zoomHeight.value / 2
      const minZoomY = top * scale.value - zoomHeight.value / 2
      if (zoomX > maxZoomX) {
        zoomX = maxZoomX
      } else if (zoomX < minZoomX) {
        zoomX = minZoomX
      }
      if (zoomY > maxZoomY) {
        zoomY = maxZoomY
      } else if (zoomY < minZoomY) {
        zoomY = minZoomY
      }

      state.zoomPosition.left = `${left}px`
      state.zoomPosition.top = `${top}px`
      state.zoomerBgRect.left = -zoomX + zoomWidth.value / 2
      state.zoomerBgRect.top = -zoomY + zoomHeight.value / 2
    }
  }

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove
  }
}
</script>

<style lang="scss" scoped>
.magnifier {
  position: relative;
  .img-zoom {
    position: absolute;
    cursor: crosshair;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    z-index: 1;
    transition: none;
  }
  .circle {
    border-radius: 50%;
  }
}
</style>
