import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import { firebase } from '@/configs/firebase.js';

export default {
  createNewUser(userSignUpInfos) {
    console.log(userSignUpInfos);
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, userSignUpInfos.email, userSignUpInfos.password);
  },
  getNewUserTemplate(userCredential) {
    console.log(userCredential.user.email);
    const pseudo = userCredential.user.email.split('@')[0];
    return {
      pseudo: pseudo,
      id: userCredential.user.uid,
      role: 'player',
      totalPoints: '0',
      accumulationNumber: '0',
      answers: {},
    };
  },
};
