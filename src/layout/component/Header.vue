<template>
  <div class="nav-bar" :class="{ 'fold': isCollapse }">
    <i v-if="!isCollapse" class="icon el-icon-s-fold" @click="handleToggle"></i>
    <i v-else class="icon el-icon-s-unfold" @click="handleToggle"></i>
    <Breadcrumb />
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'

const { mapGetters, mapActions } = createNamespacedHelpers('sideBar')

export default {
  components: {
    Breadcrumb
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
.nav-bar {
  display: flex;
  align-items: center;
  position: fixed;
  left: $base-side-width;
  top: 0;
  height: $base-header-height;
  width: 100%;
  padding: $base-padding;
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
}
</style>
