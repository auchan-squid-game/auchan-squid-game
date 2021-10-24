<template>
  <slot />
</template>

<script>
  export default {
    name: 'DefaultView',
    props: { noUserAuthenticated: Boolean },
    computed: {
      isUserAuthenticated() {
        return this.$store.getters.isUserAuthenticated;
      },
    },
    beforeMount() {
      if (this.noUserAuthenticated && this.isUserAuthenticated) this.$router.push('/');
      if (!this.noUserAuthenticated && !this.isUserAuthenticated) this.$router.push('/login');
    },
  };
</script>
