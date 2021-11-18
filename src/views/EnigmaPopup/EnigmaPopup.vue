<template>
  <div id="popup-center" :class="[{ show }]">
    <div id="blur" @click="closePopup" />

    <div id="popup-enigma" v-if="!!enigma">
      <div id="popup-header">
        <div id="popup-title">
          # {{ enigma.id }} - {{ enigma.title }}
          <div id="enigma-validation-status">
            <template v-if="currentUser.answers[enigma.id] && currentUser.answers[enigma.id].isApproved === true">
              <div class="badge success">VALIDEE</div>
            </template>
            <template v-else-if="currentUser.answers[enigma.id] && currentUser.answers[enigma.id].isApproved === false">
              <div class="badge danger">REFUSEE</div>
            </template>
            <template v-else>
              <div class="badge warning">EN ATTENTE D'APPROBATION</div>
            </template>
          </div>
        </div>
        <div id="popup-close" @click="closePopup">
          <Icon name="x" />
        </div>
      </div>

      <div id="popup-body">
        <div id="enigma-image">
          <img :src="enigma.image" alt="" />
        </div>
        <template v-if="canUserEnterResponse">
          Votre reponse :
          <div id="enigma-textarea">
            <textarea v-model="response"></textarea>
          </div>
        </template>
        <template v-else>
          <div v-if="currentUser.answers[enigma.id]" id="enigma-response">
            Votre reponse : <span>{{ currentUser.answers[enigma.id].response }}</span>
          </div>
          <div v-if="expectedReponse" id="enigma-expected-response">
            Reponse attendue : <span>{{ expectedReponse }}</span>
          </div>
        </template>
      </div>
      <template v-if="canUserEnterResponse">
        <div id="popup-actions">
          <Button label="Valider" color="default" @click="submit" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import { Button, Icon } from '@/components';

  export default {
    name: 'EnigmaPopup',
    components: { Button, Icon },
    data() {
      return { response: '' };
    },
    computed: {
      currentUser() {
        return this.$store.state.user;
      },
      enigma() {
        return this.$store.state.app.enigmaPopup.enigma;
      },
      expectedReponse() {
        return this.$store.state.enigmas.find(e => e.id === this.enigma.id).response;
      },
      canUserEnterResponse() {
        const now = Date.now();
        const startDate = Date.parse(this.enigma.startDate) + 8 * 60 * 60 * 1000; // Start at 9:00 am with gmt+1
        const endDate = Date.parse(this.enigma.endDate) + 8 * 60 * 60 * 1000; // Start at 9:00 am with gmt+1
        return now > startDate && now < endDate;
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
        if (this.response !== '') {
          this.$store.dispatch('submitResponse', this.response);
          this.closePopup();
          this.response = '';
        }
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
      width: 1024px;
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
          display: flex;
          align-items: center;
          flex: 1;

          #enigma-validation-status {
            margin-left: 30px;

            .badge {
              padding: 5px 10px 3px;
              border: 2px solid;
              font-size: 10px;

              &.success {
                border-color: rgb(103, 179, 115);
                color: rgb(61, 107, 69);
              }

              &.warning {
                border-color: rgb(249, 181, 63);
                color: rgb(149, 108, 37);
              }

              &.danger {
                border-color: rgb(212, 96, 79);
                color: rgb(127, 57, 47);
              }
            }
          }
        }

        #popup-close {
          width: 80px;
          height: 80px;
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

        #enigma-image {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 800px;
          height: 600px;
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

        #enigma-response span,
        #enigma-expected-response span {
          font-family: sans-serif;
        }
      }

      #popup-actions {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
        padding: 0 20px;
        border-top: 2px solid $color-white-dark;

        :deep(.btn) {
          width: 100%;
        }
      }
    }
  }
</style>
