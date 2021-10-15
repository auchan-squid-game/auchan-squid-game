<template>
  <div id="homepage">
    <div id="calendar-header">
      <div id="calendar-title">Calendrier de l'avent</div>

      <div id="calendar-countdown">
        <div class="coutdown-case">
          <div class="countdown-value">15</div>
          <div class="countdown-label">Jours</div>
        </div>
        :
        <div class="coutdown-case">
          <div class="countdown-value">02</div>
          <div class="countdown-label">Heures</div>
        </div>
        :
        <div class="coutdown-case">
          <div class="countdown-value">48</div>
          <div class="countdown-label">Minutes</div>
        </div>
        :
        <div class="coutdown-case">
          <div class="countdown-value">59</div>
          <div class="countdown-label">Secondes</div>
        </div>
        avant Noel
      </div>
    </div>

    <Calendar />
  </div>
</template>

<script>
  import Calendar from './Calendar';

  export default {
    name: 'HomepageView',
    components: { Calendar },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  #homepage {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    padding: 0 50px 50px;

    #calendar-header {
      display: flex;
      align-items: center;
      width: 100%;
      padding-top: 50px;

      #calendar-title {
        flex: 1;
        color: $color-white;
        font-family: 'Coolvetica';
        font-size: 60px;
        letter-spacing: 5px;
      }

      #calendar-countdown {
        display: flex;
        align-items: center;
        color: $color-white;
        font-size: 25px;

        .coutdown-case {
          display: flex;
          flex-direction: column;
          width: 90px;
          height: 90px;
          margin: 0 10px;
          border-radius: 5px;
          background: $color-background-light;

          .countdown-value {
            display: flex;
            flex: 1;
            align-items: flex-end;
            justify-content: center;
            color: $color-white;
            font-size: 30px;
          }

          .countdown-label {
            padding: 5px 0 15px;
            color: $color-white-dark;
            font-size: 15px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
