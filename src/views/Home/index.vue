<template>
  <div class="home">
    <Statistics />
    <Account />
    <Info />
  </div>
</template>

<script>
import Statistics from './Statistics'
import Account from './Account'
import Info from './Info'

export default {
  components: {
    Statistics,
    Account,
    Info
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: $base-padding;
  * {
    transition: none;
  }
}
</style>
