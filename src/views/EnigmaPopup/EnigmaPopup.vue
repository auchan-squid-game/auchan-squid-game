<template>
  <div id="popup-center" :class="[{ show }]">
    <div id="blur" @click="closePopup" />

    <div id="popup-enigma">
      <div id="popup-header">
        <div id="popup-title">#1 - TITRE DE L'ENIGME 1</div>
        <div id="popup-close" @click="closePopup">
          <Icon name="x" />
        </div>
      </div>
      <div id="popup-body"></div>
      <div id="popup-actions">
        <Button label="Valider" color="default" />
      </div>
    </div>
  </div>
</template>

<script>
  import { Button, Icon } from '@/components';

  export default {
    name: 'EnigmaPopup',
    components: { Button, Icon },
    computed: {
      show() {
        return this.$store.state.app.enigmaPopup.show;
      },
    },
    methods: {
      closePopup() {
        this.$store.dispatch('closeEnigmaPopup');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  #popup-center {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1000;

    &.show {
      z-index: 1000;

      #blur {
        opacity: 0.7;
      }
      #popup-enigma {
        transform: scale(100%);
      }
    }

    #blur {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: $color-background;
      opacity: 0;
      transition: opacity ease 0.3s;
    }

    #popup-enigma {
      display: flex;
      flex-direction: column;
      width: 800px;
      height: 600px;
      border-radius: 20px;
      box-shadow: 0 0 20px $color-background;
      background: #ffffff;
      transform: scale(50%);
      transition: transform ease 0.3s;
      z-index: 2000;

      #popup-header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
        padding: 0 20px 0 30px;
        border-bottom: 2px solid $color-white-dark;

        #popup-title {
          flex: 1;
        }

        #popup-close {
          padding: 10px;
          cursor: pointer;
        }
      }

      #popup-body {
        flex: 1;
        width: 100%;
        border-bottom: 2px solid $color-white-dark;
      }

      #popup-actions {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
        padding: 0 20px;

        :deep(.btn) {
          width: 100%;
        }
      }
    }
  }
</style>
