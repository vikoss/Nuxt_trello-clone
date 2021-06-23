<template>
  <div>
    <div class="bg-white-transparent p-1 mx-1 rounded w-64">
      <section>
        <h1 class="font-bold text-base ml-2 text-white">
          {{ name }}
        </h1>
      </section>
      <section
        id="drop-zone"
        class="py-5"
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
    ...mapGetters(['cards', 'itemTmp', 'lists'])
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
        .then(({ title }) => this.createItem({
          item: {
            boardId: this.$route.params.boardId,
            text: `${this.$store.state.auth.user.email} ah agregado la tarjeta "${title}" a la lista "${this.lists[this.$route.params.boardId].find(list => list.id === this.listId).name}"`
          },
          resource: 'activities'
        }))
    },
    drop () {
      this.updateItem({
        item: { ...this.itemTmp, listId: this.listId },
        resource: 'cards'
      })
        .then(() => {
          this.createItem({
            item: {
              boardId: this.$route.params.boardId,
              text: `${this.$store.state.auth.user.email} ah movido la tarjeta "${this.itemTmp.title}" de la lista "${this.lists[this.$route.params.boardId].find(list => list.id === this.itemTmp.listId).name}" a "${this.lists[this.$route.params.boardId].find(list => list.id === this.listId).name}"`
            },
            resource: 'activities'
          })
          this.setCardDrag({})
        })
    },
    drag (card) {
      this.setCardDrag(card)
    }
  }
}
</script>

<style>

</style>
