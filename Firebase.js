import firebase from 'firebase';
//import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVyORXwZZQQ8rjFJ1Uvm9rgmgR95RiE9Y",
  authDomain: "bulletin24-7.firebaseapp.com",
  projectId: "bulletin24-7",
  storageBucket: "bulletin24-7.appspot.com",
  messagingSenderId: "38537007517",
  appId: "1:38537007517:web:60f171a2b7504043a29f74"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export default db;




