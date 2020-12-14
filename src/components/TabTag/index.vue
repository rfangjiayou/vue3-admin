<template>
  <el-scrollbar class="tab-tag-container">
    <div
      v-for="btn in btnList"
      :key="btn.name"
    >
      <router-link :to="btn.path">
        <div class="tab-btn">
          <span>{{btn.label}}</span>

        </div>
      </router-link>
    </div>
  </el-scrollbar>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      btnList: [
        {
          name: 'Home',
          path: '/home',
          label: '首页'
        }
      ]
    })

    return {
      ...toRefs(state)
    }
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
	.tab-btn {

  }
}
</style>
