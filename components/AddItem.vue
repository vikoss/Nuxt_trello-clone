<template>
  <div>
    <section v-show="!showInput">
      <div
        class="flex items-center cursor-pointer bg-white-light hover:bg-white-transparent rounded shadow w-full text-white"
        @click="toggle"
      >
        <plus-icon size="2x" />
        <p>Agregar {{ nameItem }}</p>
      </div>
    </section>
    <section v-show="showInput">
      <section v-if="nameItem === 'tablero'" class="flex justify-between items-center">
        <p>Elige el color del tablero...</p>
        <v-swatches
          v-model="color"
          :swatches="colorValues"
          popover-x="left"
        />
      </section>
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
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'
import colors from '~/utils/colors'

export default {
  components: { XIcon, PlusIcon, VSwatches },
  props: {
    nameItem: {
      type: String,
      default: 'tarjeta'
    }
  },
  data: () => ({
    title: '',
    id: uuid(),
    showInput: false,
    color: Object.keys(colors)[0],
    colorValues: Object.keys(colors)
  }),
  methods: {
    createItem () {
      const item = this.nameItem === 'tablero'
        ? {
            background: colors[this.color],
            name: this.title
          }
        : this.title
      this.$emit('create-item', item)
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
