const admin = require('firebase-admin');

let firebaseApp;

function getFirebaseApp() {
  if (firebaseApp) {
    return firebaseApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase service account env vars');
  }

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });

  return firebaseApp;
}

function getStorageBucket() {
  const app = getFirebaseApp();
  const bucket = app.storage().bucket();

  if (!bucket || !bucket.name) {
    throw new Error('Missing FIREBASE_STORAGE_BUCKET env var');
  }

  return bucket;
}

module.exports = {
  getStorageBucket,
};
