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

<style lang="scss" scoped>
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }
</style>
