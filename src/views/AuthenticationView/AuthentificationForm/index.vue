<template>
  <div class="auth-form" @keyup.enter="submit">
    <div class="title">{{ title }}</div>
    <slot />
    <Button :label="submitLabel" color="christmas" size="big" :loading="processing" @click="submit" />
  </div>
</template>

<script>
  import { Button } from '@/components';

  export default {
    name: 'AuthentificationForm',
    components: { Button },
    props: {
      processing: { type: Boolean },
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
