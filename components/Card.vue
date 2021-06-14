<template>
  <div class="bg-white-light hover:bg-white-transparent rounded shadow-lg m-1 p-1 cursor-pointer" @click="openModalCard">
    <section>
      <p class="text-white">
        {{ card.title }}
      </p>
    </section>
    <section v-show="!!card.description" title="Tiene descripcion">
      <DocumentTextIcon size="1.5x" />
    </section>
  </div>
</template>

<script>
import { DocumentTextIcon } from '@vue-hero-icons/solid'
import { mapMutations } from 'vuex'

export default {
  components: { DocumentTextIcon },
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapMutations({ setCard: 'SET_ITEM_TMP', setModal: 'SET_MODAL' }),
    openModalCard () {
      this.setModal({ name: 'card', value: true })
      this.setCard(this.card)
    }
  }
}
</script>

<style>

</style>
