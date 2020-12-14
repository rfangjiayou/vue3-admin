<template>
  <el-scrollbar class="tab-tag-container">
    <div class="tab-tag__inner">
      <div
        v-for="(tab, index) in tabList"
        :key="tab.name"
        class="tab-btn"
        :class="{ 'tab-active': $route.name === tab.name }"
        @mouseenter="tab.showCloseBtn = true"
        @mouseleave="tab.showCloseBtn = false"
      >
        <div @click="$router.push({ name: tab.name })" class="tab-btn__inner">
          <span>{{tab.label}}</span>
          <i v-if="tab.showCloseBtn && tab.name !== 'Home'" class="el-icon-close" @click.stop="closeTab(tab, index)"></i>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import { reactive, toRefs, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      showCloseBtn: false,
      tabList: [
        {
          name: 'Home',
          path: '/home',
          label: '首页',
          showCloseBtn: false
        }
      ]
    })

    watch(
      () => route.name,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const found = state.tabList.find(ele => ele.name === newVal)
          if (!found) {
            state.tabList.push({
              name: route.name,
              path: route.path,
              label: route.meta.label,
              showCloseBtn: false
            })
          }
        }
      },
      {
        immediate: true
      }
    )

    const { closeTab } = useClick(router, state.tabList)

    return {
      ...toRefs(state),
      closeTab
    }
  }
}

const useClick = (router, tabList) => {
  const closeTab = (tab, index) => {
    let targetRoute
    if (index === tabList.length - 1) {
      targetRoute = tabList[index - 1]
    } else {
      targetRoute = tabList[index + 1]
    }
    tabList.splice(index, 1)
    nextTick(() => {
      router.push({ name: targetRoute.name })
    })
  }
  return {
    closeTab
  }
}
</script>

<style lang="scss" scoped>
.tab-tag-container {
  height: $base-tab-tag-height;
  border-top: 1px solid $base-border-color;
  box-shadow: $base-box-shadow;
  display: flex;
  align-items: center;
  padding: 0 $base-padding;
  .tab-tag__inner {
    display: flex;
  }
  .tab-btn {
    padding: 5px 10px;
    border: 1px solid $base-border-color;
    border-radius: $base-border-radius;
    transition: padding .3s cubic-bezier(.645,.045,.355,1);
    cursor: pointer;
    &__inner {
      font-size: 12px;
      color: $base-font-color;
    }
    i {
      margin-left: 4px;
    }
    &:hover {
    }
  }
  .tab-btn + .tab-btn {
    margin-left: 10px;
  }
  .tab-active {
    background: $base-color-green;
    border-color: $base-color-green;
    .tab-btn__inner {
      color: $base-color-white
    }
  }
}
.sss-enter-active,
.sss-leave-active {
  transition: width .28s;
}
</style>
