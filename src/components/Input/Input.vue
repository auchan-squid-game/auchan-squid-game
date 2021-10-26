<template>
  <div :class="['input-container', size]">
    <div v-if="!!label" class="input-label">{{ label }}</div>

    <div class="input">
      <input :type="type" :placeholder="placeholder" :value="value" @input="$emit('update', $event.target.value)" />
    </div>

    <div v-if="!!error" class="input-error">{{ error }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      error: { type: String },
      label: { type: String },
      placeholder: { type: String },
      size: { type: String, default: 'medium', validator: val => ['big', 'medium', 'small'].includes(val) },
      type: { type: String, default: 'text', validator: val => ['text', 'password'].includes(val) },
      value: { type: String },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  .input-container {
    width: 100%;

    &.big {
      border-radius: 10px;

      .input-label {
        height: 20px;
        font-size: 17px;
      }

      input {
        height: 60px;
        padding: 0 20px;
        border-radius: 10px;
        font-size: 20px;
      }
    }

    .input-label {
      color: $color-white;
    }

    input {
      width: 100%;
      border: none;
      background: #ffffff22;
      color: $color-white;
    }

    .input-error {
      color: $color-christmas-red;
    }
  }
</style>
