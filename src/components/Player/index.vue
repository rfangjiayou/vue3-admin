<template>
  <div
    :class="[
      'player-wrap'
    ]"
    ref="playerWrap"
    @mouseenter="controlVisible = true"
    @mouseleave="controlVisible = false"
  >
    <video
      ref="player"
      class="player"
      :src="src"
      :controls="false"
      :muted="muted"
      :volume="volume"
      :playsinline="playsinline"
    >
      <p>你的浏览器不支持 HTML5 视频。可点击<a :href="src">此链接</a>观看</p>
    </video>
    <Controls
      @play="play"
      @pause="pause"
      @setVolume="setVolume"
      @fullScreen="setFullScreen"
    />
  </div>
</template>

<script>
import Controls from './component/Controls'
import { reactive, ref, toRefs, provide, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
import { secondsToTime } from '@/utils'

export default {
  name: 'Player',
  props: {
    src: [String, Array],
    autoplay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    playsinline: {
      type: Boolean,
      default: true
    },
    controls: {
      type: [String, Boolean],
      default: true
    }
  },
  components: {
    Controls
  },
  setup(props) {
    const state = reactive({
      controlVisible: false,
      muted: false,
      volume: 0.5,
      currentTime: '00:00:00'
    })
    const player = ref(null)
    const playerWrap = ref(null)

    const {
      play,
      pause,
      setVolume,
      setFullScreen
    } = useHandler(player, state, playerWrap)

    provide('$player', getCurrentInstance())

    onMounted(() => {
      player.value.addEventListener('timeupdate', e => timeUpdate(e, state))
    })

    onBeforeUnmount(() => {
      player.value.removeEventListener('timeupdate', e => timeUpdate(e, state))
    })

    return {
      ...toRefs(state),
      player,
      playerWrap,
      play,
      pause,
      setVolume,
      setFullScreen
    }
  }
}

function timeUpdate(e, state) {
  const currentTime = e.target.currentTime
  state.currentTime = secondsToTime(currentTime)
}

function enterFullscreen(playerWrap) {
  if (playerWrap.value.mozRequestFullScreen) {
    playerWrap.value.mozRequestFullScreen()
  } else if (playerWrap.value.webkitRequestFullscreen) {
    playerWrap.value.webkitRequestFullscreen()
  } else if (playerWrap.value.requestFullScreen) {
    playerWrap.value.requestFullscreen()
  }
}

function cancelFullscreen() {
  if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.cancelFullScreen) {
    document.cancelFullScreen()
  }
}

function useHandler(player, state, playerWrap) {
  const play = () => {
    player.value.play()
  }
  const pause = () => {
    player.value.pause()
  }
  const setVolume = (value) => {
    state.volume = value
    state.muted = value === 0
  }
  const setFullScreen = (value) => {
    value ? enterFullscreen(playerWrap) : cancelFullscreen()
  }

  return {
    play,
    pause,
    setVolume,
    setFullScreen
  }
}
</script>

<style lang="scss" scoped>
.player-wrap {
  .player {
    position: relative;
    height: 100%;
    width: 100%;
  }
}
</style>
