<template>
  <div class="process" @click="updateProcess">
    <div class="process-current" :style="`width:${current}%`"></div>
    <div class="process-preload" :style="`width:${buffer}%`"></div>
    <div
      class="drag-btn"
      :style="`left:${current}%`"
      @mousedown="toggle"
      @click.stop="() => {}"
    />
  </div>
</template>

<script>
import { computed, ref, inject, nextTick, watch } from 'vue'
import { timeToSeconds } from '@/utils'

export default {
  setup(props, { emit }) {
    const $player = inject('$player')

    const currentTime = computed(() => $player.ctx.currentTime)
    const durationSec = computed(() => $player.ctx.duration)
    const curTimeSec = computed(() => timeToSeconds(currentTime.value))

    const buffered = computed(() => $player.ctx.buffered)

    const current = ref(0)
    // current.value = computed(() => {
    //   return durationSec.value === 0 ? 0 : curTimeSec.value / durationSec.value * 100
    // })
    const buffer = computed(() => {
      return durationSec.value === 0 ? 0 : buffered.value / durationSec.value * 100
    })

    watch(
      () => curTimeSec.value,
      (val) => {
        current.value = durationSec.value === 0 ? 0 : val / durationSec.value * 100
      }
    )

    const {
      updateProcess,
      toggle
    } = useClick(emit, current, durationSec)

    return {
      current,
      buffer,
      updateProcess,
      toggle
    }
  }
}

function useClick(emit, current, durationSec) {
  const updateProcess = (e) => {
    const left = e.offsetX // 当前位置距离点击位置的偏移量
    const maxVal = e.currentTarget.offsetWidth
    const targetProcess = left / maxVal * durationSec.value

    nextTick(() => {
      emit('setProcess', targetProcess)
    })
  }

  const toggle = (e) => {
    const btnDiv = e.target
    const parentDiv = document.querySelector('.process')
    const left = btnDiv.offsetLeft
    const mouseX = e.clientX // 鼠标按下的位置
    document.onmousemove = function(ev) {
      e.target.style.opacity = 1
      const maxVal = parentDiv.offsetWidth
      const moveX = ev.clientX - mouseX // 鼠标移动的距离
      let newX = left + moveX // left值
      // 判断最大值和最小值
      if (newX < 0) {
        newX = 0
      }
      if (newX > maxVal) {
        newX = maxVal
      }

      const final = newX / maxVal
      const targetProcess = final * durationSec.value
      if (!isNaN(final)) {
        current.value = final * 100
      }

      nextTick(() => {
        emit('setProcess', targetProcess)
      })
      return false // 取消默认事件
    }
    document.onmouseup = function() {
      e.target.style.opacity = ''
      document.onmousemove = false // 解绑移动事件
      return false
    }
  }

  return {
    updateProcess,
    toggle
  }
}
</script>

<style lang="scss" scoped>
.process {
  width: 100%;
  height: 6px;
  margin-top: 8px;
  position: relative;
  border-radius: 8px;
  background-color: rgb(77, 79, 82);
  &-current {
    height: 6px;
    border-radius: 8px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background-color: $base-color-red;
    transition: none;
  }
  &-preload {
    height: 6px;
    border-radius: 8px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: rgba(137, 139, 143, 0.8);
    transition: none;
  }
  .drag-btn {
    opacity: 0;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fff;
    transform: translateY(-50%) translateX(-50%);
    transition: none;
  }
  &:hover{
    cursor: pointer;
    .drag-btn{
      opacity: 1;
    }
  }
}
</style>
