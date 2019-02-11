const functions = require("firebase-functions");
const Firestore = require("@google-cloud/firestore");

const firestore = new Firestore();
console.log("test");

exports.onUserStatusChanged = functions.database
  .ref("/status/{uid}") // Reference to the Firebase RealTime database key
  .onUpdate((snapshot, context) => {
    const usersRef = firestore.collection("user"); // Create a reference to the Firestore Collection
    console.log(
      `Snapshot: ${JSON.stringify(snapshot)} - Context: ${JSON.stringify(
        context
      )}`
    );
    if (snapshot.after === "offline") {
      // Set the Firestore's document's online value to false
      usersRef.doc(context.params.uid).set(
        {
          online: false
        },
        { merge: true }
      );
    }
  });
