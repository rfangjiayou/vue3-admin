<template>
  <div class="verify-wrap">
    <Tip :message="message" />
    <div class="verify-wrap__inner">
      <h3>基本</h3>
      <el-button @click="getVerify" class="btn" size="small">开始验证</el-button>
      <h3>自定义图片</h3>
      <el-button class="btn" size="small">开始验证</el-button>
    </div>
    <Verify
      v-model:visible="visible"
    />
  </div>
</template>

<script>
import Tip from '@/components/Tip'
import Verify from '@/components/Verify'
import { reactive, toRefs } from 'vue'

export default {
  components: {
    Tip,
    Verify
  },
  setup() {
    const state = reactive({
      message: '一款纯前端的滑动验证码',
      visible: false
    })

    const getVerify = () => {
      state.visible = true
    }

    return {
      ...toRefs(state),
      getVerify
    }
  }
}
</script>

<style lang="scss" scoped>
.verify-wrap {
  padding: $base-padding;
  &__inner {
    margin-top: 20px;
    border-radius: $base-border-radius;
    background: $base-color-white;
    padding: $base-padding;
    h3 {
      margin: 10px 0;
    }
    .btn {
      margin: 10px 0;
    }
  }
}
</style>
