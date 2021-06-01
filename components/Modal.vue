<template>
  <transition name="modal-fade">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-2 pb-4 sm:p-2 sm:pb-4">
            <div class="flex justify-between">
              <span class="flex justify-center items-center">
                <CreditCardIcon size="2x" class="mr-2" />
                <p>Titulo</p>
              </span>
              <XIcon size="2x" class="hover:bg-gray-100 cursor-pointer" @click="close" />
            </div>
            <div class="">
              <input
                id="title"
                :value="card.title"
                type="text"
                name="title"
                class="p-1.5 border-2 border-blue-800 focus:outline-none text-sm shadow w-full mb-1"
                @input="setCardProperti($event, 'title')"
              >
              <span class="flex">
                <DocumentTextIcon size="2x" />
                <p>Descripcion</p>
              </span>
              <span>
                <textarea
                  id="description"
                  :value="card.description"
                  name="description"
                  cols="30"
                  rows="10"
                  placeholder="Agrega una descripcion..."
                  class="focus:outline-none p-1.5 border-2 border-blue-800 text-sm shadow w-full"
                  @input="setCardProperti($event, 'description')"
                />
              </span>
            </div>
            <button @click="update">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { CreditCardIcon, XIcon, DocumentTextIcon } from '@vue-hero-icons/solid'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    CreditCardIcon,
    XIcon,
    DocumentTextIcon
  },
  computed: {
    ...mapGetters({ card: 'itemTmp' })
  },
  methods: {
    ...mapMutations({ setCard: 'SET_ITEM_TMP', setModal: 'SET_MODAL' }),
    ...mapActions({ updateCard: 'UPDATE_ITEM' }),
    close () {
      this.setCard({})
      this.setModal({ name: 'card', value: false })
    },
    update () {
      this.updateCard({ item: this.card, resource: 'cards' })
        .then(() => alert('Ok'))
    },
    setCardProperti (value, key) {
      this.setCard({ ...this.card, [key]: value.target.value })
    }
  }
}
</script>

<style>

</style>
