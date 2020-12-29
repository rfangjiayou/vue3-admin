<template>
  <div class="right">
    <div id="my-diagram"></div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'

export default {
  setup() {
    const instance = getCurrentInstance()
    const myDiagram = ref({})

    onMounted(() => {
      init(instance, myDiagram)
    })
  }
}

function init(instance, myDiagram) {
  const { ctx } = instance
  myDiagram.value = ctx.$make(ctx.$go.Palette, 'my-diagram', {
    initialContentAlignment: ctx.$go.Spot.Center, // 模型图的中心位置所在坐标
    allowDrop: true, // 接受从 Palette 中删除的内容
    // LinkDrawn: this.showLinkLabel, // this DiagramEvent listener is defined below
    // LinkRelinked: this.showLinkLabel,
    scrollsPageOnFocus: false,
    'undoManager.isEnabled': true // 启用Ctrl-Z撤销和Ctrl-Y重做快捷键
  })
}
</script>

<style lang="scss" scoped>
.right {
  height: 100%;
  border-radius: 4px;
  background: $base-color-white;
  flex: 1;
  padding: $base-padding;
  margin-left: 20px;
  min-height: 500px;
  height: calc(100vh - 140px);
  #my-diagram {
    height: 100%;
  }
}
</style>
