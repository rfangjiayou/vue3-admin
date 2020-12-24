<template>
  <div class="volume-ctrl" @mouseenter="visible = true" @mouseleave="visible = false">
    <IconSvg
      v-if="isMuted"
      iconName="unVolume"
      class="volume-btn"
      @click="setMuted"
    />
    <IconSvg
      v-else
      iconName="volume"
      class="volume-btn"
      @click="setMuted"
    />
    <transition name="zoom-in-bottom">
      <div v-if="visible" class="volume-panel">
        <div class="volume-process" @click="updateVolume">
          <div class="current-process" :style="{height: volume + '%'}">
          </div>
          <div
            class="drag-btn"
            :style="{top: `${100 - volume}%`}"
            @mousedown="toggle"
            @click.stop="() => {}"
          >
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, inject, watch, nextTick } from 'vue'

export default {
  setup(props, ctx) {
    const $player = inject('$player')

    const isMuted = ref($player.proxy.muted)
    const volume = ref(50)
    const volumeCache = ref(0)
    const visible = ref(false)

    watch(
      () => volume.value,
      (newVal) => {
        isMuted.value = newVal === 0
      }
    )

    const {
      setMuted,
      updateVolume,
      toggle
    } = useClick(ctx, isMuted, volume, volumeCache, visible)

    return {
      isMuted,
      volume,
      volumeCache,
      visible,
      setMuted,
      updateVolume,
      toggle
    }
  }
}

function useClick(ctx, isMuted, volume, volumeCache, visible) {
  const setMuted = () => {
    if (isMuted.value) { // true是静音
      volume.value = volumeCache.value
      ctx.emit('setVolume', volume.value / 100)
    } else {
      volumeCache.value = volume.value // 缓存静音前的值
      volume.value = 0
      ctx.emit('setVolume', volume.value)
    }
  }

  const updateVolume = (e) => {
    let top = e.offsetY // 当前位置距离点击位置的偏移量
    // 判断点击位置是在当前节点的上面还是下面
    if (e.target.className === 'current-process') {
      top += e.target.offsetTop // 当前位置距离顶部的偏移量
    }
    const maxVal = e.currentTarget.offsetHeight
    const targetVolume = 1 - top / maxVal

    volume.value = parseInt(targetVolume * 100)

    nextTick(() => {
      ctx.emit('setVolume', targetVolume)
    })
  }

  const toggle = (e) => {
    const btnDiv = e.target
    const parentDiv = document.querySelector('.volume-process')
    const top = btnDiv.offsetTop
    const mouseY = e.clientY // 鼠标按下的位置
    document.onmousemove = function(ev) {
      e.target.style.opacity = 1
      const maxVal = parentDiv.offsetHeight
      const moveY = ev.clientY - mouseY // 鼠标移动的距离
      let newY = top + moveY // top值
      // 判断最大值和最小值
      if (newY < 0) {
        newY = 0
      }
      if (newY > maxVal) {
        newY = maxVal
      }

      const targetVolume = 1 - newY / maxVal
      if (!isNaN(targetVolume)) {
        volume.value = parseInt(targetVolume * 100)
      }

      nextTick(() => {
        ctx.emit('setVolume', targetVolume)
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
    setMuted,
    updateVolume,
    toggle
  }
}
</script>

<style lang="scss" scoped>
.volume-ctrl {
  position: relative;
  width: 25px;
  .volume-btn {
    position: relative;
    z-index: 5;
    font-size: 16px;
    margin-top: 3px;
    cursor: pointer;
  }
  .volume-panel {
    position: absolute;
    bottom: -5px;
    left: -9px;
    padding: 20px 15px;
    border-radius: 50px;
    background-color: rgb(77, 79, 82);
    transition: none;
    .volume-process {
      position: relative;
      height: 100px;
      width: 5px;
      margin-bottom: 10px;
      border-radius: 50px;
      background-color: rgba(255, 255, 255, .7);
      .current-process {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background-color: $base-color-red;
        border-radius: 50px;
        transition: none;
      }
      .drag-btn {
        opacity: 0;
        position: absolute;
        left: 50%;
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
  }
}
</style>
