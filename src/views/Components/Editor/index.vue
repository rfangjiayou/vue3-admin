<template>
  <div class="editor-wrap">
    <Tip :message="message" />
    <section class="editor">
      <el-radio-group v-model="radio" @change="radioChange">
        <el-radio :label="false">删除表单校验</el-radio>
        <el-radio :label="true">添加表单校验</el-radio>
      </el-radio-group>
      <el-form
        ref="editorForm"
        :model="form"
        :rules="formRules"
        class="form"
      >
        <el-form-item prop="editor">
          <Editor
            ref="editor"
            class="form-editor"
            v-model="form.editor"
            formProp="editor"
            :placeholder="`请输入内容`"
            imageUploadPath="https://jsonplaceholder.typicode.com/posts/"
            @blur="onBlur"
            @overlength="vaildEditor"
          >
          </Editor>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import Tip from '@/components/Tip'
import Editor from '@/components/Editor'
import { reactive, toRefs, ref, onMounted, nextTick, computed } from 'vue'
import { FormError } from '@/utils'

export default {
  components: {
    Tip,
    Editor
  },
  setup() {
    const message = '富文本编辑器采用quill，用vue3做了一次简单的封装，仅支持部分内容，支持表单校验，相关链接：https://kang-bing-kui.gitbook.io/quill/wen-dang-document/quickstart'
    const state = reactive({
      radio: false,
      form: {
        editor: ''
      },
      formRules: {
        editor: [
          // { required: true, message: '此项不能为空', trigger: 'blur', whitespace: true }
        ]
      }
    })
    const editor = ref(null)
    const editorForm = ref(null)
    const formError = ref(null)

    const schema = computed(() => {
      return {
        editor: [
          () => {
            state.formRules.editor.unshift({
              validator: (rule, value, callback) => callback(new Error('你输入的文字超过500个字数限制，请修改后重新提交'))
            })
            return () => state.formRules.editor.shift()
          }
        ]
      }
    })

    const radioChange = (val) => {
      if (val) {
        state.formRules.editor.push({ required: true, message: '此项不能为空', trigger: 'blur', whitespace: true })
      } else {
        state.formRules.editor = []
      }
      nextTick(() => {
        state.form.editor = ''
        editorForm.value.clearValidate()
      })
    }

    const onBlur = () => {
      editorForm.value.validateField('editor')
    }

    const vaildEditor = (error, prop, isOverLength) => {
      if (error) {
        switch (prop) {
          case 'editor':
            if (isOverLength) {
              formError.value.display(prop, schema.value)
            }
            break
          default:
            break
        }
      } else {
        editorForm.value.validate(prop)
      }
    }

    onMounted(() => {
      if (!formError.value) {
        nextTick(() => {
          formError.value = new FormError(editorForm.value)
        })
      }
    })

    return {
      message,
      ...toRefs(state),
      editor,
      editorForm,
      onBlur,
      vaildEditor,
      radioChange
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-wrap {
  padding: $base-padding;
  .editor {
    margin-top: 20px;
    border-radius: $base-border-radius;
    background: $base-color-white;
    padding: $base-padding;
    .form {
      margin-top: 30px;
    }
  }
}
</style>
