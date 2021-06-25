import { auth } from '~/plugins/firebase'

export default ({ store }) => new Promise((resolve) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const { uid: id, email, photoURL, emailVerified, displayName } = user
      store.commit('auth/SET_USER', { id, email, photoURL, emailVerified, displayName })
    } else {
      store.commit('auth/SET_USER', {})
    }
    resolve()
  })
})
