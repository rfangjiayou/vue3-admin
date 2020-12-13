<template>
  <div class="nav-bar">
    <i class="el-icon-s-fold" @click="handleToggle"></i>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions } = createNamespacedHelpers('sideBar')

export default {
  setup() {
    const instance = getCurrentInstance()

    function handleToggle() {
      instance.proxy.toggle(!instance.proxy.isCollapse)
    }

    return {
      handleToggle
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  methods: {
    ...mapActions([
      'toggle'
    ])
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  left: $base-side-width;
  top: 0;
  height: $base-header-height;
  width: 100%;
  padding: $base-padding;
}
</style>
