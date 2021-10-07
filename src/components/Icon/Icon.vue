<template>
  <div class="icon" v-html="icon" />
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: { type: String, required: true },
    },
    data: function () {
      return {
        icon: require('./icons')[this.name],
      };
    },
  };
</script>

<style lang="scss" scoped></style>
