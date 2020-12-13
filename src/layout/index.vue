<template>
  <div class="layout">
    <Side />
    <section class="right" :class="{'fold-side-bar': isCollapse}">
      <Header />
      <router-view />
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
    margin-top: $base-header-height;
  }
  .fold-side-bar {
    margin-left: 64px;
  }
}
</style>
