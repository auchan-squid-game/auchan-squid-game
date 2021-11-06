import types from '@/constants/mutation-types';

export default {
  [types.IS_APP_LOADED](state, isLoaded) {
    state.app.isLoaded = isLoaded;
  },
  [types.IS_SIGNIN_PROCESSING](state, isProcessing) {
    state.app.isSigninProcessing = isProcessing;
  },
  [types.IS_SIGNUP_PROCESSING](state, isProcessing) {
    state.app.isSignupProcessing = isProcessing;
  },
  [types.LOGOUT](state) {
    state.user = undefined;
  },
  [types.RESET_SIGNIN_ERRORS](state) {
    state.errors.signin = {};
  },
  [types.RESET_SIGNUP_ERRORS](state) {
    state.errors.signup = {};
  },
  [types.SET_ENIGMAS_DATA](state, data) {
    state.enigmas = data;
  },
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_SIGNIN_ERROR](state, { input, message }) {
    state.errors.signin[input] = message;
  },
  [types.SET_SIGNUP_ERROR](state, { input, message }) {
    state.errors.signup[input] = message;
  },
  [types.CLOSE_ENIGMA_POPUP](state) {
    state.app.enigmaPopup.show = false;
    state.app.enigmaPopup.enigmaId = undefined;
  },
  [types.SHOW_ENIGMA_POPUP](state, enigma) {
    state.app.enigmaPopup.show = true;
    state.app.enigmaPopup.enigma = enigma;
  },
  [types.RESET_ANSWERS_TO_CHECK](state) {
    state.answersToCheck = {};
  },
  [types.ADD_ANSWER_TO_CHECK](state, { answerId, userAnswerInfos }) {
    if (state.answersToCheck[answerId]) {
      state.answersToCheck[answerId].answers.push(userAnswerInfos);
    } else {
      const titleForEnigma = state.enigmas
        .filter(enigma => {
          return enigma.id === answerId;
        })
        .map(enigmaToUseToGetTitle => enigmaToUseToGetTitle.title);
      state.answersToCheck[answerId] = {
        id: answerId,
        title: titleForEnigma[0],
        answers: [userAnswerInfos],
      };
    }
  },
  [types.REMOVE_ANSWER_TO_CHECK](state, { answerId, userAnswerInfos }) {
    console.log(answerId);
    console.log(state.answersToCheck);
    const index = state.answersToCheck[answerId].answers.indexOf(userAnswerInfos);
    state.answersToCheck[answerId].answers.splice(index, 1);
  },
};
