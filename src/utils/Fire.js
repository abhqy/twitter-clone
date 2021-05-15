import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCHbfOFy9-OuwQt0HoMyO9731ZpY4zLea8",
  authDomain: "scriptum-b1012.firebaseapp.com",
  databaseURL: "https://scriptum-b1012.firebaseio.com",
  projectId: "scriptum-b1012",
  storageBucket: "scriptum-b1012.appspot.com",
  messagingSenderId: "380916892493",
  appId: "1:380916892493:web:13258413c6964dda326d04",
  measurementId: "G-5S12DQ2MBR",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
