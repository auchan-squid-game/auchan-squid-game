<template>
  <AuthentificationForm title="Inscription" submitLabel="Créer son compte" :submit="createUserAccount">
    <Input type="text" label="Code projet" size="big" @update="projectCode = $event" />
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
        projectCode: '',
        username: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      createUserAccount() {
        // TODO: Check data entered by user
        // TODO: Call actions to create a user account
        // TODO: Call actions to authenticate user

        // Redirect user to the homepage
        this.$router.push('/');
      },
    },
  };
</script>

<style lang="scss" scoped></style>
