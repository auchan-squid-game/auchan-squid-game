<template>
  <AuthentificationForm title="Connexion" submitLabel="Se connecter" :submit="signin">
    <Input
      type="text"
      label="Email"
      placeholder="Père noël@partner.auchan.fr"
      size="big"
      @update="email = $event"
      :value="email"
      :error="emailError"
    />
    <Input
      type="password"
      label="Mot de passe"
      placeholder="••••••••••••"
      size="big"
      @update="password = $event"
      :value="password"
      :eror="passwordError"
    />
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
      passwordError() {
        return this.$store.state.errors.signin.password;
      },
    },

    methods: {
      signin() {
        this.$store.dispatch('signin', {
          email: this.email,
          password: this.password,
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
