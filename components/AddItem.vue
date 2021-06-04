<template>
  <div>
    <section v-show="!showInput">
      <div
        class="flex items-center cursor-pointer bg-white-light hover:bg-white-transparent rounded shadow w-full"
        @click="toggle"
      >
        <plus-icon size="2x" />
        <p>Agregar {{ nameItem }}</p>
      </div>
    </section>
    <section v-show="showInput">
      <input
        :id="id"
        v-model="title"
        type="text"
        :name="id"
        placeholder="Escribe el titulo..."
        class="p-1.5 border-2 border-blue-800 focus:outline-none text-sm shadow w-full mb-1"
      >
      <section class="flex justify-between items-center">
        <input
          type="button"
          :value="`Agregar ${nameItem}`"
          class="bg-blue-700 hover:bg-blue-800 p-2 text-white rounded cursor-pointer"
          @click="createItem"
        >
        <x-icon
          size="2x"
          class="cursor-pointer hover:text-blue-900"
          @click="toggle"
        />
      </section>
    </section>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { XIcon, PlusIcon } from '@vue-hero-icons/outline'

export default {
  components: { XIcon, PlusIcon },
  props: {
    nameItem: {
      type: String,
      default: 'tarjeta'
    }
  },
  data: () => ({
    title: '',
    id: uuid(),
    showInput: false
  }),
  methods: {
    createItem () {
      this.$emit('create-item', this.title)
      this.toggle()
    },
    focus () {
      this.title = ''
    },
    toggle () {
      this.title = ''
      this.showInput = !this.showInput
      document.getElementById(this.id).focus()
      // ???
      setTimeout(() => {
        document.getElementById(this.id).focus()
      }, 50)
    }
  }
}
</script>

<style>

</style>
