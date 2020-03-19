import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDHl3Mn1tvUCYnYpppveP4JEpGKMNB07kY",
    authDomain: "capstone-d8f0d.firebaseapp.com",
    databaseURL: "https://capstone-d8f0d.firebaseio.com",
    projectId: "capstone-d8f0d",
    storageBucket: "capstone-d8f0d.appspot.com",
    messagingSenderId: "1063814651823",
    appId: "1:1063814651823:web:b5a0c93990d020f5e5995a",
    measurementId: "G-F2G5YS6CD9"
  };
  
  let app = Firebase.initializeApp(config);
  export const db = app.database();
