<template>
  <div class="p-6 shadow-lg bg-white rounded max-w-sm mt-12 h-auto">
    <h1 class="text-center text-base font-bold mb-6">
      Iniciar sesión
    </h1>
    <p v-if="error" class="text-center text-red-700 mb-6">
      {{ error }}
    </p>
    <input-base
      id="email"
      v-model="form.email"
      name="email"
      placeholder="Escribe tu correo"
      class="mb-4"
    />
    <input-base
      id="password"
      v-model="form.password"
      name="password"
      placeholder="Escribe tu contraseña"
      type="password"
      class="mb-4"
    />
    <button-base
      :click="login"
      text="Iniciar sesión"
    />
    <p class="text-center my-5">
      o
    </p>
    <button-base
      color="gray"
      text="🔒 Continuar con Google"
      :click="loginWithGoogle"
    />
    <!--div class="w-full border-b border-gray-400 mb-5 mt-12" />
    <h2 class="cursor-pointer text-center hover:underline text-blue-700 hover:text-blue-800">
      Crear cuenta nueva
    </h2-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InputBase from '~/components/InputBase'
import ButtonBase from '~/components/ButtonBase'

export default {
  components: {
    InputBase,
    ButtonBase
  },
  layout: 'login',
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    error: null
  }),
  methods: {
    ...mapActions({ signIn: 'auth/SIGN_IN', signInWithGoogle: 'auth/SIGN_IN_WITH_GOOGLE' }),
    login () {
      this.error = null
      this.signIn(this.form)
        .then(() => this.$router.push(`/${this.$store.state.auth.user.id}/boards`))
        .catch(() => (this.error = 'El correo y/o contraseña son incorrectos.'))
    },
    loginWithGoogle () {
      this.error = null
      this.signInWithGoogle()
        .then(() => this.$router.push(`/${this.$store.state.auth.user.id}/boards`))
        .catch(() => (this.error = 'Upps ocurrio un problema.'))
    }
  }
}
</script>

<style>

</style>
