<template>
  <div class="rank-container">
    <div :class="['rank-info', `rank-${user.rank}`]">
      <div class="rank-number">{{ user.rank }}</div>
      <div class="user-data">
        <div class="username">{{ user.username }}</div>
        <div class="answers">
          <template v-for="enigma in enigmas" :key="enigma.id">
            <div v-if="showEnigma(enigma.id)" :class="['answer', getAnswerStatus(enigma.id)]">
              {{ getEnigmaStartDay(enigma.id) }}
            </div>
          </template>
        </div>
      </div>
      <div class="total-points">{{ user.totalPoints }} pts</div>
    </div>
  </div>
</template>

<script>
  const enigmas = require('../../enigmas.json');

  export default {
    name: 'RankingItem',
    data() {
      return { enigmas };
    },
    props: {
      user: { type: Object, required: true },
    },
    methods: {
      getEnigmaById(id) {
        return this.enigmas.find(e => e.id === id);
      },
      getEnigmaStartDay(id) {
        return this.getEnigmaById(id).startDate.split('-')[2];
      },
      showEnigma(id) {
        return Number(this.getEnigmaStartDay(id)) <= new Date().getDate();
      },
      getAnswerStatus(id) {
        if (!this.user.answers) return 'not-answered';

        const answer = this.user.answers.find(a => a && a.id === id);
        if (!answer) return 'not-answered';
        if (answer.isApproved === true) return 'approved';
        if (answer.isApproved === false) return 'not-approved';
        return 'waiting-approval';
      },
    },
  };
</script>
