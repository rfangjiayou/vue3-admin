<template>
  <div class="volume-ctrl">
    <IconSvg
      v-if="isMuted"
      :iconName="`pwd_suf_2`"
      class="volume-btn"
      @click="setMuted"
    />
    <IconSvg
      v-else
      :iconName="`pwd_suf`"
      class="volume-btn"
      @click="setMuted"
    />
    <div class="volume-panel">
      <div class="process" @click="updateVolume">
        <div class="current-process" :style="{height: volume + '%'}">
        </div>
        <div
          class="drag-btn"
          :style="{top: `${100 - volume}%`}"
          @mousedown.stop="toggle"
          @click.stop="() => {}"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(props, ctx) {
    const isMuted = ref(false)
    const volume = ref(50)

    const {
      setMuted,
      updateVolume,
      toggle
    } = useClick(ctx, isMuted, volume)

    return {
      isMuted,
      volume,
      setMuted,
      updateVolume,
      toggle
    }
  }
}

function useClick(ctx, isMuted, volume) {
  const setMuted = () => {
    isMuted.value = !isMuted.value
    ctx.emit('setMuted', isMuted.value)
  }

  const updateVolume = (e) => {
    let top = e.offsetY // 当前位置距离点击位置的偏移量
    // 判断点击位置是在当前节点的上面还是下面
    if (e.target.className === 'current-process') {
      top += e.target.offsetTop // 当前位置距离顶部的偏移量
    }
    const maxVal = e.currentTarget.offsetHeight
    const targetVolume = 1 - top / maxVal

    ctx.emit('setVolume', targetVolume)

    volume.value = parseInt(targetVolume * 100)
  }

  const toggle = (e) => {
    const btnDiv = e.target
    // const activeDiv = document.querySelector('.current-process')
    const parentDiv = document.querySelector('.process')
    // const cha = activeDiv.offsetHeight - btnDiv.offsetHeight
    const top = btnDiv.offsetTop
    const mouseY = e.clientY // 鼠标按下的位置
    document.onmousemove = function(ev) {
      const e = ev || window.event
      const moveY = e.clientY - mouseY // 鼠标移动的距离
      let newY = top + moveY // top值
      // 判断最大值和最小值
      if (newY < 0) {
        newY = 0
      }
      // if (newY >= cha) {
      //   newY = cha
      // }
      if (newY > 100) {
        newY = 100
      }

      const maxVal = parentDiv.offsetHeight
      const targetVolume = 1 - newY / maxVal

      ctx.emit('setVolume', targetVolume)

      volume.value = parseInt(targetVolume * 100)
      return false // 取消默认事件
    }
    document.onmouseup = function() {
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
  .volume-btn {
    position: relative;
    z-index: 5;
    font-size: 16px;
    cursor: pointer;
  }
  .volume-panel {
    position: absolute;
    bottom: -5px;
    left: -9px;
    padding: 20px 15px;
    border-radius: 50px;
    background-color: rgb(77, 79, 82);
    .process {
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
        transition: height 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
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
        transform: translateY(-50%) translateX(-54%);
        transition: top 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
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
