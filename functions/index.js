const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();


exports.checkUserPoints = onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const userId = context.auth.uid;
  const requiredPoints = data.requiredPoints;

  try {
    const userRef = admin.database().ref(`users/${userId}`);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    if (!userData) {
      throw new functions.https.HttpsError('not-found', 'User data not found.');
    }

    const userPoints = userData.points || 0;

    if (userPoints >= requiredPoints) {
      return { success: true, message: "User has enough points." };
    } else {
      return { success: false, message: "Not enough points." };
    }
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error.message, error);
  }
});
