<template>
  <header class="bg-white-transparent p-2 flex justify-between items-center">
    <section>
      <span
        class="p-1 cursor-pointer bg-white-light hover:bg-white-transparent inline-block rounded"
        @click="$router.push(`/${user.id}/boards`)"
      >
        <home-icon size="1.5x" class="text-white" />
      </span>
    </section>
    <section id="container-logout">
      <span
        class="rounded-full h-9 w-9 bg-white-light hover:shadow-2xl text-sm text-white
          flex justify-center items-center font-bold cursor-pointer"
        @click="showLogout"
      >
        <img v-if="user.photoURL" class="rounded-full" :src="user.photoURL" alt="Foto de perfil">
        <p v-else>
          {{ userInitials }}
        </p>
      </span>
      <span
        v-show="show"
        class="flex flex-col justify-center items-center border p-1 absolute right-1 top-12
          rounded bg-white shadow-2xl"
      >
        <img v-if="user.photoURL" class="rounded-full h-auto w-20" :src="user.photoURL" alt="Foto de perfil">
        <span v-else class="rounded-full h-20 w-20 bg-gray-50 flex justify-center items-center">
          <p class="text-5xl">
            {{ userInitials }}
          </p>
        </span>
        <p class="font-semibold">{{ user.displayName }}</p>
        <p class="opacity-50">{{ user.email }}</p>
        <span class="border m-2 px-4 py-1 cursor-pointer" @click="logout">
          <p class="text-xs mr-1 inline-block">Cerrar sesión</p>
          <logout-icon size="1.3x" class="inline-block" />
        </span>
      </span>
    </section>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { HomeIcon, LogoutIcon } from '@vue-hero-icons/outline'
export default {
  components: {
    HomeIcon,
    LogoutIcon
  },
  data: () => ({
    show: false
  }),
  computed: {
    ...mapGetters('auth', ['userInitials', 'user'])
  },
  mounted () {
    window.addEventListener('click', this.hideenLogout)
  },
  destroyed () {
    window.removeEventListener('click', this.hideenLogout)
  },
  methods: {
    ...mapActions({ logOut: 'auth/SIGN_OUT' }),
    logout () {
      this.logOut()
        .then(() => this.$router.push('/'))
    },
    showLogout () {
      this.show = !this.show
    },
    hideenLogout ({ target }) {
      const container = document.getElementById('container-logout')
      if (container) {
        if (!container.contains(target) && this.show) {
          this.show = false
        }
      }
    }
  }
}
</script>

<style>

</style>
