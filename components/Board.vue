<template>
  <div
    :class="`bg-${colorDefault}-200 hover:bg-${colorDefault}-400 rounded-lg shadow-2xl h-24 cursor-pointer`"
    @click="$router.push(route)"
  >
    <p class="p-2 text-gray font-bold">
      {{ name }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: String,
      default: '#'
    },
    name: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    colorDefault () {
      return this.color === '' ? 'gray' : this.color
    }
  }
}
</script>

<style>

</style>
