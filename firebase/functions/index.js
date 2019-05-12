const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const restaurantsRef = admin.firestore().collection("restaurants");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onCreateNewRestaurant = functions.firestore
  .document("restaurants/{restaurantId}")
  .onCreate((snap, context) => {
    if (snap.exists) {
      const restaurant = snap.data();

      // Add rating fields
      restaurant.rating = {
        totalRatingPoints: 0,
        totalNumRatings: 0,
        avgRating: 0,
        ratingDistribution: {
          "5": 0,
          "4": 0,
          "3": 0,
          "2": 0,
          "1": 0
        }
      };

      return snap.ref
        .update(restaurant)
        .then(() => {
          return console.log("successfully added rating fields on restaurant");
        })
        .catch(error => {
          return console.log(error);
        });
    } else {
      return;
    }
  });

exports.onCreateNewMenuItem = functions.firestore
  .document(
    "restaurants/{restaurantId}/menuSections/{menuSectionsId}/menuItem/{menuItemId}"
  )
  .onCreate((snap, context) => {
    if (snap.exists) {
      const menuItem = snap.data();

      // Add rating fields
      menuItem.rating = {
        totalRatingPoints: 0,
        totalNumRatings: 0,
        avgRating: 0,
        ratingDistribution: {
          "5": 0,
          "4": 0,
          "3": 0,
          "2": 0,
          "1": 0
        }
      };

      return snap.ref
        .update(menuItem)
        .then(() => {
          return console.log("successfully added rating fields on menuItem");
        })
        .catch(error => {
          return console.log(error);
        });
    } else {
      return;
    }
  });

exports.applyRestaurantReview = functions.firestore
  .document("restaurantReviews/{resturantReviewId}")
  .onCreate(async (snap, context) => {
    if (snap.exists) {
      try {
        const resturantReviewData = snap.data();
        console.log(
          "triggerd applyRestaurantReview onCreate with creation of review: ",
          resturantReviewData
        );

        const restaurantDoc = await restaurantsRef
          .doc(resturantReviewData.restaurantID)
          .get();

        const newRating = applyReviewCalc(
          restaurantDoc.data(),
          resturantReviewData
        );

        await restaurantDoc.ref.update({ rating: newRating });
        console.log(
          "restaurantDoc update Success! - new Rating should be; ",
          newRating
        );
      } catch (error) {
        console.log("applyRestaurantReview Error: ", error);
        return;
      }
    } else {
      return;
    }
  });

exports.applyMenuItemReview = functions.firestore
  .document("menuItemReviews/{menuItemReviewsId}")
  .onCreate(async (snap, context) => {
    if (snap.exists) {
      try {
        const menuItemReviewData = snap.data();
        console.log(
          "triggerd applyMenuItemReview onCreate with creation of review: ",
          menuItemReviewData
        );

        const menuItemDoc = await restaurantsRef
          .doc(menuItemReviewData.restaurantID)
          .collection("menuSections")
          .doc(menuItemReviewData.menuSectionID)
          .collection("menuItems")
          .doc(menuItemReviewData.menuItemID)
          .get();

        const newRating = applyReviewCalc(
          menuItemDoc.data(),
          menuItemReviewData
        );

        await menuItemDoc.ref.update({ rating: newRating });
        console.log(
          "menuItemDoc update Success! - new Rating should be; ",
          newRating
        );
      } catch (error) {
        console.log("applyMenuItemReview Error: ", error);
        return;
      }
    } else {
      return;
    }
  });

// // Get RestaurantDoc for ID
// const getMenuItemDoc = (restaurantID, menuItemID, menuSectionID) => {
//   return new Promise((resolve, reject) => {
//     restaurantsRef
//       .doc(restaurantID)
//       .collection("menuSections")
//       .doc(menuSectionID)
//       .collection("menuItems")
//       .doc(menuItemID)
//       .get()
//       .then(doc => {
//         if (doc.exists) {
//           return resolve(doc);
//         } else {
//           // doc.data() will be undefined in this case
//           return reject(
//             new Error(
//               "getMenuItemDoc - No such document!",
//               restaurantID,
//               menuItemID,
//               menuSectionID
//             )
//           );
//         }
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// updateRestaurantDoc = (restaurantDoc, restaurantWithRatingApplied) => {
//   return restaurantDoc.ref
//     .update({ restaurantWithRatingApplied })
//     .then(() => {
//       console.log(
//         "successfully updated restaurant with rating. should look like this now: ",
//         restaurantWithRatingApplied
//       );
//       return;
//     })
//     .catch(error => {
//       console.log("error writing restaurant data", error);
//       throw error;
//     });
// };

// type rating = {
//   totalRatingPoints: number;
//   totalNumRatings: number;
//   avgRating: number;
//   ratingDistribution: {
//     "5": number;
//     "4": number;
//     "3": number;
//     "2": number;
//     "1": number;
//   };
// };

const applyReviewCalc = (data, review) => {
  console.log("applyReviewCalc", data, review);
  console.log("applyReviewCalc: OLD: ", data);
  let {
    totalRatingPoints,
    totalNumRatings,
    avgRating,
    ratingDistribution
  } = data.rating;

  totalRatingPoints += parseInt(review.rating);
  totalNumRatings++;
  avgRating = Math.round((totalRatingPoints / totalNumRatings) * 10) / 10;

  ratingDistribution[review.rating]++;

  // Recalc rating distribution percentages

  for (const ratingKey in ratingDistribution) {
    ratingDistribution[ratingKey].percentage =
      Math.round(
        (ratingDistribution[ratingKey].numRatings / totalNumRatings) * 10
      ) / 10;
  }

  const newRating = {
    totalRatingPoints: totalRatingPoints,
    totalNumRatings: totalNumRatings,
    avgRating: avgRating,
    ratingDistribution: ratingDistribution
  };

  console.log("applyReviewCalc: NEW: ", newRating);
  return newRating;
};
