<template>
  <div id="auth-page">
    <Login v-if="showLoginView" />
    <Signup v-else />
  </div>
</template>

<script>
  import Login from './Login';
  import Signup from './Signup';

  export default {
    name: 'AuthenticationView',
    components: { Login, Signup },
    computed: {
      showLoginView() {
        return this.$route.path === '/login';
      },
    },
  };
</script>

<style lang="scss" scoped>
  #auth-page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 100;

    :deep(.input-container) {
      margin-bottom: 20px;
    }
  }
</style>
