<template>
  <div class="p-4">
    <section v-if="!boards[$route.params.id]">
      <p>
        No tienes ningun tablero.
      </p>
    </section>
    <section v-else>
      <span v-if="!!recentlyViewedBoards.length">
        <div class="flex items-center my-2">
          <clock-icon class="text-white" />
          <h1 class="text-base font-bold ml-1 text-white">
            Visto recientemente
          </h1>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <board
            v-for="boardItem in recentlyViewedBoards"
            :key="boardItem.id"
            :route="`/boards/${boardItem.id}`"
            :name="boardItem.name"
            :color="boardItem.background"
          />
        </div>
      </span>
      <!-- Another component
          * without <add-item/>
          * create computed property with last opened board
       -->
      <div class="flex items-center my-2">
        <collection-icon class="text-white" />
        <h1 class="text-base font-bold ml-1 text-white">
          Todos tus tableros
        </h1>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <board
          v-for="boardItem in boards[$route.params.id]"
          :key="boardItem.id"
          :route="`/boards/${boardItem.id}`"
          :name="boardItem.name"
          :color="boardItem.background"
        />
        <add-item
          name-item="tablero"
          @create-item="createBoard"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CollectionIcon, ClockIcon } from '@vue-hero-icons/outline'
import Board from '@/components/Board.vue'
import AddItem from '~/components/AddItem.vue'

export default {
  components: {
    Board,
    AddItem,
    CollectionIcon,
    ClockIcon
  },
  data: () => ({
    board: {
      name: '',
      background: ''
    }
  }),
  computed: {
    ...mapGetters(['boards']),
    recentlyViewedBoards () {
      const lastHours = (Math.floor(Date.now() / 1000)) - (12 * 60 * 60)
      return this.boards[this.$route.params.id].filter((board) => {
        return board.updatedAt > lastHours
      })
    }
  },
  beforeCreate () {
    this.$store.dispatch('FETCH_BOARDS', this.$route.params.id)
  },
  methods: {
    createBoard (board) {
      this.board.ownerId = this.$route.params.id
      this.board.memberId = this.$route.params.id
      const item = { ...this.board, ...board }
      this.$store.dispatch('CREATE_ITEM', { item, resource: 'boards' })
    }
  }
}
</script>

<style>

</style>
