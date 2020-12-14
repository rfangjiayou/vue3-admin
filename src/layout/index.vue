<template>
  <div class="layout">
    <Side />
    <section class="right" :class="{'fold-side-bar fold': isCollapse}">
      <Header />
      <transition name='fade' mode="out-in">
        <router-view class="main" />
      </transition>
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
  .right {
    margin-left: $base-side-width;
    .main {
      margin-top: $base-header-height + $base-tab-tag-height;
    }
  }
}
</style>
