import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/compat/firestore';

const firebaseConfig= {
  apiKey: 'AIzaSyAsBJ-Hh1JZHyQ7hlZBpHVmhLuP80xOLHE',

  authDomain: 'webstore-63a0a.firebaseapp.com',

  projectId: 'webstore-63a0a',

  storageBucket: 'webstore-63a0a.appspot.com',

  messagingSenderId: '106055559664',

  appId: '1:106055559664:web:3dae7f14111d528de71535',

  measurementId: 'G-EPF9EXME80',
};

firebase.initializeApp(firebaseConfig);

export {firebase};
