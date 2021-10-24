import types from '@/constants/mutation-types';

export default {
  [types.IS_APP_LOADED](state, isLoaded) {
    state.app.isLoaded = isLoaded;
  },
  [types.LOGOUT](state) {
    state.user = undefined;
  },
  [types.SET_USER](state, user) {
    state.user = user;
  },
};
