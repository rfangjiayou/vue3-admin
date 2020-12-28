<template>
  <div class="self-panel">
    <el-skeleton
      :loading="loading"
      animated
      :throttle="500"
    >
      <template #template>
        <el-skeleton-item
          variant="image"
        />
        <div style="padding: 14px;">
          <el-skeleton-item variant="h3" style="width: 50%;" />
          <el-skeleton-item variant="text" style="margin-top: 10px;" />
        </div>
        <div style="padding: 14px;">
          <el-skeleton-item variant="h3" style="width: 50%;" />
          <el-skeleton-item variant="text" style="margin-top: 10px;" />
        </div>
        <div style="padding: 14px;">
          <el-skeleton-item variant="h3" style="width: 50%;" />
          <el-skeleton-item variant="text" style="margin-top: 10px;" />
        </div>
      </template>
      <template #default>
        <img :src="imgUrl" class="self-panel-img">
        <div class="process">
          <template v-for="item in processList" :key="item.label">
            <div class="label">{{item.label}}</div>
            <el-progress
              :percentage="item.percentage"
              :status="item.percentage === 100 ? 'success' : ''"
            />
          </template>
          <Avatar class="self-avatar" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref } from 'vue'
import { getSelfPanelData } from '@/services'
import Avatar from '@/components/Avatar'

export default {
  components: {
    Avatar
  },
  setup() {
    const loading = ref(true)
    const state = reactive({
      processList: [],
      imgUrl: ''
    })

    onMounted(() => {
      init(state, loading)
    })

    return {
      ...toRefs(state),
      loading
    }
  }
}

async function init(state, loading) {
  const { success, result } = await getSelfPanelData()
  if (success) {
    const { list, imgUrl } = result
    state.processList = list
    state.imgUrl = imgUrl

    setTimeout(() => {
      loading.value = false
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.self-panel {
  border-radius: 4px;
  overflow: hidden;
  background: $base-color-white;
  ::v-deep(.el-skeleton__image) {
    width: 100% !important;
    height: 240px;
  }
}
.self-panel-img {
  object-fit: cover;
  &:hover {
    transform: scale(1.1);
  }
}
.process {
  position: relative;
  padding: $base-padding $base-padding 40px $base-padding;
  .label {
    font-size: 16px;
    line-height: 30px;
    margin-top: 10px;
    &:first-child {
      margin-top: 30px;
    }
  }
  .self-avatar {
    position: absolute;
    top: -35px;
    left: 30px;
  }
}
</style>
