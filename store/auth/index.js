import { auth, provider } from '~/plugins/firebase'

export default {
  state: () => ({
    user: {}
  }),
  getters: {
    user: state => state.user,
    isAuthenticated: state => Object.prototype.hasOwnProperty.call(state.user, 'id'),
    userInitials: state => (state.user.displayName
      ? state.user.displayName.charAt()
      : state.user.email
        ? state.user.email.charAt()
        : '').toUpperCase()
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    }
  },
  actions: {
    SIGN_IN: (ctx, { email, password }) => new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password)
        .then(() => resolve({ message: 'Ok!' }))
        .catch(error => reject(error))
    }),
    SIGN_OUT: ctx => new Promise((resolve, reject) => {
      auth.signOut()
        .then(() => resolve())
        .catch(error => reject(error))
    }),
    UPDATE_USER: ({ commit }) => {
      //
    },
    SIGN_IN_WITH_GOOGLE: ctx => new Promise((resolve, reject) => {
      auth.signInWithPopup(provider)
        .then(() => resolve({ message: 'Ok!' }))
        .catch(error => reject(error))
    })
  }
}
