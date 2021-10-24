import authentificationService from '@/services/authentification.js';
import databaseServices from '@/services/database.js';

export default {
  registerNewUser: (commit, payload) => {
    authentificationService
      .createNewUser(payload)
      .then(userCredential => {
        console.log(userCredential);
        const user = authentificationService.getNewUserTemplate(userCredential);
        if (user) databaseServices.writeUserData(user);
        console.log(user);
        //Save user into DB with UID
        //Commit user into store
      })
      .catch(error => {
        console.log(error);
        //commit error to store
      });
  },
};
