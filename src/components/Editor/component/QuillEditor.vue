<template>
  <div
    :class="[
      'quill-editor',
      uid && `quill-editor-${uid}`
    ]"
    ref="editor"
  >
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs, watch } from 'vue'

export default {
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    modelValue: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emit: ['ready', 'change', 'input', 'blur', 'focus', 'update:modelValue'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const state = reactive({
      uid: instance.uid,
      targetClass: computed(() => `.quill-editor-${state.uid}`),
      localValue: ''
    })
    const editor = ref(null)

    watch(
      () => props.modelValue,
      (newVal) => {
        const quill = editor.value
        if (quill) {
          if (newVal && newVal !== state.localValue) {
            state.localValue = newVal
            quill.setText ? quill.pasteHTML(newVal) : quill.__quill.pasteHTML(newVal)
          } else if (!newVal) {
            quill.setText ? quill.setText('') : quill.__quill.setText('')
          }
        }
      }
    )

    onMounted(() => {
      init(state, editor, props, emit)
    })

    return {
      ...toRefs(state),
      editor
    }
  }
}

function init(state, editor, props, emit) {
  const {
    options,
    modelValue,
    disabled
  } = toRefs(props)
  const targetDom = document.querySelector(state.targetClass)
  editor.value = new Quill(targetDom, options.value)
  const quill = editor.value

  if (modelValue.value) {
    quill.pasteHTML(modelValue.value)
  }

  quill.on('selection-change', range => {
    if (!range) {
      emit('blur', quill)
    } else {
      emit('focus', quill)
    }
  })

  quill.on('text-change', () => {
    // diabled editor after content initialized
    if (disabled.value) {
      quill.enable(false)
    }
    let html = ''
    quill.root.children.forEach((e, index) => {
      if (index === quill.root.children.length - 1) {
        html += e.innerHTML
      } else {
        html += (e.innerHTML + '</br>')
      }
    })
    state.localValue = html
    const text = quill.getText()
    if (html === '<p><br></p>' || html === '<br>') html = ''

    emit('update:modelValue', html)
    emit('change', { html, text, quill })
  })

  // Emit ready event
  emit('ready', quill)
}
</script>

<style lang="scss" scoped>
.quill-editor {
  transition: none;
}
</style>
