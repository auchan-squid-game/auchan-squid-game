<template>
  <Page shouldUserBeAuthenticated>
    <div id="administration-page">
      <EnigmaSection :enigma="{ id: '1', title: 'TITRE DE L\'ENIGME 1' }" />
    </div>
  </Page>
</template>

<script>
  import Page from '@/layout/Page';
  import EnigmaSection from './EnigmaSection';

  export default {
    name: 'AdministationView',
    components: { Page, EnigmaSection },
    beforeMount() {
      if (this.$store.state.user.role !== 'admin') this.$router.push('/');
    },
  };
</script>

<style lang="scss" scoped>
  #administration-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
