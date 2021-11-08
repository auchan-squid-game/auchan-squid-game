<template>
  <div id="calendar-container">
    <div id="calendar">
      <CalendarCell id="cell-1" :enigma="enigmas[0]" centeredIcon="snowflake" />
      <CalendarCell id="cell-2" :enigma="enigmas[1]" />
      <CalendarCell id="cell-3" :enigma="enigmas[2]" />
      <CalendarCell id="cell-6" :enigma="enigmas[3]" text="Bonnes vacances" direction="horizontal" />
      <CalendarCell id="cell-7" :enigma="enigmas[4]" centeredIcon="moon-stars" />
      <CalendarCell id="cell-8" :enigma="enigmas[5]" />
      <CalendarCell id="cell-9" :enigma="enigmas[6]" />
      <CalendarCell id="cell-10" :enigma="enigmas[7]" />
      <CalendarCell id="cell-13" :enigma="enigmas[8]" centeredIcon="christmas-tree" />
      <CalendarCell id="cell-14" :enigma="enigmas[9]" icon="christmas-leaves" iconPosition="right" />
      <CalendarCell id="cell-15" :enigma="enigmas[10]" />
      <CalendarCell id="cell-16" :enigma="enigmas[11]" />
      <CalendarCell id="cell-17" :enigma="enigmas[12]" icon="christmas-socks" iconPosition="left" />
      <CalendarCell id="cell-20" :enigma="enigmas[13]" />
      <CalendarCell id="cell-21" :enigma="enigmas[14]" />
      <CalendarCell id="cell-23" :enigma="enigmas[15]" />
      <CalendarCell id="cell-22" :enigma="enigmas[16]" icon="sugar-cane" iconPosition="right" />
      <CalendarCell id="cell-24" :enigma="enigmas[17]" text="Joyeux Noël" direction="vertical" />
    </div>
  </div>
</template>

<script>
  import CalendarCell from './CalendarCell';

  export default {
    name: 'Calendar',
    components: { CalendarCell },
    computed: {
      enigmas() {
        return this.$store.state.enigmas;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import '@/assets/scss/_colors.scss';

  #calendar-container {
    flex: 1;
    width: 100%;
    padding-top: 50px;

    #calendar {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 10px;
      width: 100%;
      height: 100%;

      // CENTERED ICON
      #cell-1 {
        :deep(.calendar-cell) {
          background-color: $color-background-light;
          color: $color-white;

          .centered-icon {
            color: $color-background-very-light;
          }
        }
      }

      // STARS
      #cell-2 :deep(.calendar-cell) {
        background: radial-gradient(
            circle,
            transparent 20%,
            $color-christmas-yellow 20%,
            $color-christmas-yellow 80%,
            transparent 80%,
            transparent
          ),
          radial-gradient(
              circle,
              transparent 20%,
              $color-christmas-yellow 20%,
              $color-christmas-yellow 80%,
              transparent 80%,
              transparent
            )
            30px 30px,
          linear-gradient($color-christmas-red 2.4px, transparent 2.4px) 0 -1.2px,
          linear-gradient(90deg, $color-christmas-red 2.4px, $color-christmas-yellow 2.4px) -1.2px 0,
          $color-christmas-yellow;
        background-size: 60px 60px, 60px 60px, 30px 30px, 30px 30px;
        color: $color-background-light;
      }

      // DIAGONAL
      #cell-3 {
        &.calendar-cell-container {
          grid-area: 1 / 8 / 3 / 8;
        }
        :deep(.calendar-cell) {
          background: repeating-linear-gradient(
            45deg,
            $color-christmas-yellow,
            $color-christmas-yellow 20px,
            $color-christmas-yellow-dark 20px,
            $color-christmas-yellow-dark 40px
          );
        }
      }

      // STARS
      #cell-6 {
        &.calendar-cell-container {
          grid-area: 3 / 3 / 3 / 5;
        }
        :deep(.calendar-cell) {
          background: radial-gradient(
              circle,
              transparent 20%,
              $color-background-light 20%,
              $color-background-light 80%,
              transparent 80%,
              transparent
            ),
            radial-gradient(
                circle,
                transparent 20%,
                $color-background-light 20%,
                $color-background-light 80%,
                transparent 80%,
                transparent
              )
              30px 30px,
            linear-gradient($color-christmas-red 2.4px, transparent 2.4px) 0 -1.2px,
            linear-gradient(90deg, $color-christmas-red 2.4px, $color-background-light 2.4px) -1.2px 0,
            $color-christmas-red;
          background-size: 60px 60px, 60px 60px, 30px 30px, 30px 30px;
          color: $color-christmas-yellow;
        }
      }

      // CENTERED ICON
      #cell-7 :deep(.calendar-cell) {
        background: $color-background-light;
        color: $color-white;

        .icon {
          color: $color-background-very-light;

          svg {
            fill: $color-background-very-light;
          }
        }
      }

      // STARS
      #cell-8 {
        &.calendar-cell-container {
          grid-area: 2 / 9 / 4 / 9;
        }
        :deep(.calendar-cell) {
          background: radial-gradient(
              circle,
              transparent 20%,
              $color-christmas-green 20%,
              $color-christmas-green 80%,
              transparent 80%,
              transparent
            ),
            radial-gradient(
                circle,
                transparent 20%,
                $color-christmas-green 20%,
                $color-christmas-green 80%,
                transparent 80%,
                transparent
              )
              30px 30px,
            linear-gradient($color-christmas-yellow 2.4px, transparent 2.4px) 0 -1.2px,
            linear-gradient(90deg, $color-christmas-yellow 2.4px, $color-christmas-green 2.4px) -1.2px 0,
            $color-christmas-yellow;
          background-size: 60px 60px, 60px 60px, 30px 30px, 30px 30px;
          color: $color-background-light;
        }
      }

      // DIAGONAL
      #cell-9 {
        &.calendar-cell-container {
          grid-area: 1 / 4 / 3 / 4;
        }
        :deep(.calendar-cell) {
          background: repeating-linear-gradient(
            -45deg,
            $color-christmas-yellow,
            $color-christmas-yellow 20px,
            $color-christmas-green 20px,
            $color-christmas-green 40px
          );
        }
      }

      // ZIGZAG
      #cell-10 {
        &.calendar-cell-container {
          grid-area: 1 / 6 / 1 / 8;
        }
        :deep(.calendar-cell) {
          background: linear-gradient(135deg, $color-christmas-red 25%, transparent 25%) -25px 0,
            linear-gradient(225deg, $color-christmas-red 25%, transparent 25%) -25px 0,
            linear-gradient(315deg, $color-christmas-red 25%, transparent 25%),
            linear-gradient(45deg, $color-christmas-red 25%, transparent 25%);
          background-size: 50px 50px;
          background-color: $color-christmas-red-dark;
          color: $color-white;
        }
      }

      // CENTERED ICON
      #cell-13 :deep(.calendar-cell) {
        background: $color-christmas-green;

        .icon {
          color: $color-christmas-yellow;

          svg {
            fill: $color-christmas-yellow;
          }
        }
      }

      // ICON
      #cell-14 :deep(.calendar-cell) {
        background-color: $color-christmas-yellow;
        color: $color-background-light;
      }

      // DOTS
      #cell-15 :deep(.calendar-cell) {
        background-color: $color-christmas-red;
        background-image: radial-gradient($color-christmas-yellow-dark 12%, transparent 0),
          radial-gradient($color-christmas-yellow-dark 12%, transparent 0);
        background-size: 20px 20px;
        background-position: 0 0, math.div(20px, 2) math.div(20px, 2);
        color: $color-white;
      }

      // DOTS
      #cell-16 :deep(.calendar-cell) {
        background-color: $color-background-light;
        background-image: radial-gradient($color-background-very-light 12%, transparent 0),
          radial-gradient($color-background-very-light 12%, transparent 0);
        background-size: 20px 20px;
        background-position: 0 0, math.div(20px, 2) math.div(20px, 2);
        color: $color-white;
      }

      // ICON
      #cell-17 :deep(.calendar-cell) {
        background-color: $color-background-light;
        color: $color-white;
      }

      // ZIGZAG
      #cell-20 {
        &.calendar-cell-container {
          grid-area: 2 / 7 / 4 / 7;
        }
        :deep(.calendar-cell) {
          background: linear-gradient(135deg, $color-christmas-green 25%, transparent 25%) -25px 0,
            linear-gradient(225deg, $color-christmas-green 25%, transparent 25%) -25px 0,
            linear-gradient(315deg, $color-christmas-green 25%, transparent 25%),
            linear-gradient(45deg, $color-christmas-green 25%, transparent 25%);
          background-size: 50px 50px;
          background-color: $color-christmas-green-dark;
          color: $color-background-light;
        }
      }

      // DOTS
      #cell-21 {
        &.calendar-cell-container {
          grid-area: 1 / 2 / 1 / 4;
        }
        :deep(.calendar-cell) {
          background-color: $color-christmas-red;
          background-image: radial-gradient($color-christmas-red-dark 12%, transparent 0),
            radial-gradient($color-christmas-red-dark 12%, transparent 0);
          background-size: 20px 20px;
          background-position: 0 0, math.div(20px, 2) math.div(20px, 2);
          color: $color-white;
        }
      }

      // ICON
      #cell-22 :deep(.calendar-cell) {
        background-color: $color-background-light;
        color: $color-white;
      }

      // GIFT
      #cell-23 {
        &.calendar-cell-container {
          grid-area: 2 / 5 / 3 / 7;
        }
        :deep(.calendar-cell) {
          position: relative;
          align-items: flex-start;
          justify-content: flex-start;
          background: $color-christmas-yellow;

          .day {
            padding: 20px;
            font-size: 45px;
          }

          &::before {
            content: '';
            position: absolute;
            bottom: 40px;
            left: 0;
            width: 100%;
            height: 40px;
            background: $color-christmas-red;
          }

          &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 40px;
            width: 40px;
            height: 100%;
            background: $color-christmas-red;
          }
        }
      }

      // ZIGZAG
      #cell-24 {
        &.calendar-cell-container {
          grid-area: 2 / 2 / 4 / 2;
        }
        :deep(.calendar-cell) {
          background: linear-gradient(135deg, $color-christmas-red 25%, transparent 25%) -25px 0,
            linear-gradient(225deg, $color-christmas-red 25%, transparent 25%) -25px 0,
            linear-gradient(315deg, $color-christmas-red 25%, transparent 25%),
            linear-gradient(45deg, $color-christmas-red 25%, transparent 25%);
          background-size: 50px 50px;
          background-color: $color-christmas-red-dark;
          color: $color-white;
        }
      }
    }
  }
</style>
