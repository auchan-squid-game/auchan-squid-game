import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCn0jdkv7fhZzN7jB6vzOejCwm9V2rlWDs',
  authDomain: 'auchansquidgame.firebaseapp.com',
  databaseURL: 'https://auchansquidgame-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'auchansquidgame',
  storageBucket: 'auchansquidgame.appspot.com',
  messagingSenderId: '377290913124',
  appId: '1:377290913124:web:b74901a6bb7d460101f671',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;
