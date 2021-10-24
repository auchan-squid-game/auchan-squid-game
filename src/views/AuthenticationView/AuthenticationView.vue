<template>
  <DefaultView noUserAuthenticated>
    <Page>
      <div id="auth-page">
        <Login v-if="showLoginView" />
        <Signup v-else />
      </div>
    </Page>
  </DefaultView>
</template>

<script>
  import { DefaultView } from '@/views';

  import Login from './Login';
  import Signup from './Signup';

  import Page from '@/layout/Page';

  export default {
    name: 'AuthenticationView',
    components: { DefaultView, Login, Signup, Page },
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

    :deep(.input-container) {
      margin-bottom: 20px;
    }
  }
</style>
