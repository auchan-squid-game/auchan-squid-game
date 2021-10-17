<template>
  <div class="auth-form">
    <div class="title">{{ title }}</div>
    <slot />
    <Button :label="submitLabel" color="christmas" size="big" @click="submit" />
  </div>
</template>

<script>
  import { Button } from '@/components';

  export default {
    name: 'AuthentificationForm',
    components: { Button },
    props: {
      submit: { type: Function, required: true },
      submitLabel: { type: String, required: true },
      title: { type: String, required: true },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  .auth-form {
    width: 400px;

    .title {
      padding-bottom: 30px;
      color: $color-christmas-yellow-dark;
      font-size: 40px;
    }
  }
</style>
