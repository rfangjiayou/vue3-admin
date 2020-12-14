<template>
  <div class="nav-logo" :class="{ 'fold-side-bar': isCollapse }">
    <router-link to="/">
      <img v-if="!isCollapse" src="@/assets/logo.png" alt="">
      <img v-else src="@/assets/favicon.png" alt="">
    </router-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('sideBar')

export default {
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  }
}
</script>

<style lang="scss" scoped>
.nav-logo {
  height: $base-header-height;
  background: $base-menu-background;
  padding: 0 $base-padding;
  img {
    height: 45px;
    width: 175px;
    margin-top: 10px;
  }
}
.fold-side-bar {
  img {
    width: 30px;
    height: 30px;
    margin-top: 15px;
  }
}
</style>
