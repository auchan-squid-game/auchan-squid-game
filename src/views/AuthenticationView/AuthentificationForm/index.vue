<template>
  <div class="auth-form">
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
    },
  };
</script>

<style lang="scss" scoped>
  .auth-form {
    width: 400px;
  }
</style>
