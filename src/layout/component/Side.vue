<template>
  <div class="side-bar-container" :class="{ 'fold-side-bar': isCollapse }">
    <nav-logo />
    <el-scrollbar>
      <el-menu
        class="side-bar"
        :default-active="$route.path"
        :background-color="menuBackground"
        :text-color="menuColor"
        :active-text-color="menuColorActive"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <template v-for="menu in menus" >
          <el-submenu
            v-if="menu.children.length"
            :key="menu.name"
            :index="menu.path"
          >
            <template #title>
              <i :class="menu.icon"></i>
              <span>{{ menu.label }}</span>
            </template>
            <el-menu-item
              v-for="child in menu.children"
              :key="child.name"
              :index="child.path"
            >
              <template #title>
                <span>{{ child.label }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            v-else
            :key="menu.name"
            :index="menu.path"
          >
            <i :class="menu.icon"></i>
            <template #title>
              <span>{{ menu.label }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  computed
} from 'vue'
import { useStore } from 'vuex'
import style from '@/styles/variables.scss'
import NavLogo from './NavLogo'

export default {
  components: {
    NavLogo
  },
  setup() {
    const store = useStore()
    const state = reactive({
      menus: [
        { label: '首页', name: 'Home', path: '/home', icon: 'el-icon-s-home', children: [] },
        {
          label: '组件',
          name: 'Components',
          icon: 'el-icon-menu',
          path: '/components',
          children: [
            { label: '富文本编辑器', name: 'Editor', path: '/components/editor' },
            { label: '头像上传', name: 'AvatarUpload', path: '/components/avatar-upload' },
            { label: '流程图', name: 'FlowChart', path: '/components/flow-chart' }
          ]
        },
        { label: '图表', name: 'Chart', path: '/chart', icon: 'el-icon-s-data', children: [] },
        { label: '错误页', name: 'Error', path: '/error', icon: 'el-icon-s-release', children: [] }
      ],
      isCollapse: computed(() => store.getters['sideBar/isCollapse'])
    })
    const menuStyle = reactive({
      menuColor: computed(() => style['menu-color']),
      menuColorActive: computed(() => style['menu-color-active']),
      menuBackground: computed(() => style['menu-background'])
    })

    return {
      ...toRefs(menuStyle),
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar-container {
  width: $base-side-width;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: $base-z-index;
  ::v-deep(.el-scrollbar) {
    height: 100%;
  }
}
.side-bar {
  height: calc(100vh - #{$base-header-height});
  border-right: none;
  ::v-deep(.el-submenu__title i)  {
    color: $base-menu-color
  }
  // /deep/ .el-menu-item {
  //   &:hover {
  //     background-color: $base-color-default !important;
  //   }
  // }
  // /deep/ .is-active {
  //   background-color: $base-menu-background-active !important;
  // }
}
</style>
