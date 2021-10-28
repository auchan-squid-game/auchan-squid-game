<template>
  <Page shouldUserBeAuthenticated>
    <div id="administration-page"></div>
  </Page>
</template>

<script>
  import Page from '@/layout/Page';

  export default {
    name: 'AdministationView',
    components: { Page },
    beforeMount() {
      if (this.$store.state.user.role !== 'admin') this.$router.push('/');
    },
  };
</script>

<style lang="scss" scoped>
  #administration-page {
    width: 100%;
    height: 100%;
  }
</style>
