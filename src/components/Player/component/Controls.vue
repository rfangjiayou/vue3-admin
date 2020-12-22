<template>
  <div class="play-ctrl">
    <PlayPauseCtrl v-bind="$attrs" />
    <TimeLine />
    <Process />
    <Volume v-bind="$attrs" />
    <Screenfull />
  </div>
</template>

<script>
import PlayPauseCtrl from './PlayPauseCtrl'
import TimeLine from './TimeLine'
import Process from './Process'
import Volume from './Volume'
import Screenfull from './Screenfull'

export default {
  components: {
    PlayPauseCtrl,
    TimeLine,
    Process,
    Volume,
    Screenfull
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
  grid-template-columns: 5% 10% 65% 10% 10%;
  grid-template-rows: 100%;
  grid-row-gap: 10px;
  margin: 0 $base-padding;
  padding: 10px $base-padding;
  border-radius: 50px;
  background-color: rgb(49, 52, 58);
  color: #fff;
}
</style>
