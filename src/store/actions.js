import { getAuth } from 'firebase/auth';

import types from '@/constants/mutation-types';
import router from '@/router';
import userServices from '@/services/user-services';

export default {
  syncActions({ commit }) {
    commit(types.IS_APP_LOADED, false);

    getAuth().onAuthStateChanged(user => {
      const currentRoute = router.currentRoute.path;

      if (user) {
        userServices.get(user.uid).then(userData => {
          commit(types.SET_USER, userData);
          commit(types.IS_APP_LOADED, true);

          if (currentRoute === '/login' || currentRoute === '/signup') router.push('/');
        });
      } else {
        commit(types.LOGOUT);
        commit(types.IS_APP_LOADED, true);

        if (currentRoute !== '/login' && currentRoute !== '/signup') router.push('/login');
      }
    });
  },
  createUserAccount({ commit, state }, user) {
    commit(types.IS_SIGNUP_PROCESSING, true);
    commit(types.RESET_SIGNUP_ERRORS);

    // Manage entered data
    if (user.projectCode !== 'ARF') {
      commit(types.SET_SIGNUP_ERROR, { input: 'projectCode', message: 'Code projet incorrect' });
    }
    if (user.username.length < 8) {
      commit(types.SET_SIGNUP_ERROR, {
        input: 'username',
        message: 'Le nom utilisateur doit contenir au moins 8 caracteres',
      });
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      commit(types.SET_SIGNUP_ERROR, { input: 'email', message: 'Adresse mail invalide' });
    }
    if (user.password !== user.confirmPassword) {
      commit(types.SET_SIGNUP_ERROR, { input: 'password', message: 'Confirmation du mot de passe incorrecte' });
    }
    if (user.password.length < 8) {
      commit(types.SET_SIGNUP_ERROR, {
        input: 'password',
        message: 'Le mot de passe doit contenir au moins 8 caracteres',
      });
    }

    // Signup user (if no previous error)
    const errors = state.errors.signup;
    if (!errors.projectCode && !errors.username && !errors.email && !errors.password) {
      userServices
        .signup(user)
        .then(user => commit(types.SET_USER, user))
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            commit(types.SET_SIGNUP_ERROR, { input: 'email', message: 'Adresse mail deja utilisee' });
          }
          if (err.code === 'auth/invalid-email') {
            commit(types.SET_SIGNUP_ERROR, { input: 'email', message: 'Adresse mail invalide' });
          }
          if (err.code === 'auth/weak-password') {
            commit(types.SET_SIGNUP_ERROR, { input: 'password', message: 'Mot de passe pas trop faible' });
          }
        })
        .finally(() => {
          commit(types.IS_SIGNUP_PROCESSING, false);
        });
    } else {
      commit(types.IS_SIGNUP_PROCESSING, false);
    }
  },
  logout({ commit }) {
    userServices.logout().then(() => commit(types.LOGOUT));
  },
  // eslint-disable-next-line no-unused-vars
  getAllReponsesToCheck({ commit }) {
    userServices.getAllUsersThatHaveReponsesToCheck().then(users => {
      users.forEach(user =>
        Object.keys(user.answers).forEach(answerId => {
          if (user.answers[answerId].isApproved === undefined) {
            commit(types.SET_ANSWERS_TO_CHECK, {
              answerId: answerId,
              userAnswerInfos: { userId: user.id, username: user.username, response: user.answers[answerId].response },
            });
          }
        }),
      );
    });
  },
  // eslint-disable-next-line no-unused-vars
  approveResponse({ commit }, payload) {
    userServices.getUser(payload.answer.userId).then(dataSnapshot => {
      const user = dataSnapshot.val();
      console.log('totalpoints: ' + user);
      const userPoints = 5 + user.totalPoints + user.accumulation + 1;
      console.log(userPoints);
      userServices.updateUserPointsOnApprove(payload.answer.userId, userPoints, user.accumulation + 1);
      userServices.updateAnswerResultOnApproveOrOnReject(payload.answer.userId, payload.id, true);
      commit(types.REMOVE_ANSWER_FROM_ANSWER_TO_CHECK, { answerId: payload.id, userAnswerInfos: payload.answer });
    });
  },
};
