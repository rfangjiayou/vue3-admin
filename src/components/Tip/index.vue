<template>
  <div class="tip">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  },
  setup(props) {
  }
}
</script>

<style lang="scss" scoped>
.tip {
  padding: 10px $base-padding;
  background:rgba(51, 112, 255, 0.1);
  border: 1px solid $base-color-default;
  border-radius: $base-border-radius;
  p {
    color: #555555;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    word-break: break-word;
  }
}
</style>
