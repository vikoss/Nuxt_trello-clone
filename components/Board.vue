<template>
  <div
    :class="`bg-${colorDefault}-200 hover:bg-${colorDefault}-400 rounded-lg shadow-2xl h-24 cursor-pointer`"
    @click="openBoard"
  >
    <p class="p-2 text-gray font-bold">
      {{ name }}
    </p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

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
  },
  methods: {
    ...mapMutations({ setBackgroundColor: 'SET_BACKGROUND_COLOR' }),
    openBoard () {
      this.setBackgroundColor(this.color)
      return this.$router.push(this.route)
    }
  }
}
</script>

<style>

</style>
