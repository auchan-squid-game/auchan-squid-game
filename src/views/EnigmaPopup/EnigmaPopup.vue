<template>
  <div id="popup-center" :class="[{ show }]">
    <div id="blur" @click="closePopup" />

    <div id="popup-enigma" v-if="!!enigma">
      <div id="popup-header">
        <div id="popup-title"># {{ enigma.id }} - {{ enigma.title }}</div>
        <div id="popup-close" @click="closePopup">
          <Icon name="x" />
        </div>
      </div>
      <div id="popup-body">
        <div id="enigma-image">
          <img :src="enigma.image" alt="" />
        </div>
        Votre reponse :
        <div id="enigma-textarea">
          <textarea></textarea>
        </div>
      </div>
      <div id="popup-actions">
        <Button label="Valider" color="default" @click="submit" />
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
      enigma() {
        return this.$store.state.app.enigmaPopup.enigma;
      },
      show() {
        return this.$store.state.app.enigmaPopup.show;
      },
    },
    methods: {
      closePopup() {
        this.$store.dispatch('closeEnigmaPopup');
      },
      submit() {
        // TODO: Action to submit the response
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
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 20px;
        border-bottom: 2px solid $color-white-dark;

        #enigma-image {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 500px;
          height: 300px;
          margin-bottom: 20px;

          img {
            max-width: 100%;
            max-height: 100%;
          }
        }

        #enigma-textarea {
          width: 100%;
          height: 100px;
          border-radius: 10px;
          background: $color-white;

          textarea {
            width: 100%;
            height: 100%;
            padding: 20px;
            border: none;
            background: transparent;
            font-family: sans-serif;
            font-size: 16px;
            resize: none;
          }
        }
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
