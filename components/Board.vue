<template>
  <div
    :class="`bg-${colorDefault}-300 hover:bg-${colorDefault}-400 rounded-lg shadow-lg h-24 cursor-pointer`"
    @click="$router.push(route)"
  >
    <p class="p-2 text-white font-bold">
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
    color: String
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
