import { auth } from '~/plugins/firebase'

export default ({ store, redirect }) => new Promise((resolve) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const { uid: id, email, photoURL, emailVerified, displayName } = user
      const authUser = { id, email, photoURL, emailVerified, displayName }
      resolve(store.commit('auth/SET_USER', authUser))
    } else {
      // unsubscribe and delete all state
      store.commit('auth/SET_USER', {})
      resolve(redirect('/login'))
    }
  })
})
