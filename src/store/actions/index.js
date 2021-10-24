import { getAuth } from 'firebase/auth';

import types from '@/constants/mutation-types';
import router from '@/router';
import userServices from '@/services/user-services';

export default {
  syncActions({ commit }) {
    commit(types.IS_APP_LOADED, false);
    getAuth().onAuthStateChanged(user => {
      if (user) {
        userServices.get(user.uid).then(userData => {
          commit(types.SET_USER, userData);
          commit(types.IS_APP_LOADED, true);
          router.push('/');
        });
      } else {
        commit(types.LOGOUT);
        commit(types.IS_APP_LOADED, true);
        router.push('/login');
      }
    });
  },
  createUserAccount({ commit }, user) {
    userServices.signup(user).then(user => commit(types.SET_USER, user));
  },
  logout({ commit }) {
    userServices.logout().then(() => commit(types.LOGOUT));
  },
};
