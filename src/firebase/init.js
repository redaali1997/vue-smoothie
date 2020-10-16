import * as firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyANg0PO6ASjvTUWjcLG4okCX-Aqv1tbLPw",
  authDomain: "vue-smoothies-a891c.firebaseapp.com",
  databaseURL: "https://vue-smoothies-a891c.firebaseio.com",
  projectId: "vue-smoothies-a891c",
  storageBucket: "vue-smoothies-a891c.appspot.com",
  messagingSenderId: "668297564123",
  appId: "1:668297564123:web:f81718f62acb5542ef61fe",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore().settings({});
export default firebaseApp.firestore();
