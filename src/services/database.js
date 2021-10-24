import { getDatabase, ref, set } from 'firebase/database';

export default {
  writeUserData(user) {
    const db = getDatabase();
    set(ref(db, `users/${user.id}`), {
      user,
    });
  },
};
