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
  * {
    transition: none;
  }
  /deep/ .page__inner{
    padding: 0;
    border-radius: 0;
    background: $base-color-bg;
  }
}
</style>
