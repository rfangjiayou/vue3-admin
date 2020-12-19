<template>
  <div class="login">
    <div class="banner"></div>
    <div class="login__inner">
      <h3>欢迎来到 Vue3 Admin</h3>
      <el-form
        :model="loginForm"
        :rules="formRules"
        ref="form"
      >
        <el-form-item prop="username" class="form-basic">
          <el-input v-model="loginForm.username" placeholder="请输入您的邮箱/手机号码">
            <template #prefix>
              <IconSvg
                :iconName="`username_pre`"
                class="icon username-pre"
              />
              <!-- <i class="username-pre"></i> -->
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-basic">
          <el-input v-model="loginForm.password" :type="pwdType" placeholder="请输入您的登录密码" @keyup.enter="submit">
            <template #prefix>
              <IconSvg
                :iconName="`pwd_pre`"
                class="icon pwd-pre"
              />
              <!-- <i class="pwd-pre"></i> -->
            </template>
            <template #suffix>
              <IconSvg
                v-if="pwdVisible"
                :iconName="`pwd_suf2`"
                class="icon pwd-suf-eye"
                @click="pwdVisible = !pwdVisible"
              />
              <IconSvg
                v-else
                :iconName="`pwd_suf`"
                class="icon pwd-suf"
                @click="pwdVisible = !pwdVisible"
              />
              <!-- <i v-if="pwdVisible" class="pwd-suf-eye" @click="pwdVisible = !pwdVisible"></i> -->
              <!-- <i v-else class="pwd-suf" @click="pwdVisible = !pwdVisible"></i> -->
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">登 录</el-button>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, toRefs, getCurrentInstance } from 'vue'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  setup(props) {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      loginForm: {
        username: '',
        password: ''
      },
      formRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      pwdType: computed(() => state.pwdVisible ? 'text' : 'password'),
      pwdVisible: false
    })
    const form = ref(null)
    const { submit } = useClick(proxy, state, form)

    return {
      ...toRefs(state),
      form,
      submit
    }
  },
  methods: {
    ...mapActions('user', [
      'login'
    ])
  }
}

const useClick = (instance, state, refForm) => {
  const submit = () => {
    refForm.value.validate(async(valid) => {
      if (!valid) return false

      const { loginForm } = state
      const success = await instance.login(loginForm)
      if (success) {
        instance.$router.push({ path: '/' })
      }
    })
  }

  return {
    submit
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100%;
  min-height: 800px;
  display: flex;
  .banner {
    flex: 1;
    background: url("~@/assets/login-bg.jpg") center / cover no-repeat;
  }
  &__inner {
    flex: 0.6;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3 {
      font-size: 28px;
      margin-bottom: 50px;
    }
    .form-basic {
      width: 360px;
      .icon {
        font-size: 14px;
      }
      .username-pre {
        margin: 13px 10px 0 5px;
      }
      .pwd-pre {
        margin: 13px 10px 0 5px;
      }
      .pwd-suf, .pwd-suf-eye {
        margin: 13px 9px 0 0;
        &:hover {
            cursor: pointer;
        }
      }
    }
    /deep/ .el-button {
      margin-top: 20px;
      width: 360px;
    }
  }
}
</style>
