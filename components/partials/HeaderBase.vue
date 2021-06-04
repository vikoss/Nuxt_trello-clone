<template>
  <header class="bg-white-transparent p-2 flex justify-between items-center">
    <span
      class="p-1 cursor-pointer bg-white-light hover:bg-white-transparent inline-block rounded"
      @click="$router.push(`/${$store.state.auth.user.id}/boards`)"
    >
      <home-icon size="1.5x" class="text-white" />
    </span>
    <span
      class="rounded-full h-8 w-8 bg-white-light hover:bg-white-transparent text-sm flex justify-center
        items-center font-bold cursor-pointer"
      @click="logOut"
    >
      VT
    </span>
  </header>
</template>

<script>
// import { MenuIcon } from "@vue-hero-icons/outline"
// import { LoginIcon } from "@vue-hero-icons/outline"
// import { LogoutIcon } from "@vue-hero-icons/outline"
// import { TrashIcon } from "@vue-hero-icons/outline"
import { mapActions } from 'vuex'
import { HomeIcon } from '@vue-hero-icons/outline'
export default {
  components: {
    HomeIcon
  },
  methods: {
    ...mapActions({ logOut: 'auth/SIGN_OUT' })
  }
}
</script>

<style>

</style>
