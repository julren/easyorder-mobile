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

export const firebaseRestaurants = db.collection("restaurants");
export const firebaseMenuCategories = db.collection("categories");
export const firebaseMenuItems = db.collection("menuItems");
export const firebaseOrders = db.collection("orders");
export const firebaseReviews = db.collection("reviews");
export const firebaseTables = db.collection("tables");

export default firebase;
