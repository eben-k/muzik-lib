export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY!,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN!,
  databaseURL: process.env.REACT_APP_DATABASE_URL!,
  projectId: process.env.REACT_APP_PROJECT_ID!,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET!,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID!,
  appId: process.env.REACT_APP_APP_ID!,
};

export const appEnv = process.env.REACT_APP_ENV!;

export const clientId = process.env.REACT_APP_CLIENT_ID;

export const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

export const redirectURL = process.env.REACT_APP_REDIRECT_URI;
