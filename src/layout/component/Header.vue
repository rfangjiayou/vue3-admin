<template>
  <div class="nav-bar-wrap" :class="{ 'fold': isCollapse }">
    <div class="nav-bar">
      <i v-if="!isCollapse" class="icon el-icon-s-fold" @click="handleToggle"></i>
      <i v-else class="icon el-icon-s-unfold" @click="handleToggle"></i>
      <Breadcrumb />
      <UserSetting class="user-setting" />
    </div>
    <TabTag />
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TabTag from '@/components/TabTag'
import UserSetting from './UserSetting'

const { mapGetters, mapActions } = createNamespacedHelpers('sideBar')

export default {
  components: {
    Breadcrumb,
    TabTag,
    UserSetting
  },
  setup() {
    const instance = getCurrentInstance()

    function handleToggle() {
      instance.proxy.toggle(!instance.proxy.isCollapse)
    }

    return {
      handleToggle
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  methods: {
    ...mapActions([
      'toggle'
    ])
  }
}
</script>

<style lang="scss" scoped>
.nav-bar-wrap {
  position: fixed;
  left: $base-side-width;
  top: 0;
  width: calc(100% - #{$base-side-width});
  .nav-bar {
    display: flex;
    align-items: center;
    height: $base-header-height;
    padding: $base-padding;
  }
  .user-setting {
    margin-left: auto;
  }
}
.icon {
  font-size: 22px;
  margin-right: 30px;
  cursor: pointer;
  &:hover {
    color: $base-color-default;
  }
}
.fold {
  margin-left: 0 !important;
  left: $base-fold-side-width;
  width: calc(100% - #{$base-fold-side-width});
}
</style>
