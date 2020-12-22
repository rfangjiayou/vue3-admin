<template>
  <div
    class="player-wrap"
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
    >
      <!-- <source src="rabbit320.mp4" type="video/mp4">
      <source src="rabbit320.webm" type="video/webm"> -->
      <p>你的浏览器不支持 HTML5 视频。可点击<a :href="src">此链接</a>观看</p>
    </video>
    <Controls
      @play="play"
      @pause="pause"
      @setMuted="setMuted"
      @setVolume="setVolume"
    />
  </div>
</template>

<script>
import Controls from './component/Controls'
import { reactive, ref, toRefs } from 'vue'

export default {
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
      volume: 0.5
    })
    const player = ref(null)

    const {
      play,
      pause,
      setMuted,
      setVolume
    } = useHandler(player, state)

    return {
      ...toRefs(state),
      player,
      play,
      pause,
      setMuted,
      setVolume
    }
  }
}

function useHandler(player, state) {
  const play = () => {
    player.value.play()
  }
  const pause = () => {
    player.value.pause()
  }
  const setMuted = (isMuted) => {
    state.muted = isMuted
  }
  const setVolume = (setVolume) => {
    state.volume = setVolume
  }

  return {
    play,
    pause,
    setMuted,
    setVolume
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
