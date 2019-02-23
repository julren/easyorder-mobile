import * as firebase from "firebase";
import "firebase/firebase-firestore";

const config = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***",
  messagingSenderId: "***REMOVED***"
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
const storage = firebase.storage();
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

const firebaseRestaurants = db.collection("restaurants");
const firebaseMenuCategories = db.collection("categories");
const firebaseMenuItems = db.collection("menuItems");
const firebaseOrders = db.collection("orders");

export default firebase;
export {
  firebaseRestaurants,
  firebaseMenuCategories,
  firebaseMenuItems,
  firebaseOrders
};
