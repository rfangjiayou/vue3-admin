<template>
  <div class="process">
    <div class="process-current"></div>
    <div class="process-preload"></div>
    <div
      class="drag-btn"
      @click.stop="() => {}"
    />
  </div>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  setup(props) {
    const $player = inject('$player')
    const currentTime = computed(() => $player.ctx.currentTime)

    return {
      currentTime
    }
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
    width: 30%;
    height: 6px;
    border-radius: 8px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background-color: $base-color-red;
  }
  &-preload {
    width: 60%;
    height: 6px;
    border-radius: 8px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: rgba(137, 139, 143, 0.8);
  }
  .drag-btn {
    opacity: 0;
    position: absolute;
    z-index: 3;
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
</style>
