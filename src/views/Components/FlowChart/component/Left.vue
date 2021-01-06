<template>
  <div class="left">
     <div id="my-palette"></div>
  </div>
</template>

<script>
import { getCurrentInstance, inject, onMounted, reactive, ref } from 'vue'
import { nodeTemplate } from '@/utils'

export default {
  props: {
    diagramComplete: Boolean
  },
  emits: ['paletteMounted'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    // const { diagramComplete } = toRefs(props)
    const $myDiagram = inject('$diagram')

    const myPalette = ref({})
    const state = reactive({
      nodeDataArray: [
        { key: 'RoundRectangle', color: '#42b983', fig: 'RoundedRectangle' },
        { key: 'Hexagon', color: 'lightblue', fig: 'Hexagon' },
        { key: '???', color: 'orange', fig: 'Diamond' },
        { key: '', color: 'lightblue', fig: 'MinusLine' }
      ],
      linkDataArray: []
    })

    onMounted(() => {
      init(instance, state, myPalette, $myDiagram)
      emit('paletteMounted', myPalette)
    })
  }
}

function init(instance, state, myPalette, $myDiagram) {
  const { ctx } = instance
  myPalette.value = ctx.$make(ctx.$go.Palette, 'my-palette', {
    // 令绘制的元素相对画布居中
    initialContentAlignment: ctx.$go.Spot.Center,
    // 是否可撤销编辑
    'undoManager.isEnabled': true,
    // scrollsPageOnFocus: false,
    // 分享 myDiagram 的模板
    // nodeTemplateMap: $myDiagram.value.nodeTemplateMap,
    nodeTemplate,
    // 指定 myPalette 显示的内容
    model: new ctx.$go.GraphLinksModel(state.nodeDataArray, state.linkDataArray)
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
