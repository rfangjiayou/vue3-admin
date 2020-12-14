<template>
  <i class="position"></i>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item
        v-for="item in list"
        :key="item.name"
        class="breadcrumb-item"
      >
        <span>{{ item.label }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      list: []
    })

    watch(
      () => route.name,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const { matched } = route
          state.list = matched.slice(1).map(ele => {
            return {
              name: ele.name,
              label: ele.meta.label || '',
              path: ele.path
            }
          })
        }
      },
      {
        immediate: true
      }
    )

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.position {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
  margin-right: 5px;
  background: url("~@/assets/position.svg") center / cover no-repeat;
}
.breadcrumb-item {
  display: inline-block;
}
</style>
