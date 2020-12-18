<template>
  <el-scrollbar class="page">
    <div class="page__inner">
      <slot />
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Page'
}
</script>

<style lang="scss" scoped>
.page {
  // height: calc(100vh - #{$base-header-height} - #{$base-tab-tag-height});
  width: calc(100vw - #{$base-side-width});
  padding: $base-padding;
  // min-width: 1000px;
  // min-height: calc(100vh - #{$base-header-height} - #{$base-tab-tag-height});
  &__inner {
    padding: $base-padding;
    border-radius: $base-border-radius;
    background: $base-color-white;
  }
}
</style>
