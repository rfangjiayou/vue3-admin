<template>
  <div class="user-setting">
    <Screenfull />
    <el-dropdown class="user-setting-dropdown">
      <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      <span class="username">
        admin<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Screenfull
  }
}
</script>

<style lang="scss" scoped>
.user-setting {
  display: flex;
  align-items: center;
  /deep/ &-dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    .username {
        margin-left: 10px;
    }
  }
}
</style>
