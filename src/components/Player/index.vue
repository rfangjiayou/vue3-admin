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
      :autobuffer="true"
      :loop="loop"
      :autoplay="autoplay"
      :muted="muted"
      :volume="volume"
      :currentTime="updateTime"
      :playsinline="playsinline"
      :ontimeupdate="timeUpdate"
      :onprogress="progressUpdate"
      @click="clickVideo"
    >
      <p>你的浏览器不支持 HTML5 视频。可点击<a :href="src">此链接</a>观看</p>
    </video>
    <transition name="fade">
      <div
        v-show="controlVisible || !isPlaying"
        class="center-btn"
      >
        <PlayPause @play="play" @pause="pause" />
      </div>
    </transition>
    <transition name="fade">
      <Controls
        v-show="controlVisible || !isPlaying"
        @play="play"
        @pause="pause"
        @setVolume="setVolume"
        @setProcess="setProcess"
        @fullScreen="setFullScreen"
      />
    </transition>
  </div>
</template>

<script>
import Controls from './component/Controls'
import PlayPause from './component/PlayPause'
import { reactive, ref, toRefs, provide, getCurrentInstance } from 'vue'
import { secondsToTime } from '@/utils'

export default {
  name: 'Player',
  props: {
    src: [String, Array],
    autoplay: {
      type: Boolean,
      default: false
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
    Controls,
    PlayPause
  },
  setup(props) {
    const state = reactive({
      controlVisible: false,
      muted: false,
      volume: 0.5,
      currentTime: '00:00:00',
      updateTime: 0,
      duration: 0,
      buffered: 0,
      isPlaying: props.autoplay,
      ended: false
    })
    const player = ref(null)
    const playerWrap = ref(null)

    const {
      play,
      pause,
      setVolume,
      setProcess,
      setFullScreen,
      clickVideo
    } = useHandler(player, state, playerWrap)

    const {
      timeUpdate,
      progressUpdate
    } = useEvent(state)

    provide('$player', getCurrentInstance())

    return {
      ...toRefs(state),
      player,
      playerWrap,
      play,
      pause,
      setVolume,
      setProcess,
      setFullScreen,
      clickVideo,
      timeUpdate,
      progressUpdate
    }
  }
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

function useEvent(state) {
  const timeUpdate = (e) => {
    if (!e.target.seeking) {
      const currentTime = e.target.currentTime
      state.currentTime = secondsToTime(currentTime)
      state.duration = e.target.duration
      state.ended = e.target.ended
    }
  }
  const progressUpdate = (e) => {
    const bufferedEnd = e.target.buffered.end(e.target.buffered.length - 1)
    state.buffered = bufferedEnd
    state.duration = e.target.duration
  }

  return {
    timeUpdate,
    progressUpdate
  }
}

function useHandler(player, state, playerWrap) {
  const play = () => {
    state.isPlaying = true
    player.value.play()
  }
  const pause = () => {
    state.isPlaying = false
    player.value.pause()
  }
  const setVolume = (value) => {
    if (!isNaN(value)) {
      state.volume = value
    }
    state.muted = value === 0
  }
  const setProcess = (value) => {
    if (!isNaN(value)) {
      state.updateTime = value.toFixed(2)
    }
  }
  const setFullScreen = (value) => {
    value ? enterFullscreen(playerWrap) : cancelFullscreen()
  }
  const clickVideo = () => {
    state.isPlaying ? pause() : play()
  }

  return {
    play,
    pause,
    setVolume,
    setProcess,
    setFullScreen,
    clickVideo
  }
}
</script>

<style lang="scss" scoped>
.player-wrap {
  position: relative;
  .player {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .center-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    padding: 15px 13px 15px 15px;
    border-radius: 50%;
    background: rgba(0, 0, 0, .38);
    color: rgba(255, 255, 255, 0.38);
    ::v-deep(.icon-svg) {
      font-size: 30px;
      margin-top: 0;
    }
    &:hover {
      background: rgba(0, 0, 0, .28);
      color: rgba(255, 255, 255, 0.58);
    }
  }
}
</style>
