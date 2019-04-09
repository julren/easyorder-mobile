// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const restaurantsRef = admin.firestore().collection("restaurants");

exports.applyRestaurantReview = functions.firestore
  .document("reviews/{reviewId}")
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const review = snap.data();
    console.log("hi from applyRestaurantReview, doc: ", review);

    return getRestaurantDoc(review.restaurantID)
      .then(restaurantDoc => updateRestaurantRating(restaurantDoc, review))
      .then(() => {
        console.log("all done");
        return;
      })
      .catch(error => {
        console.log(error);
      });
  });

// Get RestaurantDoc for ID
const getRestaurantDoc = restaurantID => {
  return new Promise((resolve, reject) => {
    restaurantsRef
      .doc(restaurantID)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return resolve(doc);
        } else {
          // doc.data() will be undefined in this case
          return reject(Error("No such document!"));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

// Apply Review to restaurant rating by updating
// totalRatingPoints, numRatings and avgRating
const updateRestaurantRating = (restaurantDoc, review) => {
  return new Promise((resolve, reject) => {
    let updatedDoc = restaurantDoc.data();
    console.log("old rating data: ", totalRatingPoints, numRatings, avgRating);

    updatedDoc.totalRatingPoints += parseInt(review.rating);
    updatedDoc.totalNumRatings++;
    updatedDoc.avgRating =
      Math.round((totalRatingPoints / totalNumRatings) * 10) / 10;

    updatedDoc.ratingDistribution[review.rating].numRatings++;

    // Recalc rating distribution percentages
    for (ratingKey in updatedDoc.ratingDistribution) {
      updatedDoc.ratingDistribution[ratingKey].percentage =
        Math.round(
          (updatedDoc.ratingDistribution[ratingKey].numRatings /
            updatedDoc.totalNumRatings) *
            10
        ) / 10;
    }

    console.log(
      "trying to write new restaurant review fiels: ",
      updatedDoc.totalRatingPoints,
      updatedDoc.totalNumRatings,
      updatedDoc.avgRating,
      updatedDoc.ratingDistribution
    );

    restaurantDoc.ref
      .update(updatedDoc)
      .then(() => {
        console.log("successfully updated restaurant with rating");
        return resolve();
      })
      .catch(error => {
        console.log("error writing restaurant data", error);
        reject(error);
      });
  });
};

const reCalcRatingDistribution = (totalNumRatings, ratingDistribution) => {
  for (ratingKey in ratingDistribution) {
    ratingDistribution[ratingKey].percentage =
      Math.round(
        (ratingDistribution[ratingKey].numRatings / totalNumRatings) * 10
      ) / 10;
  }
  return ratingDistribution;
};
