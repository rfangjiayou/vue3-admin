<template>
  <div class="nav-logo">
    <router-link to="/">
      <img src="@/assets/logo.png" alt="">
    </router-link>
  </div>
</template>

<script>
export default {
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
</style>
