<template>
  <el-container>
    <el-aside width="200px">
      <Side />
    </el-aside>
    <el-container>
      <Header />
      <router-view />
    </el-container>
</el-container>
</template>

<script>
import Header from './component/Header'
import Side from './component/Side'

export default {
  components: {
    Header,
    Side
  }
}
</script>

<style lang="scss" scoped>

</style>
