<template>
  <div class="bg-gradient-to-t from-gray-50 via-indigo-50 to-indigo-200 h-screen p-2 pt-8 flex flex-col items-center">
    <h1 class="text-xl font-bold ">
      Agile-Board
    </h1>
    <h2 class="font-bold mb-6">
      Colabore y gestione proyectos, con una mejor productividad.
    </h2>
    <button-base text="Iniciar" :click="redirectTo" class="max-w-md" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonBase from '~/components/ButtonBase.vue'

export default {
  components: { ButtonBase },
  layout: 'index',
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    route () {
      return this.isAuthenticated
        ? `/${this.user.id}/boards`
        : 'login'
    }
  },
  methods: {
    redirectTo () {
      return this.$router.push(this.route)
    }
  }
}
</script>

<style>

</style>
