<template>
  <div class="flow-chart">
    <Left
      :diagramComplete="diagramComplete"
      @paletteMounted="initPalette"
      class="left"
    />
    <Right @diagramMounted="initDiagram" class="right" />
  </div>
</template>

<script>
import { provide, reactive, ref, toRefs } from 'vue'
import Left from './component/Left'
import Right from './component/Right'

export default {
  components: {
    Left,
    Right
  },
  setup() {
    const state = reactive({
      // class: 'go.GraphLinksModel',
      // nodeDataArray: [
      //   { key: -1, category: 'Start', loc: '175 0', text: 'Start' },
      //   { key: 0, loc: '175 100', text: 'if/else', figure: 'Diamond' },
      //   { key: 1, loc: '10 200', text: 'text1' },
      //   { key: 2, loc: '175 200', text: 'text2' },
      //   { key: 3, loc: '357 200', text: 'text3' },
      //   { key: 4, loc: '175 400', text: 'text4' },
      //   { key: -2, category: 'End', loc: '175 500', text: 'End!' }
      // ]
    })
    const diagram = ref({})
    const palette = ref({})
    const diagramComplete = ref(false)

    provide('$diagram', diagram)
    provide('$palette', palette)

    const {
      initDiagram,
      initPalette
    } = handleMounted(diagram, palette, diagramComplete)

    return {
      ...toRefs(state),
      initDiagram,
      initPalette,
      diagramComplete
    }
  }
}

function handleMounted(diagram, palette, diagramComplete) {
  const initDiagram = (data) => {
    diagram.value = data.value
    diagramComplete.value = true
  }
  const initPalette = (data) => {
    palette.value = data.value
  }

  return {
    initDiagram,
    initPalette
  }
}
</script>

<style lang="scss" scoped>
.flow-chart {
  padding: $base-padding;
  display: flex;
}
</style>
