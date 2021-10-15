<template>
  <div id="header">
    <div id="logo">Auchan Squid Game</div>
    <div v-if="isUserAuthenticated" id="header-menu">
      <div class="header-menu-item selected">LE JEU</div>
      <div class="header-menu-item">LE CLASSEMENT</div>
      <div class="header-menu-item">NOUS CONTACTER</div>
      <div v-if="false" class="header-menu-item">ADMINISTRATION</div>
    </div>
    <div v-if="isUserAuthenticated" id="header-actions">
      <Button icon="logout" label="DECONNEXION" color="default" size="medium" type="classic" />
    </div>
  </div>
</template>

<script>
  import { Button } from '@/components';

  export default {
    name: 'Header',
    components: { Button },
    computed: {
      isUserAuthenticated() {
        return false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  #header {
    display: flex;
    width: 100%;
    height: 120px;
    padding: 0 50px;
    z-index: 100;

    #logo {
      display: flex;
      align-items: center;
      color: $color-christmas-red;
      font-size: 30px;
    }

    #header-menu {
      display: flex;
      flex: 1;
      padding: 0 40px;

      .header-menu-item {
        display: flex;
        align-items: center;
        padding: 0 20px;
        color: $color-white-dark;
        font-size: 15px;
        cursor: pointer;

        &.selected {
          position: relative;
          color: $color-white;

          &::after {
            content: '';
            position: absolute;
            top: 75px;
            left: calc(50%);
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: $color-christmas-red;
          }
        }
      }
    }

    #header-actions {
      display: flex;
      align-items: center;
    }
  }
</style>
