import * as firebase from "firebase";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyDB3m-Apx49xwGW7quq1VeTF9_K87oBzG8",
  authDomain: "easyorder-d75b1.firebaseapp.com",
  databaseURL: "https://easyorder-d75b1.firebaseio.com",
  projectId: "easyorder-d75b1",
  storageBucket: "easyorder-d75b1.appspot.com",
  messagingSenderId: "249020320402"
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
