<template>
  <div class="bg-purple-200 hover:bg-purple-300 rounded-lg shadow-lg h-24">
    <a :href="href" class="inline-block w-full h-full">
      <p class="p-2">{{ name }}</p>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: '#'
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
