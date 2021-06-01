<template>
  <div class="w-64 h-auto">
    <div class="bg-purple-200 p-1">
      <section>
        <h1>{{ name }}</h1>
      </section>
      <section
        id="drop-zone"
        class="p-12"
        @dragover.prevent
        @drop.prevent="drop"
      >
        <div
          v-for="cardItem in cards[listId]"
          :id="cardItem.id"
          :key="cardItem.id"
          draggable
          @dragstart="drag(cardItem)"
        >
          <card
            :card="cardItem"
          />
        </div>
      </section>
      <add-item
        @create-item="createCard"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Card from '~/components/Card'
import AddItem from '~/components/AddItem'

export default {
  components: { Card, AddItem },
  props: {
    name: {
      type: String,
      default: ''
    },
    listId: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    card: {
      title: '',
      description: '',
      order: 0,
      members: [],
      archived: false
    }
  }),
  computed: {
    ...mapGetters(['cards', 'itemTmp'])
  },
  created () {
    this.$store.dispatch('FETCH_CARDS', this.listId)
  },
  methods: {
    ...mapMutations({ setCardDrag: 'SET_ITEM_TMP' }),
    ...mapActions({ updateItem: 'UPDATE_ITEM', createItem: 'CREATE_ITEM' }),
    createCard (title) {
      this.createItem({
        item: { ...this.card, listId: this.listId, title },
        resource: 'cards'
      })
    },
    drop () {
      this.updateItem({
        item: { ...this.itemTmp, listId: this.listId },
        resource: 'cards'
      })
        .then(() => this.setCardDrag({}))
    },
    drag (card) {
      this.setCardDrag(card)
    }
  }
}
</script>

<style>

</style>
