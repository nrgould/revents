import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCEPmPU1iwoCV1MRx3D1dPj_Ak-aCTij0w',
    authDomain: 'revents-course-c5294.firebaseapp.com',
    projectId: 'revents-course-c5294',
    storageBucket: 'revents-course-c5294.appspot.com',
    messagingSenderId: '985940195730',
    appId: '1:985940195730:web:a6b66818450dc0c185694b',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
