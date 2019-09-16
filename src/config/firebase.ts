import * as firebase from "firebase";
import "firebase/firebase-firestore";

const config = {
  // Firebase Config Data
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
export const firebaseOrders = db.collection("orders");
export const firebaseUsers = db.collection("users");
export const firebaseRestaurantReviews = db.collection("restaurantReviews");
export const firebaseMenuItemReviews = db.collection("menuItemReviews");

export default firebase;
