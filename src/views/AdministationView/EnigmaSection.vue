<template>
  <div class="enigma-section">
    <div class="enigma-header" @click="showDetails = !showDetails">
      <div class="enigma-header-details">
        <div class="enigma-title">#{{ id }} - {{ enigma.title }}</div>
        <div class="enigma-response-details">17 / 42 responses approved</div>
      </div>
      <div :class="['enigma-toggle', { up: showDetails }]">
        <Button icon="chevron-down" color="default" />
      </div>
    </div>
    <div :class="['enigma-container', { show: showDetails }]" v-for="answer in enigma.answers" :key="answer.userId">
      <div class="enigma-response-row">
        <div class="enigma-response-user">{{ answer.username }}</div>
        <div class="enigma-response">{{ answer.response }}</div>
        <div class="enigma-response-actions">
          <div class="enigma-response-action" @click="approveResponse(id, answer)">
            <Icon name="check" />
          </div>
          <div class="enigma-response-action" @click="rejectResponse(id, answer)">
            <Icon name="x" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button, Icon } from '@/components';

  export default {
    name: 'EnigmaSection',
    components: { Button, Icon },
    data() {
      return {
        showDetails: false,
      };
    },
    props: {
      enigma: { type: Object, required: true },
    },
    methods: {
      approveResponse(id, answer) {
        this.$store.dispatch('approveResponse', { id: id, answer: answer });
      },
      rejectResponse(id, answer) {
        this.$store.dispatch('rejectResponse', { id: id, answer: answer });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  .enigma-section {
    width: 900px;
    border-radius: 20px;
    background: $color-background-light;
    color: $color-white;

    .enigma-header {
      display: flex;
      align-items: center;
      width: 100%;
      height: 70px;
      padding: 0 30px;
      cursor: pointer;

      .enigma-header-details {
        display: flex;
        flex: 1;

        .enigma-response-details {
          padding-left: 30px;
          color: $color-christmas-red;

          &.all-approved {
            color: $color-christmas-green;
          }
        }
      }

      .enigma-toggle {
        :deep(.btn) {
          justify-content: center;
          width: 40px;
          padding: 0;

          .icon {
            width: 20px;
            height: 20px;
          }
        }

        &.up :deep(.btn .icon) {
          transform: rotate(90deg);
        }
      }
    }

    .enigma-container {
      width: 100%;
      height: 0px;
      overflow: hidden;

      &.show {
        border-top: 1px solid $color-background;
        height: auto;
      }

      .enigma-response-row {
        display: flex;
        align-items: center;
        min-height: 70px;
        padding: 20px 30px;
        border-top: 1px solid $color-background;
        font-family: sans-serif;

        .enigma-response-user {
          width: 150px;
        }

        .enigma-response {
          flex: 1;
          padding: 0 20px;
        }

        .enigma-response-actions {
          display: flex;

          .enigma-response-action {
            margin-left: 20px;
            padding: 0 8px;
            color: $color-christmas-red;
            cursor: pointer;

            &:first-child {
              margin-left: 0;
              color: $color-christmas-green;
            }
          }
        }
      }
    }
  }
</style>
