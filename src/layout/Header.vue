<template>
  <div id="header">
    <div id="logo">Auchan Squid Game</div>
    <div id="header-menu">
      <template v-if="!!currentUser">
        <router-link to="/">
          <div :class="['header-menu-item', { selected: $route.path === '/' }]">LE JEU</div>
        </router-link>
        <router-link to="/ranking">
          <div :class="['header-menu-item', { selected: $route.path === '/ranking' }]">LE CLASSEMENT</div>
        </router-link>
        <router-link v-if="currentUser.role === 'admin'" to="/admin">
          <div :class="['header-menu-item', { selected: $route.path === '/admin' }]">ADMINISTRATION</div>
        </router-link>
      </template>
    </div>
    <div id="header-actions">
      <template v-if="!!currentUser">
        <Button icon="logout" label="DECONNEXION" color="default" size="medium" type="classic" @click="logout" />
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
      currentUser() {
        return this.$store.state.user;
      },
      isLoginPage() {
        return this.$route.path === '/login';
      },
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  @media screen and (max-width: 650px) {
    #header #logo {
      display: hidden;
    }
  }

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

      @media screen and (max-width: 660px) {
        display: none;
      }
    }

    #header-menu {
      display: flex;
      flex: 1;
      padding: 0 40px;

      a {
        display: flex;
        color: inherit;
        text-decoration: inherit;

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
    }

    #header-actions {
      display: flex;
      align-items: center;
    }
  }
</style>
