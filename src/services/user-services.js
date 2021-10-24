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
};
