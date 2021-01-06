<template>
  <div
    :class="[
      'verify',
      visible && 'visible'
    ]"
    @mousedown="onCloseMouseDown"
  >
    <div class="verify-box" @mousedown.stop>
      <div
        class="verify-box-body"
        :style="`height: ${ canvasHeight }px;width: ${ canvasWidth }px`"
      >
        <!-- 主图，有缺口 -->
        <canvas
          ref="canvasMain"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
        />
         <!-- 成功后显示的完整图 -->
        <canvas
          ref="canvasSuccess"
          :class="['canvas-success', { show: isSuccess }]"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
        />
      </div>
      <div class="verify-box-ctrl">
        <div
          class="range-box"
          :style="`height:${ sliderBaseSize }px`"
        >
          <div class="range-text">{{ sliderText }}</div>
          <div
            class="range-slider"
            ref="rangeSlider"
            :style="`width:${ styleWidth }px`"
          >
            <div
              :class="['range-btn', { isDown: mouseDown }]"
              :style="`width:${sliderBaseSize}px`"
              @mousedown="onRangeMouseDown($event)"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
export default {
  name: 'Verify',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    canvasWidth: {
      type: Number,
      default: 310
    },
    canvasHeight: {
      type: Number,
      default: 160
    },
    sliderSize: { // 滑块大小
      type: Number,
      default: 50
    },
    sliderText: {
      type: String,
      default: '拖动滑块完成拼图'
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const {
      canvasWidth,
      sliderSize
    } = toRefs(props)
    const state = reactive({
      canvasMain: null,
      canvasSuccess: null,
      rangeSlider: null,
      timer: null,
      mouseDown: false, // 鼠标是否在按钮上按下
      startWidth: 50, // 鼠标点下去时父级的width
      startX: 0, // 鼠标按下时的X
      newX: 0, // 鼠标当前的偏移X
      pinX: 0, // 拼图的起始X
      pinY: 0, // 拼图的起始Y
      isSuccess: false, // 验证成功
      isCanSlide: true // 是否可以拉动滑动条
    })

    // styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
    const styleWidth = computed(() => {
      const w = state.startWidth + state.newX - state.startX
      return w < sliderBaseSize.value ? sliderBaseSize.value
        : w > canvasWidth.value ? canvasWidth.value : w
    })
    const sliderBaseSize = computed(() => {
      return Math.max(
        Math.min(
          Math.round(sliderSize.value),
          Math.round(canvasWidth.value * 0.5)
        ),
        10
      )
    })

    const {
      onCloseMouseDown,
      onRangeMouseDown,
      onRangeMouseMove,
      onRangeMouseUp
    } = useMouseEvent(state, emit, props, sliderBaseSize)

    onMounted(() => {
      document.addEventListener('mousemove', onRangeMouseMove, false)
      document.addEventListener('mouseup', onRangeMouseUp, false)
      reset(state, emit, props, sliderBaseSize)
    })

    onBeforeUnmount(() => {
      clearTimeout(state.timer1)
      document.removeEventListener('mousemove', onRangeMouseMove, false)
      document.removeEventListener('mouseup', onRangeMouseUp, false)
    })

    return {
      ...toRefs(state),
      sliderBaseSize,
      styleWidth,
      onCloseMouseDown,
      onRangeMouseDown
    }
  }
}

function init(state, emit, props) {
  state.isCanSlide = false
  const {
    canvasWidth,
    canvasHeight
  } = toRefs(props)
  const {
    canvasMain,
    canvasSuccess
  } = state
  const ctxMain = canvasMain.getContext('2d')
  const ctxSuccess = canvasSuccess.getContext('2d')
  const img = document.createElement('img')
  ctxMain.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  ctxSuccess.clearRect(0, 0, canvasWidth.value, canvasHeight.value)

  img.onload = () => {
    const [x, y, w, h] = makeImgSize(img, canvasWidth, canvasHeight)
    ctxMain.drawImage(img, x, y, w, h)

    state.isCanSlide = true
  }

  img.src = makeImgWithCanvas()
}

// 设置图片尺寸cover方式贴合canvas尺寸 w/h
function makeImgSize(img, canvasWidth, canvasHeight) {
  const imgScale = img.width / img.height
  const canvasScale = canvasWidth.value / canvasHeight.value
  let x = 0
  let y = 0
  let w = 0
  let h = 0
  if (imgScale > canvasScale) {
    h = canvasHeight.value
    w = imgScale * h
    y = 0
    x = (canvasWidth.value - w) / 2
  } else {
    w = canvasWidth.value
    h = w / imgScale
    x = 0
    y = (canvasHeight.value - h) / 2
  }
  return [x, y, w, h]
}

// 用canvas随机生成图片
function makeImgWithCanvas() {

}

function useMouseEvent(state, emit, props, sliderBaseSize) {
  const onCloseMouseDown = () => {
    emit('update:visible', false)
  }
  // 鼠标按下准备拖动
  const onRangeMouseDown = (e) => {
    if (state.isCanSlide) {
      state.mouseDown = true
      state.startWidth = state.rangeSlider.clientWidth
      state.newX = e.clientX
      state.startX = e.clientX
    }
  }
  // 鼠标移动
  const onRangeMouseMove = (e) => {
    if (state.mouseDown) {
      e.preventDefault()
      state.newX = e.clientX
    }
  }
  // 鼠标抬起
  const onRangeMouseUp = () => {
    if (state.mouseDown) {
      state.mouseDown = false
      submit(state, emit, props, sliderBaseSize)
    }
  }

  return {
    onCloseMouseDown,
    onRangeMouseDown,
    onRangeMouseMove,
    onRangeMouseUp
  }
}

// 开始判定
function submit(state, emit, props, sliderBaseSize) {
  state.timer = setTimeout(() => {
    reset(state, emit, props, sliderBaseSize)
  }, 800)
}
// 重置
function reset(state, emit, props, sliderBaseSize) {
  state.isCanSlide = true
  state.isSuccess = false
  state.startWidth = sliderBaseSize.value // 鼠标点下去时父级的width
  state.startX = 0 // 鼠标按下时的X
  state.newX = 0 // 鼠标当前的偏移X
  init(state, emit, props)
}
</script>

<style lang="scss" scoped>
.verify {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  &-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: $base-padding;
    border-radius: $base-border-radius;
    background: $base-color-white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    user-select: none;
    &-body {
      position: relative;
      overflow: hidden;
      border-radius: $base-border-radius;
      margin-bottom: 20px;
      .canvas-success {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 600ms;
        z-index: 3;
        &.show {
          opacity: 1;
        }
      }
    }
    &-ctrl {
      transition: none;
      * {
        transition: none;
      }
      .range-box {
        position: relative;
        width: 100%;
        background-color: #eef1f8;
        border-radius: $base-border-radius;
        box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
        .range-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #b7bcd1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          width: 100%;
        }
        .range-slider {
          position: absolute;
          height: 100%;
          width: 50px;
          background-color: rgba(106, 160, 255, 0.8);
          border-radius: $base-border-radius;
          .range-btn {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 0;
            width: 50px;
            height: 100%;
            background-color: $base-color-white;
            border-radius: 3px;
            box-shadow: 0 0 4px $base-color-gray;
            cursor: pointer;
            & > div {
              width: 0;
              height: 40%;
              transition: all 200ms;
              &:nth-child(2) {
                margin: 0 4px;
              }
              border: 1px solid $base-color-default;
            }
            &:hover,
            .isDown {
              & > div:first-child {
                border: 4px solid transparent;
                height: 0;
                border-right-color: $base-color-default;
              }
              & > div:nth-child(2) {
                border-width: 4px;
                height: 0;
                border-radius: $base-border-radius;
                margin: 0 6px;
                border-right-color: $base-color-default;
              }
              & > div:nth-child(3) {
                border: 4px solid transparent;
                height: 0;
                border-left-color: $base-color-default;
              }
            }
          }
        }
      }
    }
  }
}
.visible {
  opacity: 1;
  pointer-events: auto;
}
</style>
