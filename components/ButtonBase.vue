<template>
  <button
    :class="`bg-${color}-700 hover:bg-${color}-800 p-2 text-white rounded w-full`"
    @click="click"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'blue'
    },
    click: {
      type: Function,
      default: () => {}
    },
    text: {
      type: String,
      default: 'Enviar'
    }
  }

}
</script>

<style>

</style>
