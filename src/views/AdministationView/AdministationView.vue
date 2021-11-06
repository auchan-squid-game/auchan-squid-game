<template>
  <Page shouldUserBeAuthenticated>
    <div id="administration-page">
      <EnigmaSection v-for="(enigma, id) in answersToCheck" :key="id" :enigma="enigma" />
    </div>
  </Page>
</template>

<script>
  import Page from '@/layout/Page';
  import EnigmaSection from './EnigmaSection';

  export default {
    name: 'AdministationView',
    components: { Page, EnigmaSection },
    computed: {
      answersToCheck() {
        return this.$store.state.answersToCheck;
      },
    },
    beforeMount() {
      if (this.$store.state.user.role !== 'admin') {
        this.$router.push('/');
      } else {
        this.$store.dispatch('getAllReponsesToCheck');
      }
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

    .enigma-section {
      margin-bottom: 30px;
    }
  }
</style>
