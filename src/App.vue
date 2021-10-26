<template>
  <div v-if="isAppLoaded" id="root">
    <Snowflakes />
    <router-view />
  </div>
</template>

<script>
  import Snowflakes from '@/layout/Snowflakes';

  export default {
    name: 'App',
    components: { Snowflakes },
    computed: {
      isAppLoaded() {
        return this.$store.state.app.isLoaded;
      },
    },
    beforeMount() {
      this.$store.dispatch('syncActions');
    },
  };
</script>

<style lang="scss">
  @import '@/assets/scss/_colors.scss';

  @font-face {
    font-family: 'Christmas';
    src: url('./assets/fonts/christmas.otf');
  }

  @font-face {
    font-family: 'Coolvetica';
    src: url('./assets/fonts/coolvetica.ttf');
  }

  @font-face {
    font-family: 'Monoround';
    src: url('./assets/fonts/monoround.otf');
  }

  html,
  body,
  #app,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: $color-background;
    font-family: 'Monoround';
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  * {
    box-sizing: border-box;
    outline: none;
  }
</style>
