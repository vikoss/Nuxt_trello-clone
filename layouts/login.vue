<template>
  <div class="bg-gray-50 h-screen">
    <div class="flex justify-center">
      <Nuxt />
    </div>
    <footer-base />
  </div>
</template>

<script>
import FooterBase from '~/components/partials/FooterBase.vue'

export default {
  components: {
    FooterBase
  },
  data: () => ({
    image: ''
  })

}
</script>

<style>

</style>
