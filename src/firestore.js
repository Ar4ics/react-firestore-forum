import firebase from "firebase";
import "firebase/firestore";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDGf8uAVRBi30uEzqeMBCmjkyDrLwXLXn0",
    authDomain: "gamer-forum.firebaseapp.com",
    databaseURL: "https://gamer-forum.firebaseio.com",
    projectId: "gamer-forum",
    storageBucket: "gamer-forum.appspot.com",
    messagingSenderId: "103617579238"
};
firebase.initializeApp(config);
let db = firebase.firestore();

export default db;