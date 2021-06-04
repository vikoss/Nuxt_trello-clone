import { auth } from '~/plugins/firebase'

export default ({ store, redirect }) => new Promise((resolve) => {
  auth.onAuthStateChanged((user) => {
    /* let authUser = {}
    if (user) {
      const { uid: id, email, photoURL, emailVerified, displayName } = user
      authUser = { id, email, photoURL, emailVerified, displayName }
    }
    store.commit('auth/SET_USER', authUser)
    resolve() */

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
