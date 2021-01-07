<template>
  <div class="todo-list">
    <div class="back-top">
      <div class="header">
        <CheckBtn v-model="checkAll" @click="handleClick" />
        <span class="title">Todo List</span>
      </div>
      <ul>
        <transition-group name="todo-list">
          <li
            v-for="(item, index) in todoList"
            :key="item.name"
          >
            <div
              class="list-item"
              @mouseenter="item.showDelete = true"
              @mouseleave="item.showDelete = false"
            >
              <CheckBtn v-model="item.checked" />
              <span
                :class="[
                  'label',
                  item.checked && 'checked-label'
                ]"
              >{{item.name}}</span>
              <IconSvg
                v-show="item.showDelete"
                class="delete"
                iconName="close"
                @click="deleteItem(index)"
              />
            </div>
          </li>
        </transition-group>
      </ul>
      <div class="bottom">
        <span>{{leftItems}} items left</span>
        <el-input class="add-input" v-model="addItem.name" placeholder="请输入内容" size="mini"></el-input>
        <el-button type="primary" size="mini" @click="handleAddItem">Push</el-button>
      </div>
    </div>
    <div class="back-mid"></div>
    <div class="back-bottom"></div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, reactive, toRefs, watch } from 'vue'
import CheckBtn from './component/CheckBtn'

export default {
  name: 'TodeList',
  props: {
    list: {
      type: Array,
      require: true
    }
  },
  components: {
    CheckBtn
  },
  setup(props) {
    const instance = getCurrentInstance()
    const list = computed(() => props.list)
    const state = reactive({
      todoList: list,
      checkAll: false,
      addItem: {
        name: '',
        checked: false,
        showDelete: false
      }
    })

    const leftItems = computed(() => {
      const found = state.todoList.filter(e => !e.checked)
      return found.length
    })

    watch(
      () => state.todoList,
      (val) => {
        const found = val.find(e => !e.checked)
        state.checkAll = !found
      },
      {
        deep: true
      }
    )

    const {
      handleClick,
      handleAddItem,
      deleteItem
    } = useClick(instance, state)

    return {
      ...toRefs(state),
      handleClick,
      leftItems,
      handleAddItem,
      deleteItem
    }
  }
}

function useClick(instance, state) {
  const handleClick = () => {
    state.todoList.forEach(e => {
      e.checked = state.checkAll
    })
  }
  const handleAddItem = () => {
    if (!state.addItem.name) {
      instance.proxy.$baseMessage('error', '不能为空！')
      return
    }
    const found = state.todoList.find(e => e.name === state.addItem.name)
    if (found) {
      instance.proxy.$baseMessage('warning', '项目已存在！')
      return
    }
    state.todoList.push(JSON.parse(JSON.stringify(state.addItem)))
    state.addItem.name = ''
  }
  const deleteItem = (index) => {
    state.todoList.splice(index, 1)
  }

  return {
    handleClick,
    handleAddItem,
    deleteItem
  }
}
</script>

<style lang="scss" scoped>
.todo-list {
  position: relative;
  // height: calc(100% - 15px);
  width: calc(100% - 15px);
  height: 100%;
  .back-top {
    position: relative;
    z-index: 10;
    height: 100%;
    width: 100%;
    border: 1px solid $base-border-color;
    background: $base-color-white;
    .header {
      display: flex;
      align-items: center;
      padding: 10px $base-padding;
      border-bottom: 1px solid $base-color-gray;
      .title {
        margin-left: 20px;
        font-size: 18px;
        font-style: italic;
        font-weight: 600;
        color: $base-font-color;
      }
    }
    ul {
      margin-bottom: 48px;
    }
    .list-item {
      padding: 10px $base-padding;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(207, 202, 202, 0.45);
      .label {
        font-size: 16px;
        margin-left: 20px;
      }
      .checked-label {
        text-decoration: line-through;
        opacity: .5;
      }
      .delete {
        margin-left: auto;
        color: $base-color-red;
        cursor: pointer;
        font-size: 18px;
      }
      &:hover {
        background-color: #f5f7fa;
        transition: background-color .25s ease;
        border-bottom-color: #ebeef5;
      }
    }
    .bottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      padding: 10px $base-padding;
      >span {
        margin-right: 100px;
        min-width: 100px;
      }
      .add-input {
        margin-left: auto;
        margin-right: 10px;
      }
    }
  }
  .back-mid, .back-bottom {
    position: absolute;
    height: 100%;
    width: 100%;
    border: 1px solid $base-border-color;
    background: $base-color-white;
  }
  .back-mid {
    top: 10px;
    left: 10px;
  }
  .back-bottom {
    top: 5px;
    left: 5px;
  }
}
</style>
