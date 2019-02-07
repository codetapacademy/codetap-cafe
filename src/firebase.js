import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCr8ZedBYEGq-WyB8XSMHWRcX9mdJq3on0",
  authDomain: "codetap-cafe.firebaseapp.com",
  databaseURL: "https://codetap-cafe.firebaseio.com",
  projectId: "codetap-cafe",
  storageBucket: "codetap-cafe.appspot.com",
  messagingSenderId: "878157907725"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const database = firebase.database();

export { firestore, firebase, database };
// console && console.clear();
