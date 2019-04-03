import * as firebase from 'firebase/app';

var config = {
    apiKey: "AIzaSyDBkyOZqsqWmZx4anyWnB5bTfk7rcIGSIM",
    authDomain: "burger-appliation.firebaseapp.com",
    databaseURL: "https://burger-appliation.firebaseio.com",
    projectId: "burger-appliation",
    storageBucket: "burger-appliation.appspot.com",
    messagingSenderId: "933703081970"
  };
  const fire = firebase.initializeApp(config);
export default fire;