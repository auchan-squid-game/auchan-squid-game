<template>
  <div id="page">
    <Header />

    <div id="page-container">
      <slot />
    </div>
  </div>
</template>

<script>
  import Header from '@/layout/Header';

  export default {
    name: 'Page',
    components: { Header },
  };
</script>

<style lang="scss" scoped>
  #page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 100;

    #page-container {
      flex: 1;
    }
  }
</style>
