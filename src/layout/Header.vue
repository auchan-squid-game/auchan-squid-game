<template>
  <div id="header">
    <div id="logo">Auchan Squid Game</div>
    <div id="header-menu">
      <template v-if="isUserAuthenticated">
        <div class="header-menu-item selected">LE JEU</div>
        <div class="header-menu-item">LE CLASSEMENT</div>
        <div class="header-menu-item">NOUS CONTACTER</div>
        <div v-if="false" class="header-menu-item">ADMINISTRATION</div>
      </template>
    </div>
    <div id="header-actions">
      <template v-if="isUserAuthenticated">
        <Button icon="logout" label="DECONNEXION" color="default" size="medium" type="classic" />
      </template>
      <template v-else>
        <Button
          v-if="isLoginPage"
          icon="logout"
          label="INSCRIPTION"
          color="default"
          size="medium"
          @click="$router.push('/signup')"
        />
        <Button v-else icon="logout" label="CONNEXION" color="default" size="medium" @click="$router.push('/login')" />
      </template>
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
      isLoginPage() {
        return this.$route.path === '/login';
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
