<template>
  <header class="bg-white-transparent p-2 flex justify-between items-center">
    <span
      class="p-1 cursor-pointer bg-white-light hover:bg-white-transparent inline-block rounded"
      @click="$router.push(`/${$store.state.auth.user.id}/boards`)"
    >
      <home-icon size="1.5x" class="text-white" />
    </span>
    <section>
      <span
        class="rounded-full h-8 w-8 bg-white-light hover:bg-white-transparent text-sm text-white
          flex justify-center items-center font-bold cursor-pointer"
        @click="logOut"
      >
        VT
      </span>
      <div class="cursor-pointer">
        <span class="flex justify-center items-center border border-black p-1">
          <p class="text-xs mr-1">Cerrar sesión</p>
          <logout-icon size="1.3x" />
        </span>
      </div>
    </section>
  </header>
</template>

<script>
// import { MenuIcon } from "@vue-hero-icons/outline"
// import { LoginIcon } from "@vue-hero-icons/outline"
// import { LogoutIcon } from "@vue-hero-icons/outline"
// import { TrashIcon } from "@vue-hero-icons/outline"
import { mapActions } from 'vuex'
import { HomeIcon, LogoutIcon } from '@vue-hero-icons/outline'
export default {
  components: {
    HomeIcon,
    LogoutIcon
  },
  methods: {
    ...mapActions({ logOut: 'auth/SIGN_OUT' })
  }
}
</script>

<style>

</style>
