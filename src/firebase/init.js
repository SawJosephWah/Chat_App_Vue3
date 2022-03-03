import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkI8sXlBHkZyMAfRyD0j_N5QlWIJPE_m0",
  authDomain: "vue3-chat-app-60da0.firebaseapp.com",
  projectId: "vue3-chat-app-60da0",
  storageBucket: "vue3-chat-app-60da0.appspot.com",
  messagingSenderId: "661820317470",
  appId: "1:661820317470:web:3045a21eb8f5f067f8b30f",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
