<template>
  <Page>
    <div id="homepage">
      <div id="calendar-header">
        <div id="calendar-title">Calendrier de l'avent</div>

        <div id="calendar-countdown">
          <div class="coutdown-case">
            <div class="countdown-value">{{ nbDaysRemaining }}</div>
            <div class="countdown-label">Jours</div>
          </div>
          :
          <div class="coutdown-case">
            <div class="countdown-value">{{ nbHoursRemaining }}</div>
            <div class="countdown-label">Heures</div>
          </div>
          :
          <div class="coutdown-case">
            <div class="countdown-value">{{ nbMinutesRemaining }}</div>
            <div class="countdown-label">Minutes</div>
          </div>
          :
          <div class="coutdown-case">
            <div class="countdown-value">{{ nbSecondsRemaining }}</div>
            <div class="countdown-label">Secondes</div>
          </div>
          avant Noel
        </div>
      </div>

      <Calendar />
    </div>
  </Page>
</template>

<script>
  import Calendar from './Calendar';
  import Page from '@/layout/Page';

  export default {
    name: 'HomepageView',
    components: { Calendar, Page },
    data() {
      return {
        christmasDay: new Date('2021-12-25').getTime(),
        nbDaysRemaining: 0,
        nbHoursRemaining: 0,
        nbMinutesRemaining: 0,
        nbSecondsRemaining: 0,
        interval: undefined,
      };
    },
    methods: {
      calculateTimeRemaining() {
        const now = Date.now();
        const diff = this.christmasDay - now;

        if (diff < 0) clearInterval(this.interval);

        this.nbDaysRemaining = Math.floor(diff / (1000 * 60 * 60 * 24));
        this.nbHoursRemaining = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.nbMinutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        this.nbSecondsRemaining = Math.floor((diff % (1000 * 60)) / 1000);
      },
    },
    mounted() {
      this.calculateTimeRemaining();
      this.interval = setInterval(this.calculateTimeRemaining, 1000);
    },
    beforeUnmount() {
      if (this.interval) clearInterval(this.interval);
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  #homepage {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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
