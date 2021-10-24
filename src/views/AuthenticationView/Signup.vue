<template>
  <AuthentificationForm title="Inscription" submitLabel="Créer son compte" :submit="createUserAccount">
    <Input type="text" label="Code projet" size="big" @update="projectCode = $event" />
    <Input type="text" label="Nom utilisateur" placeholder="Père noël" size="big" @update="username = $event" />
    <Input
      type="text"
      label="Adresse mail"
      placeholder="perenoel@partner.auchan.fr"
      size="big"
      @update="email = $event"
    />
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
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      createUserAccount() {
        // TODO: Check data entered by user

        this.$store.dispatch('createUserAccount', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
