<template>
  <AuthentificationForm title="Connexion" submitLabel="Se connecter" :submit="authenticate">
    <Input type="text" label="Nom utilisateur" placeholder="Père noël" size="big" @update="username = $event" />
    <Input type="password" label="Mot de passe" placeholder="••••••••••••" size="big" @update="password = $event" />
  </AuthentificationForm>
</template>

<script>
  import { Input } from '@/components';

  import AuthentificationForm from './AuthentificationForm';

  export default {
    name: 'Login',
    components: { Input, AuthentificationForm },
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      authenticate() {
        // TODO: Check data entered by user
        // TODO: Call actions to authenticate user

        // Redirect user to the homepage
        this.$router.push('/');
      },
    },
  };
</script>

<style lang="scss" scoped></style>
