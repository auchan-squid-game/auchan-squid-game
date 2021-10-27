import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { get, ref, set } from 'firebase/database';

import db from '@/config/firebase';

export default {
  /**
   * Get all user data.
   *
   * @param {String} uid - user ID
   * @returns Promise with all user data.
   */
  get(uid) {
    return get(ref(db, `/users/${uid}`)).then(snap => snap.val());
  },

  /**
   * Logout the user.
   *
   * @returns Empty promise.
   */
  logout() {
    return signOut(getAuth());
  },

  /**
   * Initialize user data (role, total points, accumulation of points), add user data in firebase and signup the user.
   *
   * @param {Object} user - user data (username, email, password)
   * @returns Promise with user data stored in firebase.
   */
  signup({ username, email, password }) {
    return createUserWithEmailAndPassword(getAuth(), email, password).then(userCredentials => {
      const uid = userCredentials.user.uid;
      const user = { id: uid, username, role: 'player', totalPoints: 0, accumulation: 0 };
      return set(ref(db, `/users/${uid}`), user);
    });
  },

  /**
   * Signin the user.
   *
   * @param {Object} param0 - user data (email, password)
   * @returns Empty promise.
   */
  signin({ email, password }) {
    return signInWithEmailAndPassword(getAuth(), email, password);
  },
};
