<template>
  <AuthentificationForm title="Connexion" submitLabel="Se connecter" :submit="authenticate">
    <Input
      type="text"
      label="Email"
      placeholder="Père noël@partner.auchan.fr"
      size="big"
      @update="email = $event"
      :value="email"
      :error="emailError"
    />
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
        email: '',
        password: '',
      };
    },
    computed: {
      emailError() {
        return this.$store.state.errors.signin.email;
      },
    },
    methods: {
      authenticate() {
        this.$store.dispatch('sinfningUserToApplication', {
          email: this.email,
          password: this.password,
        }),
          // Redirect user to the homepage
          this.$router.push('/');
      },
    },
  };
</script>

<style lang="scss" scoped></style>
