<template>
  <div class="todo-list">
    <div class="back-top">
      <div class="header">
        <CheckBtn v-model="checkAll" @click="handleClick" />
        <span class="title">Todo List</span>
      </div>
      <ul>
        <li
          v-for="item in todoList"
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
              v-if="item.showDelete"
              class="delete"
              iconName="fullscreen"
            />
          </div>
        </li>
      </ul>
      <div class="bottom"></div>
    </div>
    <div class="back-mid"></div>
    <div class="back-bottom"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import CheckBtn from './component/CheckBtn'

export default {
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
    const state = reactive({
      todoList: props.list,
      checkAll: false
    })

    const handleClick = () => {
      state.todoList.forEach(e => {
        e.checked = !state.checkAll
      })
    }

    // watch(
    //   () => state.todoList,
    //   (val) => {
    //     const found = val.find(e => !e.checked)
    //     state.checkAll = !found
    //   },
    //   {
    //     deep: true
    //   }
    // )

    return {
      ...toRefs(state),
      handleClick
    }
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
    position: absolute;
    top: 0;
    left: 0;
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
