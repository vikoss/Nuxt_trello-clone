<template>
  <input
    :id="id"
    :type="type"
    :name="name"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    class="px-2 py-1.5 border-2 border-blue-700 focus:outline-none focus:border-blue-800 text-sm shadow w-full"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
  }

}
</script>

<style>

</style>
