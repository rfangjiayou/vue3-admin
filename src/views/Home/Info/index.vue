<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
      <Player
        :src="`https://cdn.jsdelivr.net/gh/rfangjiayou/cdn@1.0/video/video.mp4`"
      />
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
      <TodoList :list="list" />
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
      <el-card
        shadow="none"
        class="card"
        :body-style="{ padding: '0px' }"
      >
        <template #header>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import TodoList from '@/components/TodoList'
import { reactive, toRefs } from 'vue'

export default {
  components: {
    TodoList
  },
  setup() {
    const state = reactive({
      list: [
        {
          name: 'vue3-admin',
          checked: false,
          showDelete: false
        },
        {
          name: 'element-ui',
          checked: false,
          showDelete: false
        },
        {
          name: 'axios',
          checked: true,
          showDelete: false
        },
        {
          name: 'ssr',
          checked: false,
          showDelete: false
        },
        {
          name: 'element-plus',
          checked: true,
          showDelete: false
        },
        // {
        //   name: 'react',
        //   checked: false
        // },
        // {
        //   name: 'react1',
        //   checked: false
        // },
        // {
        //   name: 'react2',
        //   checked: false
        // },
        {
          name: 'react3',
          checked: false,
          showDelete: false
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
.card {
  height: 200px;
}
</style>
