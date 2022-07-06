import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDNCoGxJwafVr9pVmn1RYSRDnkWFA52v40",
  authDomain: "hypnotize-da4dc.firebaseapp.com",
  projectId: "hypnotize-da4dc",
  storageBucket: "hypnotize-da4dc.appspot.com",
  messagingSenderId: "445510443823",
  appId: "1:445510443823:web:4d3a7bd6c59e6d6e01f7da",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics();
export const provider = new firebase.auth.GoogleAuthProvider();
export const logOut = () => {
  auth.signOut();
};

export default firebase;
