import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { get, ref, set } from 'firebase/database';

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
  getAllUsersThatHaveReponsesToCheck() {
    return get(ref(db, '/users/')).then(dataSnapshot => {
      return Object.values(dataSnapshot.val()).filter(userValues => {
        return userValues.answers && Object.values(userValues.answers).some(answer => answer.isApproved === undefined);
      });
    });
  },
  getUser(userId) {
    return get(ref(db, `/users/${userId}/`));
  },
  updateUserPointsOnApprove(userId, points, newAccumulation) {
    const user = {
      totalPoints: points,
      accumulation: newAccumulation,
    };
    return set(ref(db, `/users/${userId}/`), user);
  },
  updateAnswerResultOnApproveOrOnReject(userId, answerId, isApproved) {
    return set(ref(db, `/users/${userId}/answers/${answerId}/isApproved`), isApproved);
  },
};
