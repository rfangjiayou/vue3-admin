<template>
  <div class="verify-wrap">
    <Tip :message="message" />
    <div class="verify-wrap__inner">
      <p>调整拼图块尺寸(:puzzleScale, 倍数, 默认1)</p>
      <el-slider
        class="slider"
        v-model="puzzleScale"
        :min="0.2"
        :max="2"
        :step="0.1"
      />
      <p>调整滑块尺寸(:sliderSize, px, 默认50)</p>
      <el-slider
        class="slider"
        v-model="sliderSize"
        :min="30"
        :max="80"
      />
      <h3>基本</h3>
      <el-button @click="getVerify" class="btn" size="small">开始验证</el-button>
      <h3>自定义图片</h3>
      <el-button @click="getVerifyCustom" class="btn" size="small">开始验证</el-button>
    </div>
    <Verify
      v-model:visible="visible"
      :imgs="imgs"
      :puzzleScale="puzzleScale"
      :sliderSize="sliderSize"
    />
  </div>
</template>

<script>
import Tip from '@/components/Tip'
import Verify from '@/components/Verify'
import { reactive, toRefs } from 'vue'
import { getVerifyImages } from '@/services'

export default {
  components: {
    Tip,
    Verify
  },
  setup() {
    const state = reactive({
      message: '一款纯前端的滑动验证码，基本模式采用canvas随机作图，自定义模式采用接口返回的图片，当自定义图片加载失败时，强制使用canvas随机作图',
      visible: false,
      imgs: [],
      puzzleScale: 1,
      sliderSize: 40
    })

    const getVerify = () => {
      state.visible = true
    }

    const getVerifyCustom = async() => {
      const { success, result } = await getVerifyImages()
      if (success) {
        state.imgs = result.list
        state.visible = true
      }
    }

    return {
      ...toRefs(state),
      getVerify,
      getVerifyCustom
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
    .slider {
      max-width: 300px;
      ::v-deep(.el-slider__button-wrapper), ::v-deep(.el-slider__bar){
        transition: none;
      }
    }
    h3 {
      margin: 10px 0;
    }
    .btn {
      margin: 10px 0;
    }
  }
}
</style>
