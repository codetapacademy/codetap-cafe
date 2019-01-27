import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC4mxehIeT8igr8hM5Lw8w6WchI1Kei3Wg",
  authDomain: "codetap-cafe-2.firebaseapp.com",
  databaseURL: "https://codetap-cafe-2.firebaseio.com",
  projectId: "codetap-cafe-2",
  storageBucket: "codetap-cafe-2.appspot.com",
  messagingSenderId: "385499295793"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

export { firestore, firebase };
