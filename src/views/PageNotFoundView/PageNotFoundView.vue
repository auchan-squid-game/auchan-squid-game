<template>
  <div id="page-not-found">
    <Deer />

    <div id="title">Ho Ho Ho !!!</div>

    <div id="description">Tu n'aurais pas du te retrouver là...</div>

    <Button icon="back" label="RETOUR" color="christmas" size="medium" type="christmas" @click="$router.push('/')" />
  </div>
</template>

<script>
  import Deer from './Deer';

  import { Button } from '@/components';

  export default {
    name: 'PageNotFoundView',
    components: { Deer, Button },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  #page-not-found {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: $color-white;
    font-family: 'Christmas';

    & :deep(div) {
      box-sizing: initial !important;
    }

    #title {
      padding: 50px 0 30px;
      font-size: 100px;
    }

    #description {
      padding-bottom: 75px;
      font-size: 40px;
    }

    :deep(.btn) {
      // background: transparent;
    }
  }
</style>
