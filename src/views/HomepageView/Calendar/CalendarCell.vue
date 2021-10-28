<template>
  <div
    :class="['calendar-cell-container', { hover: isHovered, enable }]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      :class="[
        'calendar-cell',
        direction,
        iconPosition,
        { 'centered-icon-type': !!centeredIcon, 'text-type': !!text, 'icon-type': !!icon },
      ]"
    >
      <div class="day">{{ day }}</div>

      <div v-if="!!centeredIcon" class="centered-icon">
        <Icon :name="centeredIcon" />
      </div>

      <div v-if="!!icon" class="christmas-icon">
        <Icon :name="icon" />
      </div>

      <div v-if="!!text" class="text">
        {{ text }}
      </div>
    </div>

    <div class="calendar-cell-verso">
      <Button label="VOIR L'ENIGME" color="default" @click="showEnigmaPopup" />
    </div>
  </div>
</template>

<script>
  import { Button, Icon } from '@/components';

  export default {
    name: 'CalendarCell',
    components: { Button, Icon },
    props: {
      enable: { type: Boolean, default: false },
      day: { type: String, required: true },
      text: { type: String },
      direction: { type: String },
      centeredIcon: { type: String },
      icon: { type: String },
      iconPosition: { type: String },
    },
    data() {
      return {
        isHovered: false,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  @keyframes wizz {
    0%,
    100% {
      transform: translateX(0px);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-7px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(7px);
    }
  }

  .calendar-cell-container {
    position: relative;
    border-radius: 10px;

    &.hover {
      &.enable {
        .calendar-cell {
          transform: rotateY(180deg);
        }
        .calendar-cell-verso {
          transform: rotateY(360deg);
        }
      }

      &:not(.enable) .calendar-cell {
        animation: wizz 1s linear;
      }
    }

    .calendar-cell,
    .calendar-cell-verso {
      position: absolute;
      top: 0;
      left: 0;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      transition: transform ease 1s;
      cursor: pointer;
      overflow: hidden;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    .calendar-cell {
      &.centered-icon-type {
        .day {
          padding-top: 8px;
          padding-right: 4px;
          font-size: 45px;
        }
      }

      &.text-type {
        align-items: flex-start;

        &.horizontal {
          .text {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;
            height: 100%;
            padding-left: 60px;
            font-family: 'Christmas';
            font-size: 60px;
          }
        }

        &.vertical {
          flex-direction: column;

          .text {
            align-items: center;
            justify-content: center;
            height: 100%;
            padding-left: 20px;
            font-family: 'Christmas';
            font-size: 60px;
          }
        }

        .day {
          padding: 20px;
          font-size: 45px;
        }
      }

      &.icon-type {
        align-items: flex-start;

        &.left {
          flex-direction: row-reverse;

          .christmas-icon {
            transform: rotate(-15deg);
          }
        }

        &.right {
          .christmas-icon {
            transform: rotate(15deg);
          }
        }

        .day {
          padding: 20px;
          font-size: 45px;
        }

        .christmas-icon {
          height: 100%;
        }
      }

      .day {
        padding-top: 10px;
        padding-right: 8px;
        font-size: 75px;
        z-index: 10;
      }

      .centered-icon {
        position: absolute;
        top: 0;
        height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        z-index: 1;

        :deep(.icon) {
          padding: 5px;
        }
      }

      .text {
        display: flex;
        flex: 1;
      }
    }

    .calendar-cell-verso {
      background: $color-white;
      font-size: 20px;
      transform: rotateY(180deg);
    }
  }
</style>
