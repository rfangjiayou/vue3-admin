<template>
  <div class="drag-dialog-wrap">
    <Tip :message="message" />
    <div class="drag-dialog-wrap__inner">
      <el-button @click="visible = true" class="btn" size="small">打开弹窗</el-button>
    </div>
    <el-dialog
      title="可拖拽Dialog"
      width="30%"
      v-model="visible"
      v-drag
    >
      <span>这是一段信息</span>
      <template #footer>
        <span v-drag class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="visible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { toRefs, reactive } from 'vue'
import Tip from '@/components/Tip'

export default {
  components: {
    Tip
  },
  setup() {
    const state = reactive({
      message: '自定义指令实现可拖拽弹窗',
      visible: false
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-dialog-wrap {
  padding: $base-padding;
  &__inner {
    margin-top: 20px;
    border-radius: $base-border-radius;
    background: $base-color-white;
    padding: $base-padding;
  }
}
</style>
