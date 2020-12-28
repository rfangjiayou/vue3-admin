<template>
  <div class="avatar">
    <div class="username">{{name}}</div>
    <div class="avatar__inner" :style="`background-image:url(${avatarUrl || defaultUrl})`">
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    url: String,
    username: String
  },
  setup(props) {
    const defaultUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    const avatarUrl = computed(() => props.url)
    const name = computed(() => props.username)

    return {
      defaultUrl,
      avatarUrl,
      name
    }
  }
}
</script>

<style lang="scss" scoped>
$--avatar-height: 70px;
$--avatar-width: 70px;
.avatar {
  position: relative;
  height: $--avatar-height;
  width: $--avatar-width;
  border-radius: 50%;
  background: $base-color-white;
  padding: 5px;
  .username {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: $--avatar-width - 10px;
    width: $--avatar-width - 10px;
  }
  .avatar__inner {
    position: absolute;
    border-radius: 50%;
    z-index: 1;
    left: 5px;
    top: 5px;
    height: $--avatar-width - 10px;
    width: $--avatar-width - 10px;
    background: center / cover no-repeat;
    transform-origin: right 40%;
  }
  &:hover {
    .avatar__inner {
      transform: rotate(-110deg);
    }
  }
}
</style>
