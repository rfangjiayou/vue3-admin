<template>
  <Page class="home">
    <Statistics />
    <Account />
  </Page>
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
  padding: $base-padding - 3px $base-padding $base-padding $base-padding;
  * {
    transition: none;
  }
  /deep/ .page__inner{
    padding: 3px 0 0 0;
    border-radius: 0;
    background: $base-color-bg;
  }
}
</style>
