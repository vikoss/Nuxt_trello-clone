export default ({ store, redirect, route }) => {
  // first time is always TRUE
  if (!store.getters['auth/isAuthenticated']) {
    if (route.name === 'index') {
      // pass
    } else if (route.name === 'login') {
      // pass
    } else if (route.name === 'invite-boardId') {
      // pass
    } else {
      return redirect('/login')
    }
  }
}
