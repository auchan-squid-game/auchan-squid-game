import { getAuth } from 'firebase/auth';

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

  /**
   * Signing the user with data entered :
   * - Check if the user email is valid
   * - If all previous checks are OK, try to signin the user
   *
   * @param {Object} user - user entered in the login form
   */
  signin({ commit, state }, user) {
    commit(types.RESET_SIGNIN_ERRORS);

    // Manage entered data
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      commit(types.SET_SIGNIN_ERROR, { input: 'email', message: 'Adressemail invalide' });
    }

    // Signin user (if no previous error)
    const errors = state.errors.signin;
    if (!errors.password || !errors.email) {
      //userServices.signin(user);
      userServices
        .signin(user)
        .catch(err => {
          if (err.code === 'auth/wrong-password') {
            commit(types.SET_SIGNIN_ERROR, { input: 'password', message: 'votre mode de passe est incorrecte' });
          }
          if (err.code === 'auth/user-disabled') {
            commit(types.SET_SIGNIN_ERROR, { input: 'email', message: 'Utilisateur désactivé' });
          }
          if (err.code === 'auth/user-not-found') {
            commit(types.SET_SIGNIN_ERROR, {
              input: 'email',
              message: 'Adresse mail inconnue, veuillez vous inscrire',
            });
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
   *
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
   * This method will set 5 additional points to the total of points of a user plus will add 1 point to the accumualation field.
   * It will also set the status of the answer to true as it is approved.
   * It will remove also the answer from the anwers to check in the state.
   *
   * @param {Object} payload - represents the information about the answer from a user :
   *                           - id : The id of the enigma
   *                           - answer: information about the answer from the user (userId, username, response)
   */
  approveResponse({ commit }, { answer, id }) {
    userServices.getUser(answer.userId).then(user => {
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
   *
   * @param {*} payload - represents the information about the answer from a user :
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
};
