<template>
  <AuthentificationForm title="Inscription" submitLabel="Créer son compte" :submit="createUserAccount">
    <Input
      type="text"
      label="Code projet"
      size="big"
      :error="errors.projectCode"
      :value="projectCode"
      @update="projectCode = $event"
    />
    <Input
      type="text"
      label="Nom utilisateur"
      placeholder="Pere noël"
      size="big"
      :error="errors.username"
      :value="username"
      @update="username = $event"
    />
    <Input
      type="text"
      label="Adresse mail"
      placeholder="perenoel@partner.auchan.fr"
      size="big"
      :error="errors.email"
      :value="email"
      @update="email = $event"
    />
    <Input
      type="password"
      label="Mot de passe"
      placeholder="••••••••••••"
      size="big"
      :error="errors.password"
      :value="password"
      @update="password = $event"
    />
    <Input
      type="password"
      label="Confirmation du mot de passe"
      placeholder="••••••••••••"
      size="big"
      :value="confirmPassword"
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
        projectCode: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: { projectCode: undefined, username: undefined, email: undefined, password: undefined },
      };
    },
    computed: {
      noError() {
        return !this.errors.projectCode && !this.errors.username && !this.errors.email && !this.errors.password;
      },
    },
    methods: {
      createUserAccount() {
        // Reset all errors
        this.resetErrors();

        // Manage input errors
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (this.projectCode !== 'ARF') this.errors.projectCode = 'Code projet incorrect';
        if (this.username.length < 8) this.errors.username = 'Le nom utilisateur doit contenir au moins 8 caracteres';
        if (!emailRegex.test(this.email)) this.errors.email = 'Adresse mail invalide';
        if (this.password !== this.confirmPassword) this.errors.password = 'Confirmation du mot de passe incorrecte';
        if (this.password.length < 8) this.errors.password = 'Le mot de passe doit contenir au moins 8 caracteres';

        // Signup
        if (this.noError) {
          this.$store.dispatch('createUserAccount', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
        }
      },
      resetErrors() {
        this.errors = { projectCode: undefined, username: undefined, email: undefined, password: undefined };
      },
    },
  };
</script>

<style lang="scss" scoped></style>
