import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import serviceAccount from '~/secret/firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(serviceAccount)
}

const auth = firebase.auth()
const db = firebase.firestore()

export { firebase, auth, db }
