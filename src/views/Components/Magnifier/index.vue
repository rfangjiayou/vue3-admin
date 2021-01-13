<template>
  <div class="magnifier-wrap">
    <Tip :message="message" />
    <div class="magnifier-wrap__inner">
      <el-card
        shadow="none"
        class="card"
      >
        <template #header>
          <div class="clearfix">放大镜</div>
        </template>
        <Magnifier
          :url="img"
          :type="type"
          :scale="scale"
          :zoomWidth="zoomSizeInfo.width"
          :zoomHeight="zoomSizeInfo.height"
        />
      </el-card>
      <div class="operate-panel">
        <el-card
          shadow="none"
          class="card"
          :body-style="{ padding: '0px' }"
        >
          <template #header>
            <div class="clearfix">
              <p>放大镜形状</p>
              <el-switch
                v-model="type"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="circle"
                inactive-value="rect"
                active-text="圆形"
                inactive-text="正方形"
              >
              </el-switch>
              <p>放大镜大小（宽高相等）</p>
              <el-slider
                class="slider"
                tooltip-class="slider-popover"
                v-model="zoomSize"
                :min="100"
                :max="200"
                :step="5"
              />
              <p>放大倍数</p>
              <el-slider
                class="slider"
                tooltip-class="slider-popover"
                v-model="scale"
                :min="2"
                :max="6"
              />
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import Tip from '@/components/Tip'
import Magnifier from '@/components/Magnifier'
import { reactive, toRefs, watch } from 'vue'
// import { getImages } from '@/services'
import magnifier from '@/assets/magnifier.jpg'

export default {
  components: {
    Tip,
    Magnifier
  },
  setup() {
    const state = reactive({
      message: '放大镜组件，移动端适配还有bug，稍后有时间会解决',
      img: magnifier,
      type: 'rect',
      zoomSize: 150,
      zoomSizeInfo: {
        width: 150,
        height: 150
      },
      scale: 2
    })

    watch(
      () => state.zoomSize,
      (val) => {
        state.zoomSizeInfo.width = val
        state.zoomSizeInfo.height = val
      },
      {
        deep: true
      }
    )

    // onMounted(() => {
    //   getVerifyCustom()
    // })

    // const getVerifyCustom = async() => {
    //   const { success, result } = await getImages({ width: 800, height: 600 })
    //   if (success) {
    //     state.img = result.imgUrl
    //   }
    // }

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.magnifier-wrap {
  padding: $base-padding;
  &__inner {
    margin-top: 20px;
    border-radius: $base-border-radius;
    background: $base-color-white;
    padding: $base-padding;
    display: flex;
    .card {
      max-width: 842px;
    }
    .operate-panel {
      margin-left: 20px;
      ::v-deep(.el-switch) {
        margin: 10px 0 20px 0;
      }
      .slider {
        width: 300px;
        ::v-deep(.el-slider__button-wrapper), ::v-deep(.el-slider__bar){
          transition: none;
        }
      }
    }
  }
}
</style>
