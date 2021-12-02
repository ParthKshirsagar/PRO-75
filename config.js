import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAJKYBCpIJxADxekGlysxszpdAU2xFA3aA",
    authDomain: "pro-75-24693.firebaseapp.com",
    projectId: "pro-75-24693",
    storageBucket: "pro-75-24693.appspot.com",
    messagingSenderId: "201603466768",
    appId: "1:201603466768:web:d6c5dcfabb0c1230acac95"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();