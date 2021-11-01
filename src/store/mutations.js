import types from '@/constants/mutation-types';
const enigmasJsonFile = require('../enigmas.json');

export default {
  [types.IS_APP_LOADED](state, isLoaded) {
    state.app.isLoaded = isLoaded;
  },
  [types.IS_SIGNUP_PROCESSING](state, isProcessing) {
    state.app.isSignupProcessing = isProcessing;
  },
  [types.LOGOUT](state) {
    state.user = undefined;
  },
  [types.RESET_SIGNUP_ERRORS](state) {
    state.errors.signup = {};
  },
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_SIGNUP_ERROR](state, { input, message }) {
    state.errors.signup[input] = message;
  },
  [types.RESET_ANSWERS_TO_CHECK](state) {
    state.answersToCheck = {};
  },
  [types.SET_ANSWERS_TO_CHECK](state, { answerId, userAnswerInfos }) {
    if (state.answersToCheck[answerId]) {
      state.answersToCheck[answerId].answers.push(userAnswerInfos);
    } else {
      const titleForEnigma = enigmasJsonFile.enigmas
        .filter(enigma => {
          return enigma.id === answerId;
        })
        .map(enigmaToUseToGetTitle => enigmaToUseToGetTitle.title);
      state.answersToCheck[answerId] = {
        title: titleForEnigma[0],
        answers: [userAnswerInfos],
      };
    }
  },
  [types.REMOVE_ANSWER_FROM_ANSWER_TO_CHECK](state, { answerId, userAnswerInfos }) {
    const index = state.answersToCheck[answerId].answers.indexOf(userAnswerInfos);
    state.answersToCheck[answerId].answers.splice(index, 1);
  },
};
