<template>
  <div class="play-ctrl">
    <PlayPauseCtrl v-bind="$attrs" />
    <TimeSpan v-bind="$attrs" />
    <Process v-bind="$attrs" />
    <Volume v-bind="$attrs" />
    <Fullscreen v-bind="$attrs" />
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
  width: calc(100% - #{$base-padding * 3});
  bottom: 20px;
  // display: flex;
  // align-items: center;
  display: grid;
  grid-template-columns: 25px 60px calc(100% - 20px - 60px - 45px - 45px) 25px 25px;
  grid-template-rows: 100%;
  grid-column-gap: 10px;
  margin: 0 $base-padding;
  padding: 10px $base-padding;
  border-radius: 50px;
  background-color: rgb(49, 52, 58);
  color: #fff;
}
</style>
