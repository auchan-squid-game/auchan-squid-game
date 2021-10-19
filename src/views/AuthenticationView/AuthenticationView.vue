<template>
  <Page>
    <div id="auth-page">
      <Login v-if="showLoginView" />
      <Signup v-else />
    </div>
  </Page>
</template>

<script>
  import Login from './Login';
  import Signup from './Signup';

  import Page from '@/layout/Page';

  export default {
    name: 'AuthenticationView',
    components: { Login, Signup, Page },
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
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    z-index: 100;

    :deep(.input-container) {
      margin-bottom: 20px;
    }
  }
</style>
