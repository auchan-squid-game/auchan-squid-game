export default {
  isAppLoaded(state) {
    return state.app.isLoaded;
  },
  isUserAuthenticated(state) {
    return state.user;
  },
};
