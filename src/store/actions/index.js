import database from '../../configs/firebase';
import { ref, set } from 'firebase/database';

export default {
  registerNewUser: ({ commit }, payload) => {
    const id = Math.floor(new Date().getTime() / 1000);
    const user = {
      pseudo: payload.username,
      id: id,
      password: payload.password,
      role: 'admin',
      totalPoints: 0,
      accumulationNumber: 0,
      answers: {},
    };
    set(ref(database, `users/${id}`), {
      user,
    });
    commit('uploadUser', user);
  },
};
