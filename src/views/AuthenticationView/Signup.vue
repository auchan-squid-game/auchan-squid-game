<template>
  <AuthentificationForm
    title="Inscription"
    submitLabel="Créer son compte"
    :submit="createUserAccount"
    :processing="isSignupProcessing"
  >
    <Input
      type="text"
      label="Code projet"
      size="big"
      :error="projectCodeError"
      :value="projectCode"
      @update="projectCode = $event"
    />
    <Input
      type="text"
      label="Nom utilisateur"
      placeholder="Pere noël"
      size="big"
      :error="usernameError"
      :value="username"
      @update="username = $event"
    />
    <Input
      type="text"
      label="Adresse mail"
      placeholder="perenoel@partner.auchan.fr"
      size="big"
      :error="emailError"
      :value="email"
      @update="email = $event"
    />
    <Input
      type="password"
      label="Mot de passe"
      placeholder="••••••••••••"
      size="big"
      :error="passwordError"
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
      };
    },
    computed: {
      projectCodeError() {
        return this.$store.state.errors.signup.projectCode;
      },
      usernameError() {
        return this.$store.state.errors.signup.username;
      },
      emailError() {
        return this.$store.state.errors.signup.email;
      },
      passwordError() {
        return this.$store.state.errors.signup.password;
      },
      isSignupProcessing() {
        return this.$store.state.app.isSignupProcessing;
      },
    },
    methods: {
      createUserAccount() {
        this.$store.dispatch('createUserAccount', {
          projectCode: this.projectCode,
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
