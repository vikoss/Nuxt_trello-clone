<template>
  <div>
    <h1>sign in</h1>
    <h1>Email</h1>
    <input id="email" v-model="form.email" type="text" name="email">
    <h1>Password</h1>
    <input id="password" v-model="form.password" type="password" name="password">
    <input type="button" value="Login" @click="login">
    {{ form }}
    <h1 v-if="error">
      {{ error }}
    </h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    error: null
  }),
  methods: {
    login () {
      this.error = null
      this.$store.dispatch('auth/SIGN_IN', this.form)
        .then(() => this.$router.push(`/${this.$store.state.auth.user.id}/boards`))
        .catch(() => (this.error = 'Wrong email or password.'))
    }
  }
}
</script>

<style>

</style>
