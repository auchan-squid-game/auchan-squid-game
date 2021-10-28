<template>
  <div class="enigma-section">
    <div class="enigma-header">
      <div class="enigma-title">#{{ enigma.id }} - {{ enigma.title }}</div>
      <div class="enigma-toggle"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EnigmaSection',
    props: {
      enigma: { type: Object, required: true },
    },
  };
</script>

<style lang="scss" scoped>
  .enigma-section {
    width: 900px;
    height: 40px;
    background: red;
  }
</style>
