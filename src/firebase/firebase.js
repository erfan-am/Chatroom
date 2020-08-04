import *as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyBly-3JJYVvgdinrQP5LKbrZnwU64_sB0I",
  authDomain: "slack-chat-c678a.firebaseapp.com",
  databaseURL: "https://slack-chat-c678a.firebaseio.com",
  projectId: "slack-chat-c678a",
  storageBucket: "slack-chat-c678a.appspot.com",
  messagingSenderId: "781604306563",
  appId: "1:781604306563:web:c5eaff8ed549a06a2a65b6",
  measurementId: "G-4E9ZCH7V0D"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
