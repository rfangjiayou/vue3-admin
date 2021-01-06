<template>
  <el-scrollbar class="tab-tag-container">
    <div class="tab-tag__inner">
      <div
        v-for="(tab, index) in tabList"
        :key="tab.name"
        class="tab-btn"
        :class="{
          'tab-active': $route.name === tab.name
        }"
        @mouseenter="tab.showCloseBtn = true"
        @mouseleave="tab.showCloseBtn = false"
      >
        <div @click="$router.push({ name: tab.name })" class="tab-btn__inner">
          <span>{{tab.label}}</span>
            <span v-if="tab.name !== 'Home'" class="icon-close" @click.stop="closeTab(tab, index)">
              <IconSvg
                v-if="tab.showCloseBtn && tab.name !== 'Home'"
                iconName="close"
                class="icon"
              />
            </span>
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
  ::v-deep(.el-scrollbar__bar.is-vertical) {
    display: none;
  }
  .tab-tag__inner {
    display: flex;
    margin-top: 5px;
  }
  .tab-btn {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid $base-border-color;
    border-radius: 2px;
    cursor: pointer;
    &__inner {
      font-size: 12px;
      color: $base-font-color;
      white-space: nowrap;
      display: flex;
    }
    .icon-close {
      position: relative;
      display: block;
      width: 1px;
      margin-top: 3px;
      border-radius: 50%;
      transition: all .28s cubic-bezier(.645,.045,.355,1), background 0s, color 0s;
      .icon {
        position: absolute;
        top: 2px;
        left: 2px;
        font-size: 8px;
      }
      &:hover {
        background: $base-color-gray;
        // color: $base-color-white;
      }
    }
    &:hover {
      .icon-close {
        margin-left: 4px;
        width: 12px;
        height: 12px;
      }
    }
  }
  .tab-btn + .tab-btn {
    margin-left: 5px;
  }
  .tab-active {
    background: $base-color-green;
    border-color: $base-color-green;
    .tab-btn__inner {
      color: $base-color-white
    }
  }
}
</style>
