<template>
  <div class="side-bar-container" :class="{ 'fold-side-bar': isCollapse }">
    <nav-logo />
    <el-scrollbar class="side-bar-scroll">
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
          <el-sub-menu
            v-if="menu.children.length"
            :key="menu.name"
            :index="menu.path"
          >
            <template #title>
              <component :is="menu.icon" class="myIcon"></component>
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
          </el-sub-menu>
          <el-menu-item
            v-else
            :key="menu.name"
            :index="menu.path"
          >
            <component :is="menu.icon" class="myIcon"></component>
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
import {
  HomeFilled,
  Menu,
  Histogram,
  WarnTriangleFilled
} from '@element-plus/icons-vue'

export default {
  components: {
    NavLogo
  },
  setup() {
    const store = useStore()
    const state = reactive({
      menus: [
        { label: '首页', name: 'Home', path: '/home', icon: HomeFilled, children: [] },
        {
          label: '组件',
          name: 'Components',
          icon: Menu,
          path: '/components',
          children: [
            { label: '富文本编辑器', name: 'Editor', path: '/components/editor' },
            { label: '滑动验证码', name: 'Verify', path: '/components/verify' },
            { label: '可拖拽弹窗', name: 'DragDialog', path: '/components/drag-dialog' },
            { label: '放大镜', name: 'Magnifier', path: '/components/magnifier' },
            { label: '头像上传', name: 'AvatarUpload', path: '/components/avatar-upload' }
            // { label: '流程图', name: 'FlowChart', path: '/components/flow-chart' }
          ]
        },
        { label: '图表', name: 'Chart', path: '/chart', icon: Histogram, children: [] },
        { label: '错误页', name: 'Error', path: '/error', icon: WarnTriangleFilled, children: [] }
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
}
.side-bar-scroll {
  height: calc(100vh - #{$base-header-height});
  background: $base-menu-background;
}
.side-bar {
  border-right: none;
  ::v-deep(.el-submenu__title i)  {
    color: $base-menu-color
  }
  .myIcon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
}
</style>
