<template>
  <div class="home">
    <Statistics />
    <Account />
  </div>
</template>

<script>
import Statistics from './Statistics'
import Account from './Account'

export default {
  components: {
    Statistics,
    Account
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
