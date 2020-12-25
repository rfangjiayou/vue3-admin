<template>
  <div class="play-ctrl">
    <div class="top">
      <Process v-bind="$attrs" />
    </div>
    <div class="bottom">
      <PlayPauseCtrl class="bottom-item" v-bind="$attrs" />
      <TimeSpan class="bottom-item" v-bind="$attrs" />
      <Volume class="bottom-item volume" v-bind="$attrs" />
      <Fullscreen class="bottom-item" v-bind="$attrs" />
    </div>
  </div>
</template>

<script>
import PlayPauseCtrl from './PlayPause'
import TimeSpan from './TimeSpan'
import Process from './Process'
import Volume from './Volume'
import Fullscreen from './Fullscreen'

export default {
  components: {
    PlayPauseCtrl,
    TimeSpan,
    Process,
    Volume,
    Fullscreen
  }
}
</script>

<style lang="scss" scoped>
.play-ctrl {
  position: absolute;
  width: 100%;
  bottom: 5px;
  padding: 10px $base-padding;
  color: #fff;
  background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.37),rgba(0,0,0,.75),rgba(0,0,0,.75));
  .bottom {
    margin-top: 10px;
    display: flex;
    .bottom-item + .bottom-item {
      margin-left: 20px;
    }
    .volume {
      margin-left: auto !important;
    }
  }
}
</style>
