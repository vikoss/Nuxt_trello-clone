import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCdK3rqE1Au0P0Bd8Rt9Eg93qwLMKgNnS8',
    authDomain: 'trello-clone-f5cd7.firebaseapp.com',
    projectId: 'trello-clone-f5cd7',
    storageBucket: 'trello-clone-f5cd7.appspot.com',
    messagingSenderId: '733969222361',
    appId: '1:733969222361:web:043d28cbd10901ee048cc8'
  })
}

const auth = firebase.auth()
const db = firebase.firestore()
const provider = new firebase.auth.GoogleAuthProvider()

export { firebase, auth, db, provider }
