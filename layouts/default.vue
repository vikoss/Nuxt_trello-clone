<template>
  <div :class="`${backgroundColor} h-screen`">
    <header-base />
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderBase from '~/components/partials/HeaderBase.vue'

export default {
  components: {
    HeaderBase
  },
  computed: {
    ...mapGetters({ color: 'backgroundColor' }),
    backgroundColor () {
      return this.$route.name === 'boards-id'
        ? `bg-gradient-to-t from-${this.color}-400 via-${this.color}-500 to-gray-600`
        : 'bg-gradient-to-t from-blue-100 via-blue-300 to-gray-600'
    }
  }
}
</script>

<style>
</style>
