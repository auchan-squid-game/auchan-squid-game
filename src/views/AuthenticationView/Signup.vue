<template>
  <AuthentificationForm submitLabel="Créer son compte" :submit="createUserAccount">
    <Input type="text" label="Nom utilisateur" placeholder="Père noël" size="big" @update="username = $event" />
    <Input type="password" label="Mot de passe" placeholder="••••••••••••" size="big" @update="password = $event" />
    <Input
      type="password"
      label="Confirmation du mot de passe"
      placeholder="••••••••••••"
      size="big"
      @update="confirmPassword = $event"
    />
  </AuthentificationForm>
</template>

<script>
  import { Input } from '@/components';

  import AuthentificationForm from './AuthentificationForm';

  export default {
    name: 'Signup',
    components: { Input, AuthentificationForm },
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      createUserAccount() {
        // TODO: Call actions to create a user account
        // this.$store.dispatch('createUserAccount', this.username, this.password);
        // TODO: Call actions to authenticate user
        // Redirect user to the homepage
        // this.$router.push('/');
      },
    },
  };
</script>

<style lang="scss" scoped></style>
