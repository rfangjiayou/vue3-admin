<template>
  <el-scrollbar class="page" :class="{'fold-page': isCollapse}">
    <div class="page__inner">
      <slot />
    </div>
  </el-scrollbar>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('sideBar')

export default {
  name: 'Page',
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  }
}
</script>

<style lang="scss" scoped>
.page {
  // height: calc(100vh - #{$base-header-height} - #{$base-tab-tag-height});
  // min-height: calc(100vh - #{$base-header-height} - #{$base-tab-tag-height});
  width: calc(100vw - #{$base-side-width});
  padding: $base-padding;
  /deep/ .el-scrollbar__wrap {
    margin-bottom: 0 !important;
  }
  /deep/ .el-scrollbar__bar.is-horizontal {
    height: 0;
  }
  &__inner {
    padding: $base-padding;
    border-radius: $base-border-radius;
    background: $base-color-white;
  }
}
.fold-page {
  width: calc(100vw - #{$base-fold-side-width});
}
</style>
