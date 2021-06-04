import { auth } from '~/plugins/firebase'

export default {
  state: () => ({
    user: {}
  }),
  getters: {
    user: state => state.user,
    isAuthenticated: state => Object.prototype.hasOwnProperty.call(state.user, 'id')
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    }
  },
  actions: {
    SIGN_IN: ({ commit }, { email, password }) => new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          /* commit('SET_USER', {
            email: user.email,
            id: user.uid,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            displayName: user.displayName
          }) */
          resolve({ message: 'Ok!' })
        })
        .catch(error => reject(error))
    }),
    SIGN_OUT: ({ commit }) => new Promise((resolve, reject) => {
      auth.signOut()
        .then(() => {
          // commit('SET_USER', {})
          resolve()
        })
        .catch(error => reject(error))
    }),
    UPDATE_USER: ({ commit }) => {
      //
    }
  }
}
