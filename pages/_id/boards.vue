<template>
  <div>
    <section>
      <p>Crea un tablero nuevo</p>
      <input id="name" v-model="board.name" type="text" name="name">
      <input type="button" value="Test" @click="createBoard">
    </section>
    <section v-if="!boards[$route.params.id]">
      <p>
        You have no boards yet.
      </p>
    </section>
    <section v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <board
        v-for="boardItem in boards[$route.params.id]"
        :key="boardItem.id"
        :href="`/boards/${boardItem.id}`"
        :name="boardItem.name"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Board from '@/components/Board'

export default {
  components: {
    Board
  },
  data: () => ({
    board: {
      name: '',
      background: 'default'
    }
  }),
  computed: {
    ...mapGetters(['boards'])
  },
  beforeCreate () {
    this.$store.dispatch('FETCH_BOARDS', this.$route.params.id)
  },
  methods: {
    createBoard () {
      this.board.ownerId = this.$route.params.id
      this.board.memberId = this.$route.params.id
      this.$store.dispatch('CREATE_ITEM', { item: this.board, resource: 'boards' })
    }
  }
}
</script>

<style>

</style>
