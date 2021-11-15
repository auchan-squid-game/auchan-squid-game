import { getAuth } from 'firebase/auth';

import enigmas from '@/enigmas.json';
import devEnigmas from '@/dev-enigmas.json';
import types from '@/constants/mutation-types';
import router from '@/router';
import userServices from '@/services/user-services';

export default {
  /**
   * Add listener on authenticate state changes.
   * If the user is authenticated, he is redirect to the homepage, to the login page otherwise
   */
  syncActions({ commit }) {
    commit(types.IS_APP_LOADED, false);

    commit(types.SET_ENIGMAS_DATA, process.env.NODE_ENV === 'develop' ? devEnigmas : enigmas);

    getAuth().onAuthStateChanged(user => {
      const currentRoute = router.currentRoute.value.path;

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

  /**
   * Signing the user with data entered :
   * - Check if the user email is valid
   * - If all previous checks are OK, try to signin the user
   * @param {Object} user - user entered in the login form
   */
  signin({ commit, state }, user) {
    commit(types.RESET_SIGNIN_ERRORS);
    commit(types.IS_SIGNIN_PROCESSING, true);

    // Manage entered data
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      commit(types.SET_SIGNIN_ERROR, { input: 'email', message: 'Adresse mail invalide' });
    }

    // Signin user (if no previous error)
    if (!state.errors.signin.email) {
      userServices
        .signin(user)
        .catch(err => {
          if (err.code === 'auth/wrong-password') {
            commit(types.SET_SIGNIN_ERROR, { input: 'password', message: 'Mot de passe incorrect' });
          }
          if (err.code === 'auth/user-disabled') {
            commit(types.SET_SIGNIN_ERROR, { input: 'email', message: 'Utilisateur désactivé' });
          }
          if (err.code === 'auth/user-not-found') {
            commit(types.SET_SIGNIN_ERROR, { input: 'email', message: 'Adresse mail inconnue' });
          }
        })
        .finally(() => {
          commit(types.IS_SIGNIN_PROCESSING, false);
        });
    } else {
      commit(types.IS_SIGNIN_PROCESSING, false);
    }
  },

  /**
   * Signup the user with data entered :
   * - Check if the project code is correct
   * - Check the username length
   * - Check if the user email is valid
   * - Check if the password and the confirm password fileds have the same value
   * - Check the user password length
   * - If all previous checks are OK, try to signup the user
   * @param {Object} user - user entered in the signup form
   */
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

  /**
   * Logout the user.
   */
  logout({ commit }) {
    userServices.logout().then(() => commit(types.LOGOUT));
  },

  /**
   * Close enigma popup.
   */
  closeEnigmaPopup({ commit }) {
    commit(types.CLOSE_ENIGMA_POPUP);
  },

  /**
   * Show enigma popup.
   * @param {Object} enigma - enigma to show
   */
  showEnigmaPopup({ commit }, enigma) {
    commit(types.SHOW_ENIGMA_POPUP, enigma);
  },

  /**
   * Method that will get all answers that need to be checked in database.
   * It will run through all answers and if it finds that the answer has no field 'isapproved' it will ad it to the state.
   */
  getAllReponsesToCheck({ commit }) {
    commit(types.RESET_ANSWERS_TO_CHECK);
    userServices.getAllUsersThatHaveReponsesToCheck().then(users => {
      users.forEach(user =>
        Object.keys(user.answers).forEach(answerId => {
          if (user.answers[answerId].isApproved === undefined) {
            commit(types.ADD_ANSWER_TO_CHECK, {
              answerId: answerId,
              userAnswerInfos: { userId: user.id, username: user.username, response: user.answers[answerId].response },
            });
          }
        }),
      );
    });
  },

  /**
   * Submit user response.
   * @param {String} response - submitted response
   */
  submitResponse({ state }, response) {
    const user = state.user;
    const enigmeId = state.app.enigmaPopup.enigma.id;
    userServices.submitResponse(user, enigmeId, response);
  },

  /**
   * This method will set 5 additional points to the total of points of a user plus will add 1 point to the accumualation field.
   * It will also set the status of the answer to true as it is approved.
   * It will remove also the answer from the anwers to check in the state.
   * @param {Object} payload - represents the information about the answer from a user :
   *                           - id : The id of the enigma
   *                           - answer: information about the answer from the user (userId, username, response)
   */
  approveResponse({ commit }, { answer, id }) {
    userServices.get(answer.userId).then(user => {
      const userPoints = 5 + user.totalPoints + user.accumulation + 1;
      userServices.updateUserPointsOnApprove(answer.userId, userPoints, user.accumulation + 1).then(() => {
        userServices
          .updateAnswerResultOnApproveOrOnReject(answer.userId, id, true)
          .then(() => commit(types.REMOVE_ANSWER_TO_CHECK, { answerId: id, userAnswerInfos: answer }));
      });
    });
  },

  /**
   * This method will reset the accumulation field of a user to 0 as the answer is rejected.
   * It will aslo set the status of the answer to false.
   * It will remove also the answer from the anwers to check in the state.
   * @param {Object} { answer, id } - represents the information about the answer from a user :
   *                           - id : The id of the enigma
   *                           - answer: information about the answer from the user (userId, username, response)
   */
  rejectResponse({ commit }, { answer, id }) {
    userServices.updateUserPointsOnReject(answer.userId).then(() => {
      userServices.updateAnswerResultOnApproveOrOnReject(answer.userId, id, false).then(() => {
        commit(types.REMOVE_ANSWER_TO_CHECK, { answerId: id, userAnswerInfos: answer });
      });
    });
  },
  /**
   * This method will get all users from database and sort them according totalpoints.
   * It will also remove all admin from the ranking table.
   * From that it sets in the state the username and the totalpoints from each user in an array sorted by descending.
   */
  prepareRankingTable({ commit }) {
    userServices.getAllUsers().then(users => {
      const sortedUsersByTotalPoints = Object.values(users)
        .filter(user => user.role !== 'admin')
        .sort((userA, userB) => userB.totalPoints - userA.totalPoints)
        .map(user => {
          return { username: user.username, totalPoints: user.totalPoints };
        });
      commit(types.SET_RANKING, sortedUsersByTotalPoints);
    });
  },
};
