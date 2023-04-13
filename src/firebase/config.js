// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// import {
//   FIRE_BASE_API_KEY,
//   FIRE_BASE_AUTH_DOMAIN,
//   FIRE_BASE_PROJECT_ID,
//   FIRE_BASE_STORAGE_BUCKET,
//   FIRE_BASE_MESSAGING_SENDER_ID,
//   FIRE_BASE_APP_ID,
//   FIRE_BASE_MEASUREMENT_ID,
// } from "@env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDArUDMUPrUnY6BpNOif5C-08Dba4UhPzc",
  authDomain: "healthcaregrz.firebaseapp.com",
  projectId: "healthcaregrz",
  storageBucket: "healthcaregrz.appspot.com",
  messagingSenderId: "1020051476927",
  appId: "1:1020051476927:web:242d030aceaa0cb6dd910a",
  measurementId: "G-NFMSS33NVN",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
export { firebase, authentication };
