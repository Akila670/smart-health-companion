// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyC0ihgW1S5vhwcOf_xjq_gItAwO9fMy9co",
  authDomain: "smart-health-companion-86e4a.firebaseapp.com",
  projectId: "smart-health-companion-86e4a",
  storageBucket: "smart-health-companion-86e4a.appspot.com",
  messagingSenderId: "282997723090",
  appId: "1:282997723090:web:2bcb44bcfa49613cda820b",
  measurementId: "G-P1DY4E22FT"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
