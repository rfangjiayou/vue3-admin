<template>
  <div class="left">
     <div id="my-palette"></div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'

export default {
  setup() {
    const instance = getCurrentInstance()
    const myPalette = ref({})

    onMounted(() => {
      init(instance, myPalette)
    })
  }
}

function init(instance, myPalette) {
  const { ctx } = instance
  myPalette.value = ctx.$make(ctx.$go.Palette, 'my-palette', {
    // scrollsPageOnFocus: false,
    // 分享 myDiagram 的模板
    // nodeTemplateMap: this.myDiagram.nodeTemplateMap,
    // 指定 myPalette 显示的内容
    model: new ctx.$go.GraphLinksModel([
      { category: 'Start', text: 'Start' },
      { text: 'Step' },
      { text: '???', figure: 'Diamond' },
      { category: 'End', text: 'End' },
      { category: 'Comment', text: 'Comment' }
    ])
  })
}
</script>

<style lang="scss" scoped>
.left {
  border-radius: 4px;
  background: $base-color-white;
  width: 180px;
  padding: $base-padding;
  min-height: 500px;
  height: calc(100vh - 140px);
  #my-palette {
    height: 100%;
  }
}
</style>
