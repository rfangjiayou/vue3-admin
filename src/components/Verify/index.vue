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
        v-loading="loading"
        class="verify-box-body"
        :style="`height: ${ canvasHeight }px;width: ${ canvasWidth }px`"
      >
        <div ></div>
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
        <!-- 小图 -->
        <canvas
          :width="puzzleBaseSize"
          class="canvas-pic"
          :height="canvasHeight"
          ref="canvasPic"
          :style="
            `width:${puzzleBaseSize}px;height:${canvasHeight}px;transform:translateX(${styleWidth - sliderBaseSize -
              (puzzleBaseSize - sliderBaseSize) * ((styleWidth - sliderBaseSize) / (canvasWidth - sliderBaseSize))}px)`"
        />
        <div class="reset-btn" @click="handleClick">
          <IconSvg
            iconName="reset"
            class="icon"
          />
        </div>
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
import { computed, reactive, toRefs, onMounted, onBeforeUnmount, watch, getCurrentInstance } from 'vue'
import { getRandom } from '@/utils'

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
    range: { // 允许的偏差值
      type: Number,
      default: 10
    },
    puzzleScale: { // 拼图块的大小缩放比例
      type: Number,
      default: 1
    },
    sliderSize: { // 滑块大小
      type: Number,
      default: 40
    },
    sliderText: {
      type: String,
      default: '拖动滑块完成拼图'
    },
    // 所有的背景图片
    imgs: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:visible', 'success', 'fail'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const {
      visible,
      canvasWidth,
      puzzleScale,
      sliderSize
    } = toRefs(props)
    const state = reactive({
      canvasMain: null,
      canvasSuccess: null,
      canvasPic: null,
      rangeSlider: null,
      timer: null,
      loading: false,
      withCanvas: false, // 是否使用canvas随机作图
      mouseDown: false, // 鼠标是否在按钮上按下
      startWidth: 50, // 鼠标点下去时父级的width
      startX: 0, // 鼠标按下时的X
      newX: 0, // 鼠标当前的偏移X
      pinX: 0, // 拼图的起始X
      pinY: 0, // 拼图的起始Y
      isSuccess: false, // 验证成功
      isCanSlide: true, // 是否可以拉动滑动条
      imgIndex: -1 // 用于自定义图片时不会随机到重复的图片
    })

    // styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
    const styleWidth = computed(() => {
      const w = state.startWidth + state.newX - state.startX
      return w < sliderBaseSize.value ? sliderBaseSize.value
        : w > canvasWidth.value ? canvasWidth.value : w
    })
    // 图中拼图块的60 * 用户设定的缩放比例计算之后的值 0.2~2
    const puzzleBaseSize = computed(() => {
      return Math.round(
        Math.max(Math.min(puzzleScale.value, 2), 0.2) * 52.5 + 6
      )
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

    watch(
      () => visible,
      (val) => {
        if (val.value) {
          reset(state, emit, props, sliderBaseSize, puzzleBaseSize)
        }
      },
      {
        deep: true
      }
    )

    const {
      onCloseMouseDown,
      onRangeMouseDown,
      onRangeMouseMove,
      onRangeMouseUp
    } = useMouseEvent(state, emit, props, instance, styleWidth, sliderBaseSize, puzzleBaseSize)

    const handleClick = () => {
      reset(state, emit, props, sliderBaseSize, puzzleBaseSize)
    }

    onMounted(() => {
      document.addEventListener('mousemove', onRangeMouseMove, false)
      document.addEventListener('mouseup', onRangeMouseUp, false)
      // reset(state, emit, props, sliderBaseSize, puzzleBaseSize)
    })

    onBeforeUnmount(() => {
      clearTimeout(state.timer)
      document.removeEventListener('mousemove', onRangeMouseMove, false)
      document.removeEventListener('mouseup', onRangeMouseUp, false)
    })

    return {
      ...toRefs(state),
      puzzleBaseSize,
      sliderBaseSize,
      styleWidth,
      onCloseMouseDown,
      onRangeMouseDown,
      handleClick
    }
  }
}

function init(state, emit, props, puzzleBaseSize) {
  state.isCanSlide = false
  state.loading = true
  const {
    imgs,
    puzzleScale,
    canvasWidth,
    canvasHeight
  } = toRefs(props)
  const {
    canvasMain,
    canvasSuccess,
    canvasPic
  } = state
  const ctxMain = canvasMain.getContext('2d')
  const ctxSuccess = canvasSuccess.getContext('2d')
  const ctxPic = canvasPic.getContext('2d')
  const img = document.createElement('img')
  ctxMain.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  ctxSuccess.clearRect(0, 0, canvasWidth.value, canvasHeight.value)

  // 取一个随机坐标，作为拼图块的位置
  state.pinX = getRandom(
    puzzleBaseSize.value,
    canvasWidth.value - puzzleBaseSize.value - 20
  ) // 留20的边距
  state.pinY = getRandom(
    20,
    canvasHeight.value - puzzleBaseSize.value - 20
  ) // 主图高度 - 拼图块自身高度 - 20边距
  img.crossOrigin = 'anonymous' // 匿名，想要获取跨域的图片
  img.onload = () => {
    const [x, y, w, h] = makeImgSize(img, canvasWidth, canvasHeight)
    ctxMain.save()
    // 画小图
    paintBrick(ctxMain, state, puzzleScale)
    ctxMain.closePath()
    if (
      !(
        navigator.userAgent.indexOf('Firefox') >= 0 &&
            navigator.userAgent.indexOf('Windows') >= 0
      )
    ) {
      // 非火狐，在此画外阴影
      ctxMain.shadowOffsetX = 0
      ctxMain.shadowOffsetY = 0
      ctxMain.shadowColor = '#000'
      ctxMain.shadowBlur = 3
      ctxMain.fill()
    }

    // 按照外阴影区域切割,一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）
    ctxMain.clip()

    ctxMain.save()

    // 小图外阴影
    ctxMain.shadowOffsetX = 0
    ctxMain.shadowOffsetY = 0
    ctxMain.shadowColor = '#000'
    ctxMain.shadowBlur = 2
    ctxMain.fill()
    ctxMain.restore()
    ctxMain.drawImage(img, x, y, w, h)
    ctxSuccess.drawImage(img, x, y, w, h)

    // 设置小图的内阴影,
    // source-atop:在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。
    ctxMain.globalCompositeOperation = 'source-atop'
    paintBrick(ctxMain, state, puzzleScale)

    ctxMain.arc(
      state.pinX + Math.ceil(puzzleBaseSize.value / 2),
      state.pinY + Math.ceil(puzzleBaseSize.value / 2),
      puzzleBaseSize.value * 1.2,
      0,
      Math.PI * 2,
      true
    )
    ctxMain.closePath()
    ctxMain.shadowColor = 'rgba(255, 255, 255, .8)'
    ctxMain.shadowOffsetX = -1
    ctxMain.shadowOffsetY = -1
    ctxMain.shadowBlur = Math.min(Math.ceil(8 * puzzleScale.value), 12)
    ctxMain.fillStyle = '#ffffaa'
    ctxMain.fill()

    // 把小图赋给ctxPic
    const imageData = ctxMain.getImageData(
      state.pinX - 3, // 为了阴影 是从-3px开始截取，判定的时候要+3px
      state.pinY - 20,
      state.pinX + puzzleBaseSize.value + 5,
      state.pinY + puzzleBaseSize.value + 5
    )
    ctxPic.putImageData(imageData, 0, state.pinY - 20)

    // 清理
    ctxMain.restore()
    ctxMain.clearRect(0, 0, canvasWidth.value, canvasHeight.value)

    // 画主图缺口
    ctxMain.save()
    paintBrick(ctxMain, state, puzzleScale)
    ctxMain.globalAlpha = 0.8
    ctxMain.fillStyle = '#ffffff'
    ctxMain.fill()
    ctxMain.restore()

    // 画缺口的内阴影
    ctxMain.save()
    ctxMain.globalCompositeOperation = 'source-atop'
    paintBrick(ctxMain, state, puzzleScale)
    // 在缺口里画一个亮的圆，要不然缺口是黑的
    ctxMain.arc(
      state.pinX + Math.ceil(puzzleBaseSize.value / 2),
      state.pinY + Math.ceil(puzzleBaseSize.value / 2),
      puzzleBaseSize.value * 1.2,
      0,
      Math.PI * 2,
      true
    )
    ctxMain.shadowColor = '#000'
    ctxMain.shadowOffsetX = 2
    ctxMain.shadowOffsetY = 2
    ctxMain.shadowBlur = 16
    ctxMain.fill()
    ctxMain.restore()

    ctxMain.save()
    // 因为是先画的缺口，所以设置globalCompositeOperation为destination-over，保证后画的主图不会覆盖缺口
    ctxMain.globalCompositeOperation = 'destination-over'
    ctxMain.drawImage(img, x, y, w, h)
    ctxMain.restore()

    state.loading = false
    state.isCanSlide = true
  }

  img.onerror = () => {
    state.withCanvas = true
    init() // 如果图片加载错误就重新来，并强制用canvas随机作图
  }
  if (!state.withCanvas && imgs.value && imgs.value.length) {
    let randomNum = getRandom(0, imgs.value.length - 1)
    if (randomNum === state.imgIndex) {
      if (randomNum === state.imgs.value.length - 1) {
        randomNum = 0
      } else {
        randomNum++
      }
    }
    state.imgIndex = randomNum
    img.src = imgs.value[randomNum]
  } else {
    img.src = makeImgWithCanvas(canvasWidth, canvasHeight)
  }
}

function paintBrick(ctxMain, state, puzzleScale) {
  const moveL = Math.ceil(15 * puzzleScale.value) // 直线移动的基础距离
  ctxMain.beginPath()
  ctxMain.moveTo(state.pinX, state.pinY)
  ctxMain.lineTo(state.pinX + moveL, state.pinY)
  ctxMain.arcTo(
    state.pinX + moveL,
    state.pinY - moveL / 2,
    state.pinX + moveL + moveL / 2,
    state.pinY - moveL / 2,
    moveL / 2
  )
  ctxMain.arcTo(
    state.pinX + moveL + moveL,
    state.pinY - moveL / 2,
    state.pinX + moveL + moveL,
    state.pinY,
    moveL / 2
  )
  ctxMain.lineTo(state.pinX + moveL * 3, state.pinY)
  ctxMain.lineTo(state.pinX + moveL * 3, state.pinY + moveL)
  ctxMain.arcTo(
    state.pinX + moveL * 3 + moveL / 2,
    state.pinY + moveL,
    state.pinX + moveL * 3 + moveL / 2,
    state.pinY + moveL + moveL / 2,
    moveL / 2
  )
  ctxMain.arcTo(
    state.pinX + moveL * 3 + moveL / 2,
    state.pinY + moveL * 2,
    state.pinX + moveL * 3,
    state.pinY + moveL * 2,
    moveL / 2
  )
  ctxMain.lineTo(state.pinX + moveL * 3, state.pinY + moveL * 3)
  ctxMain.lineTo(state.pinX, state.pinY + moveL * 3)
  ctxMain.lineTo(state.pinX, state.pinY + moveL * 2)
  ctxMain.arcTo(
    state.pinX + moveL / 2,
    state.pinY + moveL * 2,
    state.pinX + moveL / 2,
    state.pinY + moveL + moveL / 2,
    moveL / 2
  )
  ctxMain.arcTo(
    state.pinX + moveL / 2,
    state.pinY + moveL,
    state.pinX,
    state.pinY + moveL,
    moveL / 2
  )
  ctxMain.lineTo(state.pinX, state.pinY)
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
function makeImgWithCanvas(canvasWidth, canvasHeight) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = `rgb(${getRandom(100, 255)}, ${getRandom(100, 255)}, ${getRandom(100, 255)})`
  ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value)

  // 随机画10个图形
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = `rgb(${getRandom(100, 255)}, ${getRandom(100, 255)}, ${getRandom(100, 255)})`
    ctx.strokeStyle = `rgb(${getRandom(100, 255)}, ${getRandom(100, 255)}, ${getRandom(100, 255)})`

    if (getRandom(0, 2) > 1) {
      // 画矩形
      ctx.save()
      ctx.rotate((getRandom(-90, 90) * Math.PI) / 180)
      ctx.fillRect(
        getRandom(-20, canvas.width - 20),
        getRandom(-20, canvas.height - 20),
        getRandom(10, canvas.width / 2 + 10),
        getRandom(10, canvas.height / 2 + 10)
      )
      ctx.restore()
    } else {
      // 画圆
      ctx.beginPath()
      const ran = getRandom(-Math.PI, Math.PI)
      ctx.arc(
        getRandom(0, canvas.width),
        getRandom(0, canvas.height),
        getRandom(10, canvas.height / 2 + 10),
        ran,
        ran + Math.PI * 1.5
      )
      ctx.closePath()
      ctx.fill()
    }
  }

  return canvas.toDataURL('image/png')
}

function useMouseEvent(state, emit, props, instance, styleWidth, sliderBaseSize, puzzleBaseSize) {
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
      submit(state, emit, props, instance, styleWidth, sliderBaseSize, puzzleBaseSize)
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
function submit(state, emit, props, instance, styleWidth, sliderBaseSize, puzzleBaseSize) {
  const { canvasWidth, range } = props
  // 偏差 x = puzzle的起始X - (用户真滑动的距离) + (puzzle的宽度 - 滑块的宽度) * （用户真滑动的距离/canvas总宽度）
  // 最后+ 的是补上slider和滑块宽度不一致造成的缝隙
  const x = Math.abs(
    state.pinX - (styleWidth.value - sliderBaseSize.value) +
          (puzzleBaseSize.value - sliderBaseSize.value) *
            ((styleWidth.value - sliderBaseSize.value) /
            (canvasWidth - sliderBaseSize.value)) - 3
  )
  if (x <= range) { // 成功
    instance.ctx.$baseMessage('success', '验证成功！')
    clearTimeout(state.timer)
    state.timer = setTimeout(() => {
      state.isCanSlide = false
      state.isSuccess = true
      emit('success', x)
      emit('update:visible', false)
    }, 800)
  } else { // 失败
    instance.ctx.$baseMessage('error', '验证失败，请重新验证！')
    clearTimeout(state.timer)
    state.timer = setTimeout(() => {
      state.isCanSlide = false
      emit('fail', x)
      reset(state, emit, props, sliderBaseSize, puzzleBaseSize)
    }, 800)
  }
}
// 重置
function reset(state, emit, props, sliderBaseSize, puzzleBaseSize) {
  state.isCanSlide = true
  state.isSuccess = false
  state.startWidth = sliderBaseSize.value // 鼠标点下去时父级的width
  state.startX = 0 // 鼠标按下时的X
  state.newX = 0 // 鼠标当前的偏移X
  init(state, emit, props, puzzleBaseSize)
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
      .canvas-pic {
        position: absolute;
        top: 0;
        left: 0;
        width: 60px;
        height: 100%;
        z-index: 2;
        transition: none;
      }
      .reset-btn {
        position: absolute;
        bottom: 5px;
        right: 5px;
        z-index: 5;
        padding: 6px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .4);
        cursor: pointer;
        .icon {
          color: $base-color-white;
          font-size: 20px;
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
