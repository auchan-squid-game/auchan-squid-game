import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { get, ref, set, update } from 'firebase/database';

import db from '@/config/firebase';

export default {
  get(uid) {
    return get(ref(db, `/users/${uid}`)).then(snap => snap.val());
  },
  logout() {
    return signOut(getAuth());
  },
  signup({ username, email, password }) {
    return createUserWithEmailAndPassword(getAuth(), email, password).then(userCredentials => {
      const uid = userCredentials.user.uid;
      const user = { id: uid, username, role: 'player', totalPoints: 0, accumulation: 0 };
      return set(ref(db, `/users/${uid}`), user).then(() => user);
    });
  },
  /**
   * This method will call the database and retreive all users.
   * From that, it will filter all users that have at least one answer that needs to be checked.
   * @returns {Array<Object>} an array of user object.
   */
  getAllUsersThatHaveReponsesToCheck() {
    return get(ref(db, '/users/')).then(dataSnapshot => {
      return Object.values(dataSnapshot.val()).filter(userValues => {
        return userValues.answers && Object.values(userValues.answers).some(answer => answer.isApproved === undefined);
      });
    });
  },
  /**
   * This method will call the database to get all information from user with a given user id.
   * @param {String} userId - the id of the user from which we want to get information.
   * @returns {Promise<Object>} - a promise that shoud be handled from the caller. Promise will return a user object on succed.
   */
  getUser(userId) {
    return get(ref(db, `/users/${userId}/`)).then(userSnap => {
      return userSnap.val();
    });
  },
  /**
   * This function will call the database and set new total points and acuumulation points for a user with a given id.
   * @param {String} userId - the id of the user.
   * @param {Number} points - the total number of points of the user that should be updated.
   * @param {Number} newAccumulation - the total number of accumulation that should be updated for the user.
   * @returns {Promise<void>} - a promise without any data. Will be resolved if data successfully updated itself on server.
   */
  updateUserPointsOnApprove(userId, totalPoints, accumulation) {
    return update(ref(db, `/users/${userId}`), { totalPoints, accumulation });
  },
  /**
   * This method will call the database and set a status for a given answer and for a given user.
   * @param {String} userId - the id of the user.
   * @param {String} answerId - the id of the answer that should have its status updated.
   * @param {Boolean} isApproved - true if answer was approved otherwise false.
   * @returns {Promise<void>} - a promise without any data. Will be resolved if data successfully updated itself on server.
   */
  updateAnswerResultOnApproveOrOnReject(userId, answerId, isApproved) {
    return set(ref(db, `/users/${userId}/answers/${answerId}/isApproved`), isApproved);
  },
  /**
   * This method will call the database and reset the accumulation field to 0 for a given user.
   * @param {String} userId - the id of a user.
   * @returns {Promise<void>} - a promise without any data. Will be resolved if data successfully updated itself on server.
   */
  updateUserPointsOnReject(userId) {
    return update(ref(db, `/users/${userId}`), { accumulation: 0 });
  },
};
