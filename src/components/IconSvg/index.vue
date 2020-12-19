<template>
  <svg class="icon-svg" aria-hidden="true">
    <use :xlink:href="iconClass"></use>
  </svg>
</template>

<script>
import { toRefs, computed } from 'vue'

export default {
  name: 'IconSvg',
  props: {
    iconName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const { iconName } = toRefs(props)
    const iconClass = computed(() => `#icon-${iconName.value}`)

    return {
      iconClass
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
