<template>
  <span
    :class="[
      'check',
      checked && 'checked-wrap'
    ]"
    @click="handleCheck"
  >
    <!-- <transition name="fade"> -->
      <IconSvg
        v-if="checked"
        class="checked"
        iconName="checked"
      />
    <!-- </transition> -->
  </span>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  name: 'CheckBtn',
  emit: ['update:modelValue'],
  props: {
    modelValue: Boolean
  },
  setup(props, { emit }) {
    const checked = ref(props.modelValue)

    const handleCheck = () => {
      checked.value = !checked.value
      emit('update:modelValue', checked.value)
    }

    watch(
      computed(() => props.modelValue),
      (val) => {
        checked.value = val
      }
    )

    return {
      checked,
      handleCheck
    }
  }
}
</script>

<style lang="scss" scoped>
.check {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(207, 202, 202, 0.65);
  cursor: pointer;
  .checked {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: $base-color-green;
    margin-top: 2px;
  }
}
.checked-wrap {
  border: 1px solid $base-color-gray;
}
</style>
