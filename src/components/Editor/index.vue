<template>
  <div class="q-editor" :id="`q-editor-${uploadBtnId}`">
    <el-upload
      :class="`avatar-upload-${uploadBtnId}`"
      class="upload-btn"
      :name="uploadFileName"
      :action="imageUploadPath"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-error="uploadError"
    >
    </el-upload>
    <quill-editor
      v-model="localValue"
      ref="editor"
      :options="editorOption"
      @change="handleChange"
      @blur="onEditorBlur"
      @focus="onEditorFocus"
      @ready="onEditorReady"
    >
    </quill-editor>
</div>
</template>

<script>
import QuillEditor from './component/QuillEditor'
import { onMounted, reactive, toRefs, ref, getCurrentInstance, onBeforeUnmount, watch } from 'vue'

export default {
  name: 'Editor',
  props: {
    uploadBtnId: {
      type: String,
      default: 'u01'
    },
    modelValue: String,
    formProp: {
      type: String,
      default: ''
    },
    pasteimage: {
      type: Boolean,
      default: true
    },
    imageUploadPath: { // 上传图片的路径
      type: String,
      default: ''
    },
    uploadFileName: { // 上传图片的后台需要的文件名
      type: String,
      default: 'file'
    },
    minLength: { // 字数限制
      type: Number,
      default: 0
    },
    maxLength: { // 字数限制
      type: Number,
      default: 500
    },
    toolbar: { // toolbar配置
      type: Array,
      default: () => [
        ['bold', 'italic', 'underline', 'strike', { color: [] }, { background: [] }, { align: [] }, 'image', 'clean'] // 加粗，斜体，下划线，删除线，颜色选择，居中
        // ['blockquote', 'code-block'],                      //引用，代码块
        // [{ 'header': 1 }, { 'header': 2 }],               // 几级标题
        // [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 有序列表，无序列表
        // [{ 'script': 'sub'}, { 'script': 'super' }],      // 下角标，上角标
        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
        // [{ 'direction': 'rtl' }],                         // 文字输入方向
        // [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],// 标题
        // [{ 'font': [] }],// 字体
      ]
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    imageSize: {
      type: Number,
      default: 3
    }
  },
  components: {
    QuillEditor
  },
  emits: ['change', 'blur', 'overlength', 'update:modelValue'],
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const {
      placeholder,
      toolbar,
      uploadBtnId,
      modelValue
    } = toRefs(props)
    const editor = ref(null)
    const state = reactive({
      localValue: '',
      editorOption: {
        placeholder,
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbar,
            handlers: {
              image: function(value) {
                // QuillWatch.emit(this.quill.id)
                if (value) {
                  const targetDomClass = `#q-editor-${uploadBtnId.value} .avatar-upload-${uploadBtnId.value}`
                  const targetDom = document.querySelector(targetDomClass)
                  targetDom && targetDom.children && targetDom.children[0] && targetDom.children[0].click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      titleConfig: {
        'ql-bold': '加粗',
        'ql-color': '颜色',
        'ql-font': '字体',
        'ql-code': '插入代码',
        'ql-italic': '斜体',
        'ql-link': '添加链接',
        'ql-background': '背景颜色',
        'ql-size': '字体大小',
        'ql-strike': '删除线',
        'ql-script': '上标/下标',
        'ql-underline': '下划线',
        'ql-blockquote': '引用',
        'ql-header': '标题',
        'ql-indent': '缩进',
        'ql-list': '列表',
        'ql-align': '文本对齐',
        'ql-direction': '文本方向',
        'ql-code-block': '代码块',
        'ql-formula': '公式',
        'ql-image': '图片',
        'ql-video': '视频',
        'ql-clean': '清除字体样式'
      }
    })

    watch(
      () => modelValue,
      (val) => {
        state.localValue = val.value
      },
      {
        deep: true
      }
    )

    watch(
      () => state.localValue,
      (val) => {
        emit('update:modelValue', val)
      },
      {
        deep: true
      }
    )

    const {
      handleChange,
      onEditorBlur,
      onEditorFocus,
      onEditorReady
    } = useEditor(state, emit, props)

    const {
      handleSuccess,
      uploadError
    } = useUpload(instance, editor)

    onMounted(() => {
      init(state, editor, props)
    })

    onBeforeUnmount(() => {
      // const quill = editor.value.editor
      // if (quill.root) {
      //   quill.root.removeEventListener('paste', handlePaste, false)
      // }
    })

    return {
      ...toRefs(state),
      editor,
      handleChange,
      onEditorBlur,
      onEditorFocus,
      onEditorReady,
      handleSuccess,
      uploadError
    }
  }
}

function init(state, editor) {
  // const quill = editor.value.editor
  // quill.root.addEventListener('paste', handlePaste, false)

  addQuillTitle(state)
}

// function handlePaste(evt) {
//   if (evt.clipboardData && evt.clipboardData.files && evt.clipboardData.files.length) {
//     const _this = this
//     evt.preventDefault();
//     [].forEach.call(evt.clipboardData.files, file => {
//       if (!this.pasteimage) {
//         return
//       }
//       if (!file.type.match(/^image\/(gif|jpe?g|a?png|bmp)/i)) {
//         return
//       }

//       const formData = new FormData()
//       formData.append(_this.uploadFileName, file, file.name)

//       const xhr = new XMLHttpRequest()
//       xhr.withCredentials = false
//       xhr.open('POST', _this.imageUploadPath)
//       xhr.onload = () => {
//         if (xhr.status !== 200) {
//           const { message } = JSON.parse(xhr.responseText)
//           _this.$message({
//             type: 'error',
//             message: message || ''
//           })
//           return
//         }
//         const { code, result, msg } = JSON.parse(xhr.responseText)
//         if (code === 200) {
//           const quill = _this.$refs[`myQuillEditor-${this.uploadBtnId}`].quill
//           const range = quill.getSelection()
//           // const random = Math.floor(Math.random() * 8)
//           // const resUrl = url.find((value, key) => random === key)
//           if (range) {
//             //  在当前光标位置插入图片
//             quill.insertEmbed(range.index, 'image', result.img_url)
//             //  将光标移动到图片后面
//             quill.setSelection(range.index + 1)
//           }
//         } else {
//           _this.$message({
//             type: 'error',
//             message: msg ? `上传失败，${msg}` : '上传失败'
//           })
//         }
//       }
//       xhr.send(formData)
//     })
//   }
// }

function addQuillTitle(state) {
  const oToolBar = document.querySelectorAll('.ql-toolbar')
  oToolBar.forEach(element => {
    const aButton = element.querySelectorAll('button')
    const aPicker = element.querySelectorAll('.ql-formats .ql-picker')
    aButton.forEach(function(item) {
      if (item.className === 'ql-script') {
        item.value === 'sub' ? item.title = '下标' : item.title = '上标'
      } else if (item.className === 'ql-indent') {
        item.value === '+1' ? item.title = '向右缩进' : item.title = '向左缩进'
      } else {
        item.title = state.titleConfig[item.classList[0]]
      }
    })
    aPicker.forEach(function(item) {
      if (
        Array.from(item.classList).indexOf('ql-color') > -1 ||
        Array.from(item.classList).indexOf('ql-background') > -1 ||
        Array.from(item.classList).indexOf('ql-align') > -1
      ) {
        const options = item.querySelector('.ql-picker-options')
        options.title = ''
      }
      item.title = state.titleConfig[item.classList[0]]
    })
  })
}

function vaildTextLength(value, maxLength, minLength, emit, formProp) {
  const text = value
  if (text && text.length - 1 > maxLength.value) {
    emit('overlength', true, formProp.value, true)
    return true
  } else if (text && text.length - 1 < minLength.value) {
    emit('overlength', true, formProp.value, false)
    return true
  } else {
    emit('overlength', false, formProp.value)
    return false
  }
}

function useEditor(state, emit, props) {
  const {
    maxLength,
    minLength,
    formProp
  } = toRefs(props)

  const handleChange = (...args) => {
    // const html = args && args[0] && args[0].html
    // emit('update:modelValue', state.localValue)
  }
  const onEditorBlur = (...args) => {
    const quill = args && args[0] && args[0]
    const text = quill.getText()
    emit('blur', formProp)
    // 检测字数
    vaildTextLength(text, maxLength, minLength, emit, formProp)
  }
  const onEditorFocus = () => {
  }
  const onEditorReady = () => {
  }

  return {
    handleChange,
    onEditorBlur,
    onEditorFocus,
    onEditorReady
  }
}

function useUpload(instance, editor) {
  const handleSuccess = (response) => {
    const { code, result, msg } = response
    if (code === 200) {
      const quill = editor.value.editor
      const range = quill.getSelection()
      // const random = Math.floor(Math.random() * 8)
      // const resUrl = url.find((value, key) => random === key)
      if (range) {
        //  在当前光标位置插入图片
        quill.insertEmbed(range.index, 'image', result.img_url)
        //  将光标移动到图片后面
        quill.setSelection(range.index + 1)
      }
    } else {
      instance.ctx.$baseMessage('error', msg || '图片上传失败！')
    }
  }
  const uploadError = (res, file) => {
    if (res && file.status === 'fail') {
      instance.ctx.$baseMessage('error', res.message || '图片上传失败！')
    }
  }

  return {
    handleSuccess,
    uploadError
  }
}
</script>

<style lang="scss" scoped>
.q-editor {
  transition: none;
  * {
    transition: none;
  }
  margin-top: -30px;
  /deep/ .ql-container {
    .ql-editor {
      resize: vertical;
      min-height: 200px;
    }
    img {
      display: inline;
    }
  }
  .upload-btn {
    visibility: hidden;
    /deep/ div {
      height: 0;
    }
    /deep/ button {
      height: 0;
      width: 0;
      border: none;
    }
  }
  /deep/ .ql-toolbar {
    height: 30px;
    line-height: 27px;
    padding: 0 8px;
    background-color: #f1f1f1;
    .ql-picker {
      line-height: 20px;
      .ql-picker-label:focus {
        outline: none;
      }
    }
  }
}
</style>
