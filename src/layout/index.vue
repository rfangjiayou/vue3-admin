<template>
  <div class="layout">
    <Side />
    <section class="right" :class="{'fold': isCollapse}">
      <Header />
      <section class="main" :class="{ 'fold-main': isCollapse }">
        <transition name='fade' mode="out-in">
          <router-view  />
        </transition>
      </section>
    </section>
</div>
</template>

<script>
import Header from './component/Header'
import Side from './component/Side'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('sideBar')

export default {
  components: {
    Header,
    Side
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100%;
  .right {
    margin-left: $base-side-width;
    width: 100%;
    .main {
      overflow: hidden;
      margin-top: $base-header-height + $base-tab-tag-height;
      max-width: calc(100vw - #{$base-side-width});
    }
    .fold-main {
      max-width: calc(100vw - #{$base-fold-side-width});
    }
  }
}
</style>
