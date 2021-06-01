import { auth } from './../../plugins/firebase'

export default {
  state: () => ({
    user: {}
  }),
  getters: {
    user: state => state.user
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
          commit('SET_USER', { email: user.email, id: user.uid })
          resolve({ message: 'Ok!' })
        })
        .catch(error => reject(error))
    }),
    UPDATE_USER: ({ commit }) => {
      //
    }
  }
}
