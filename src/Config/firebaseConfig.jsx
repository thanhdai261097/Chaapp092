import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-database'

var config = {
  apiKey: "AIzaSyCswcn2ZftnA9CJFdgu4Yv6XXVQGwGrh-o",
  authDomain: "chatapp092.firebaseapp.com",
  databaseURL: "https://chatapp092.firebaseio.com",
  projectId: "chatapp092",
  storageBucket: "chatapp092.appspot.com",
  messagingSenderId: "159371249098"
  };


firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true});

export default firebase;