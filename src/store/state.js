export default {
  user: undefined,
  enigmas: [],
  errors: {
    signin: {},
    signup: {},
  },
  answersToCheck: {},
  app: {
    isLoaded: false,
    isSigninProcessing: false,
    isSignupProcessing: false,
    enigmaPopup: {
      show: false,
      enigma: undefined,
    },
  },
};
